import fs from 'fs';

let content = fs.readFileSync('src/context/StoreContext.jsx', 'utf8');

// Generate imports
let imports = '';
for (let i = 1; i <= 20; i++) {
    imports += `import prodImg${i} from '../assets/images/products/product_${i}.jpg';\n`;
}

// Replace string paths with variable names
for (let i = 1; i <= 20; i++) {
    content = content.split(`"/images/products/product_${i}.jpg"`).join(`prodImg${i}`);
    // also single quotes if any
    content = content.split(`'/images/products/product_${i}.jpg'`).join(`prodImg${i}`);
}

// Insert imports at top
content = imports + '\n' + content;

fs.writeFileSync('src/context/StoreContext.jsx', content, 'utf8');
console.log('Updated StoreContext.jsx');
