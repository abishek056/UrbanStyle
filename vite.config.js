import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom plugin to handle saving products during development
const saveProductsPlugin = () => ({
  name: 'save-products-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/update-products' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const dataPath = path.resolve(__dirname, 'src/data/products.json');
            fs.writeFileSync(dataPath, JSON.stringify(JSON.parse(body), null, 2));
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
          } catch (error) {
            console.error('Error saving products:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: error.message }));
          }
        });
      } else {
        next();
      }
    });
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), saveProductsPlugin()],
})
