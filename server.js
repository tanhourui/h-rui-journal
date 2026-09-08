const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
  let cleanUrl = req.url.split('?')[0];
  let file = cleanUrl === '/' ? 'direction3_preview.html' : cleanUrl.replace(/^\//, '');
  let filePath = path.join(__dirname, file);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found: ' + file);
    } else {
      let ext = path.extname(filePath);
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
    }
  });
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Preview server live at http://localhost:3000');
});
