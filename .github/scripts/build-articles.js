const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(process.cwd(), 'articles');
const OUTPUT_FILE = path.join(ARTICLES_DIR, 'index.json');

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return { data: {}, content };

  const frontmatter = match[1];
  const data = {};

  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      data[key] = value;
    }
  });

  return { data, content: content.slice(match[0].length) };
}

function slugify(filename) {
  return filename.replace(/\.md$/, '');
}

async function buildArticlesIndex() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.log('No articles directory found, skipping...');
    return;
  }

  const files = fs.readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith('.md'))
    .sort();

  const articles = [];

  for (const filename of files) {
    const filepath = path.join(ARTICLES_DIR, filename);
    const content = fs.readFileSync(filepath, 'utf8');
    const { data } = parseFrontmatter(content);

    if (!data.title) {
      console.warn(`Warning: ${filename} has no title in frontmatter, skipping`);
      continue;
    }

    articles.push({
      slug: slugify(filename),
      title: data.title,
      description: data.description || '',
      date: data.date || '',
      filename
    });
  }

  articles.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(articles, null, 2) + '\n', 'utf8');
  console.log(`✓ Built articles index: ${articles.length} article(s)`);
  articles.forEach(a => console.log(`  - ${a.slug} (${a.date || 'no date'})`));
}

buildArticlesIndex().catch(err => {
  console.error('Error building articles index:', err.message);
  process.exit(1);
});
