import fs from 'fs';
import path from 'path';
import https from 'https';

const EXTRA_IMAGES = {
    "hero_bg.jpg": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "about_img.jpg": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
};

const destDir = path.join(process.cwd(), 'src/assets/images/sections');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err.message);
    });
  });
}

async function main() {
    for (const [filename, url] of Object.entries(EXTRA_IMAGES)) {
        const dest = path.join(destDir, filename);
        if (!fs.existsSync(dest)) {
            console.log(`Downloading ${filename}...`);
            await download(url, dest);
            console.log(`Successfully downloaded ${filename}`);
        }
    }
}

main();
