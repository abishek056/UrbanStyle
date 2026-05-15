import fs from 'fs';

const map = {
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_1.jpg",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_2.jpg",
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_3.jpg",
    "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_4.jpg",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_5.jpg",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_6.jpg",
    "https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_7.jpg",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_8.jpg",
    "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_9.jpg",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_10.jpg",
    "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_11.jpg",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_12.jpg",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_13.jpg",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_14.jpg",
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_15.jpg",
    "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_16.jpg",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_17.jpg",
    "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_18.jpg",
    "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_19.jpg",
    "https://images.unsplash.com/photo-1517441581617-1471d2417fae?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80": "/images/products/product_20.jpg"
};

let content = fs.readFileSync('src/context/StoreContext.jsx', 'utf8');

for (const [url, localPath] of Object.entries(map)) {
    content = content.split(url).join(localPath);
}

fs.writeFileSync('src/context/StoreContext.jsx', content, 'utf8');
console.log('Replaced all URLs');
