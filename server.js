import http from 'http';
import { readFile } from 'fs/promises';
import { extname, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = http.createServer(async (req, res) => {
    const filepath = join(
        __dirname,
        'public',
        req.url === '/' ? 'index.html' : `${req.url}.html`
    );

    const contentType = 'text/html';

    try {
        const content = await readFile(filepath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch {
        const notFound = await readFile(join(__dirname, 'public', '404.html'));
        res.writeHead(404, { 'Content-Type': contentType });
        res.end(notFound);
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});