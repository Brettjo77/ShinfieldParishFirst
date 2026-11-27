// Tiny static server for the tests (serves _site at the root).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { SITE } from "./checks.js";

const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain", ".ics": "text/calendar" };

export function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
      if (p.endsWith("/")) p += "index.html";
      const file = path.join(SITE, path.normalize(p));
      if (!file.startsWith(SITE) || !fs.existsSync(file)) {
        res.writeHead(404, { "content-type": TYPES[".html"] });
        return res.end(fs.readFileSync(path.join(SITE, "404.html")));
      }
      res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
      res.end(fs.readFileSync(file));
    });
    server.listen(0, "127.0.0.1", () => resolve({ server, base: `http://127.0.0.1:${server.address().port}` }));
  });
}
