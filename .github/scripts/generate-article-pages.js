const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ARTICLES_DIR = path.join(process.cwd(), 'articles');
const SITE_URL = 'https://allisterantosik.com';

function parseFrontMatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontMatter: {}, content: text };

  const frontMatter = {};
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.substring(0, colonIdx).trim();
      const value = line.substring(colonIdx + 1).trim();
      frontMatter[key] = value;
    }
  });
  return { frontMatter, content: match[2] };
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildArticlePage(slug, frontMatter, htmlContent) {
  const title = escapeHtml(frontMatter.title || slug);
  const description = escapeHtml(frontMatter.description || '');
  const date = frontMatter.date || '';
  const url = `${SITE_URL}/articles/${slug}/`;

  const isoDate = date ? new Date(date).toISOString().split('T')[0] : '';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': frontMatter.title || slug,
    'description': frontMatter.description || '',
    'url': url,
    'datePublished': isoDate,
    'dateModified': isoDate,
    'author': {
      '@type': 'Person',
      'name': 'Allister Antosik',
      'url': SITE_URL
    },
    'publisher': {
      '@type': 'Person',
      'name': 'Allister Antosik',
      'url': SITE_URL
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Allister Antosik</title>

    <!-- SEO Meta Tags -->
    <meta name="description" content="${description}">
    <meta name="author" content="Allister Antosik">
    <link rel="canonical" href="${url}">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="${url}">
    <meta property="og:site_name" content="Allister Antosik">
${isoDate ? `    <meta property="article:published_time" content="${isoDate}">
    <meta property="article:modified_time" content="${isoDate}">
    <meta property="article:author" content="Allister Antosik">` : ''}

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify(structuredData, null, 4)}
    </script>

    <link rel="stylesheet" href="../../style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
</head>
<body>
    <div class="container">
        <a href="/" class="back-link">&#8592; Back</a>
        <article class="article-content">
            ${htmlContent}
        </article>
        <footer>
            <div class="social-links">
                <a href="https://github.com/allistera" target="_blank">GitHub</a>
                <a href="https://www.linkedin.com/in/allisterantosik/" target="_blank">LinkedIn</a>
                <a href="mailto:hey@allisterantosik.com">Contact</a>
            </div>
            <p class="copyright">&copy; 2025 Allister Antosik</p>
        </footer>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
</body>
</html>
`;
}

function main() {
  try {
    if (!fs.existsSync(ARTICLES_DIR)) {
      console.log('No articles directory found, skipping');
      return;
    }

    const files = fs.readdirSync(ARTICLES_DIR)
      .filter(f => f.endsWith('.md'))
      .sort();

    for (const filename of files) {
      const slug = filename.replace(/\.md$/, '');
      const filePath = path.join(ARTICLES_DIR, filename);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { frontMatter, content } = parseFrontMatter(raw);

      const htmlContent = marked.parse(content);

      const outputDir = path.join(ARTICLES_DIR, slug);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const outputPath = path.join(outputDir, 'index.html');
      const page = buildArticlePage(slug, frontMatter, htmlContent);
      fs.writeFileSync(outputPath, page, 'utf8');
      console.log(`Generated: articles/${slug}/index.html`);
    }

    console.log(`✓ Generated ${files.length} article page(s)`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
