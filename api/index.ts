import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API to get all articles
  app.get("/api/articles", (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const articles = getAllArticles();
    res.json(articles);
  });

  // Debug API to see file system state
  app.get("/api/debug-files", (req, res) => {
    const rootDir = process.cwd();
    const articlesDir = path.join(rootDir, "articles");
    const exists = fs.existsSync(articlesDir);
    let files: string[] = [];
    
    if (exists) {
      try {
        const categories = fs.readdirSync(articlesDir);
        categories.forEach(cat => {
          const catPath = path.join(articlesDir, cat);
          if (fs.lstatSync(catPath).isDirectory()) {
            const catFiles = fs.readdirSync(catPath);
            catFiles.forEach(f => files.push(`${cat}/${f}`));
          }
        });
      } catch (e: any) {
        files.push(`Error: ${e.message}`);
      }
    }

    res.json({
      cwd: rootDir,
      dirname: __dirname,
      articlesDir,
      exists,
      files
    });
  });

  // Sitemap Route
  app.get("/sitemap.xml", (req, res) => {
    const articles = getAllArticles();
    const baseUrl = "https://kassiripulse.online";
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><priority>1.0</priority></url>
  <url><loc>${baseUrl}/about</loc><priority>0.8</priority></url>
  <url><loc>${baseUrl}/contact</loc><priority>0.8</priority></url>`;

    articles.forEach(art => {
      xml += `\n  <url><loc>${baseUrl}/article/${art.category}/${art.slug}</loc><lastmod>${art.date}</lastmod><priority>0.7</priority></url>`;
    });

    xml += "\n</urlset>";
    res.header("Content-Type", "application/xml");
    res.send(xml);
  });

  // RSS Feed Route
  app.get("/rss.xml", (req, res) => {
    const articles = getAllArticles();
    const baseUrl = "https://kassiripulse.online";
    let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Kassiri Pulse</title>
  <link>${baseUrl}</link>
  <description>Média africain et international indépendant</description>`;

    articles.forEach(art => {
      rss += `
  <item>
    <title>${art.title}</title>
    <link>${baseUrl}/article/${art.category}/${art.slug}</link>
    <description>${art.description}</description>
    <pubDate>${new Date(art.date).toUTCString()}</pubDate>
  </item>`;
    });

    rss += "\n</channel>\n</rss>";
    res.header("Content-Type", "application/xml");
    res.send(rss);
  });

  // Helper function to get all articles
  function getAllArticles() {
    const categories = [
      "a_la_une", 
      "culture", 
      "economie", 
      "international", 
      "politique", 
      "sante", 
      "sport", 
      "urgent",
      "afrique",
      "grand"
    ];

    const possiblePaths = [
      path.join(process.cwd(), "articles"),
      path.join(__dirname, "articles"),
      path.join(__dirname, "..", "articles"),
      path.resolve("articles")
    ];

    let articlesDir = "";
    for (const p of possiblePaths) {
      try {
        if (fs.existsSync(p) && fs.lstatSync(p).isDirectory()) {
          articlesDir = p;
          console.log(`Found articles directory at: ${p}`);
          break;
        }
      } catch (e) {
        // Ignore errors during path checking
      }
    }

    if (!articlesDir) {
      console.error("Articles directory not found in any of the possible locations:", possiblePaths);
      return [];
    }

    let allArticles: any[] = [];
    categories.forEach((cat) => {
      const catDir = path.join(articlesDir, cat);
      if (fs.existsSync(catDir)) {
        try {
          const files = fs.readdirSync(catDir);
          files.forEach((file) => {
            if (file.endsWith(".md")) {
              const filePath = path.join(catDir, file);
              const content = fs.readFileSync(filePath, "utf-8");
              const { data } = matter(content);
              if (data && data.title) {
                allArticles.push({
                  ...data,
                  slug: file.replace(".md", ""),
                  category: cat,
                });
              }
            }
          });
        } catch (err) {
          console.error(`Error reading category ${cat}:`, err);
        }
      }
    });

    return allArticles.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  }

  // API to get a single article
  app.get("/api/articles/:category/:slug", (req, res) => {
    const { category, slug } = req.params;
    
    const possiblePaths = [
      path.join(process.cwd(), "articles", category, `${slug}.md`),
      path.join(__dirname, "articles", category, `${slug}.md`),
      path.join(__dirname, "..", "articles", category, `${slug}.md`),
      path.resolve("articles", category, `${slug}.md`)
    ];

    let filePath = "";
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        filePath = p;
        break;
      }
    }

    if (filePath) {
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        const { data, content: body } = matter(content);
        res.json({ ...data, body, category, slug });
      } catch (err) {
        res.status(500).json({ error: "Error reading article file" });
      }
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

  return app;
}

const appPromise = startServer();
export default async (req: any, res: any) => {
  const app = await appPromise;
  return app(req, res);
};
