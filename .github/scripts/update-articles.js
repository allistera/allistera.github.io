const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(process.cwd(), 'articles');
const INDEX_PATH = path.join(ARTICLES_DIR, 'index.json');
const SITEMAP_PATH = path.join(process.cwd(), 'sitemap.xml');
const SITE_URL = 'https://allisterantosik.com';

function parseFrontMatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return {};

  const frontMatter = {};
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.substring(0, colonIdx).trim();
      const value = line.substring(colonIdx + 1).trim();
      frontMatter[key] = value;
    }
  });
  return frontMatter;
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemap(articles) {
  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  xml += '  <url>\n';
  xml += `    <loc>${SITE_URL}/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>1.0</priority>\n';
  xml += '  </url>\n';

  for (const article of articles) {
    const date = article.date || today;
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}/articles/${escapeXml(article.slug)}/</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';
  return xml;
}

function generateArticlesIndex() {
  const files = fs.readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith('.md'))
    .sort();

  const articles = files.map(filename => {
    const slug = filename.replace(/\.md$/, '');
    const filePath = path.join(ARTICLES_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    const frontMatter = parseFrontMatter(content);

    return {
      slug,
      title: frontMatter.title || slug,
      description: frontMatter.description || '',
      date: frontMatter.date || ''
    };
  });

  articles.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });

  fs.writeFileSync(INDEX_PATH, JSON.stringify(articles, null, 2) + '\n', 'utf8');
  console.log(`Generated articles/index.json with ${articles.length} article(s)`);

  const sitemap = generateSitemap(articles);
  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
  console.log(`Generated sitemap.xml with ${articles.length + 1} URL(s)`);
}

function main() {
  try {
    if (!fs.existsSync(ARTICLES_DIR)) {
      console.log('No articles directory found, skipping');
      return;
    }
    generateArticlesIndex();
    console.log('✓ Articles index and sitemap updated successfully');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
