const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(process.cwd(), 'articles');
const INDEX_PATH = path.join(ARTICLES_DIR, 'index.json');

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
}

function main() {
  try {
    if (!fs.existsSync(ARTICLES_DIR)) {
      console.log('No articles directory found, skipping');
      return;
    }
    generateArticlesIndex();
    console.log('✓ Articles index updated successfully');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
