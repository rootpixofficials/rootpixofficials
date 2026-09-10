const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
  let reqUrl = decodeURIComponent(req.url.split('?')[0]);
  if (reqUrl === '/') reqUrl = '/index.html';

  let filePath = path.join(ROOT, reqUrl);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end('<h1>404 Not Found</h1>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Content-Length': stats.size
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

// Sync newly generated blog & portfolio assets
try {
  const artifactDir = path.join('C:', 'Users', 'nihal', '.gemini', 'antigravity', 'brain', '474e09d8-fe42-4570-ac30-ede28c0a052c');
  const webDevSrc = path.join(artifactDir, 'blog_web_dev_1788862486191.jpg');
  const uiuxSrc = path.join(artifactDir, 'portfolio_blog_app_1788861092078.jpg');
  const mobile1Src = path.join(artifactDir, 'blog_app_dev_1788860997988.jpg');
  const mobile2Src = path.join(artifactDir, 'portfolio_ecommerce_1788861122063.jpg');

  const webDevDest = path.join(ROOT, 'assets', 'img', 'blog-web-dev.jpg');
  const uiuxDest = path.join(ROOT, 'assets', 'img', 'blog-ui-ux.jpg');
  const mobile1Dest = path.join(ROOT, 'assets', 'img', 'portfolio', 'portfolio-mobile-app-1.jpg');
  const mobile2Dest = path.join(ROOT, 'assets', 'img', 'portfolio', 'portfolio-mobile-app-2.jpg');

  if (fs.existsSync(webDevSrc) && !fs.existsSync(webDevDest)) {
    fs.copyFileSync(webDevSrc, webDevDest);
  }
  if (fs.existsSync(uiuxSrc) && !fs.existsSync(uiuxDest)) {
    fs.copyFileSync(uiuxSrc, uiuxDest);
  }
  if (fs.existsSync(mobile1Src) && !fs.existsSync(mobile1Dest)) {
    fs.copyFileSync(mobile1Src, mobile1Dest);
  }
  if (fs.existsSync(mobile2Src) && !fs.existsSync(mobile2Dest)) {
    fs.copyFileSync(mobile2Src, mobile2Dest);
  }
} catch (e) {
  console.error('Asset sync note:', e.message);
}

server.listen(PORT, () => {
  console.log(`==============================================`);
  console.log(` Rootpix Website Server is running!`);
  console.log(` Local URL: http://localhost:${PORT}`);
  console.log(` Network URL: http://127.0.0.1:${PORT}`);
  console.log(`==============================================`);
});

