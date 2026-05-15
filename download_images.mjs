import fs from 'fs';
import path from 'path';
import https from 'https';

const INITIAL_PRODUCTS = [
    { image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "UT-001" },
    { image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "NRJ-002" },
    { image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "MSH-003" },
    { image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "TCJ-004" },
    { image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "CLT-005" },
    { image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "RWB-006" },
    { image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "UOS-007" },
    { image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "SBH-008" },
    { image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "GOT-009" },
    { image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "MB-012" },
    { image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "UEB-013" },
    { image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "MDJ-014" },
    { image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "SGT-015" },
    { image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "ODC-016" },
    { image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "UKS-017" },
    { image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "PPC-018" },
    { image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "SIH-019" },
    { image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "ULB-022" },
    { image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "NNT-023" },
    { image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "VWC-024" },
    { image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "UCS-025" },
    { image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "SPJ-026" },
    { image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "LST-027" },
    { image: "https://images.unsplash.com/photo-1517441581617-1471d2417fae?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "OUC-028" },
    { image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "CGT-029" },
    { image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "SFH-030" },
    { image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "MBJ-031" },
    { image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "AWH-032" },
    { image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "TWN-033" },
    { image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "EDC-034" },
    { image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "VID-035" },
    { image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "RCC-036" },
    { image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", sku: "UCT-037" }
];

const destDir = path.join(process.cwd(), 'src/assets/images/products');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

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
    // Collect unique images to download
    const uniqueImages = {};
    for (const prod of INITIAL_PRODUCTS) {
        if (!uniqueImages[prod.image]) {
            uniqueImages[prod.image] = [];
        }
        uniqueImages[prod.image].push(prod.sku);
    }
    
    let i = 1;
    for (const [url, skus] of Object.entries(uniqueImages)) {
        const ext = '.jpg';
        const filename = `product_${i}${ext}`;
        const dest = path.join(destDir, filename);
        if (!fs.existsSync(dest)) {
            console.log(`Downloading ${filename}...`);
            try {
                await download(url, dest);
                console.log(`Successfully downloaded ${filename}`);
            } catch (e) {
                console.error(`Failed to download ${url}: ${e}`);
            }
        }
        for (const sku of skus) {
            console.log(`Map: ${sku} -> /src/assets/images/products/${filename}`);
        }
        i++;
    }
}

main();
