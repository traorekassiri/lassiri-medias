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
    const articles = getAllArticles();
    res.json(articles);
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
    // Use both process.cwd() and __dirname as fallbacks for Vercel
    const rootDir = process.env.VERCEL ? process.cwd() : path.resolve(__dirname);
    const articlesDir = path.join(rootDir, "articles");
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
    let allArticles: any[] = [];

    if (!fs.existsSync(articlesDir)) {
      console.warn("Articles directory not found at:", articlesDir);
      // Try alternative path for Vercel serverless environment
      const altPath = path.join(process.cwd(), "articles");
      if (altPath !== articlesDir && fs.existsSync(altPath)) {
        return getArticlesFromDir(altPath, categories);
      }
      return [];
    }

    return getArticlesFromDir(articlesDir, categories);
  }

  function getArticlesFromDir(articlesDir: string, categories: string[]) {
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
              allArticles.push({
                ...data,
                slug: file.replace(".md", ""),
                category: cat,
              });
            }
          });
        } catch (err) {
          console.error(`Error reading category ${cat}:`, err);
        }
      }
    });
    return allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // API to get a single article
  app.get("/api/articles/:category/:slug", (req, res) => {
    const { category, slug } = req.params;
    const rootDir = process.env.VERCEL ? process.cwd() : path.resolve(__dirname);
    let filePath = path.join(rootDir, "articles", category, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      // Fallback for Vercel
      filePath = path.join(process.cwd(), "articles", category, `${slug}.md`);
    }

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const { data, content: body } = matter(content);
      res.json({ ...data, body, category, slug });
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
      res.sendFile(path.join(__dirname, "dist", "index.html"));
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
