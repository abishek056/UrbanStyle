import fs from 'fs';

let content = fs.readFileSync('src/context/StoreContext.jsx', 'utf-8');

// 1. Add import for productsData and create imageMap
const importsReplacement = `import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../data/products.json';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const imageMap = {
    "product_1.jpg": prodImg1,
    "product_2.jpg": prodImg2,
    "product_3.jpg": prodImg3,
    "product_4.jpg": prodImg4,
    "product_5.jpg": prodImg5,
    "product_6.jpg": prodImg6,
    "product_7.jpg": prodImg7,
    "product_8.jpg": prodImg8,
    "product_9.jpg": prodImg9,
    "product_10.jpg": prodImg10,
    "product_11.jpg": prodImg11,
    "product_12.jpg": prodImg12,
    "product_13.jpg": prodImg13,
    "product_14.jpg": prodImg14,
    "product_15.jpg": prodImg15,
    "product_16.jpg": prodImg16,
    "product_17.jpg": prodImg17,
    "product_18.jpg": prodImg18,
    "product_19.jpg": prodImg19,
    "product_20.jpg": prodImg20,
};

const INITIAL_PRODUCTS = productsData.map(p => ({
    ...p,
    image: imageMap[p.image] || p.image
}));`;

// Replace from `import React` to the end of `INITIAL_PRODUCTS`
const startReact = "import React, { createContext, useContext, useState, useEffect } from 'react';";
const endInitialProducts = "    }\n];";

const startIndex = content.indexOf(startReact);
const endIndex = content.indexOf(endInitialProducts) + endInitialProducts.length;

content = content.slice(0, startIndex) + importsReplacement + content.slice(endIndex);

// 2. Add saveProductsToDisk function inside StoreProvider
const saveProductsFn = `
    const saveProductsToDisk = async (newProducts) => {
        const reverseImageMap = Object.entries(imageMap).reduce((acc, [key, value]) => {
            acc[value] = key;
            return acc;
        }, {});

        const productsToSave = newProducts.map(p => ({
            ...p,
            image: reverseImageMap[p.image] || p.image
        }));

        try {
            await fetch('/api/update-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productsToSave)
            });
        } catch (error) {
            console.error('Failed to save products to disk', error);
        }
    };
`;

content = content.replace('export const StoreProvider = ({ children }) => {', 'export const StoreProvider = ({ children }) => {' + saveProductsFn);

// 3. Update addProduct
const newAddProduct = `const addProduct = (product) => {
        const newProduct = { ...product, id: Date.now(), rating: 5.0 };
        const newProducts = [...products, newProduct];
        setProducts(newProducts);
        saveProductsToDisk(newProducts);
    };`;
content = content.replace(/const addProduct = \(product\) => \{[\s\S]*?setProducts\(\[\.\.\.products, newProduct\]\);\n    \};/, newAddProduct);

// 4. Update updateProduct
const newUpdateProduct = `const updateProduct = (id, updatedData) => {
        const newProducts = products.map(p => p.id === id ? { ...p, ...updatedData } : p);
        setProducts(newProducts);
        saveProductsToDisk(newProducts);
    };`;
content = content.replace(/const updateProduct = \(id, updatedData\) => \{[\s\S]*?\}\);\n    \};/, newUpdateProduct);

// 5. Update deleteProduct
const newDeleteProduct = `const deleteProduct = (id) => {
        const newProducts = products.filter(p => p.id !== id);
        setProducts(newProducts);
        saveProductsToDisk(newProducts);
    };`;
content = content.replace(/const deleteProduct = \(id\) => \{[\s\S]*?\}\);\n    \};/, newDeleteProduct);

// 6. Update updateStock
const newUpdateStock = `const updateStock = (id, newStock) => {
        const newProducts = products.map(p => p.id === id ? { ...p, stock: newStock } : p);
        setProducts(newProducts);
        saveProductsToDisk(newProducts);
    };`;
content = content.replace(/const updateStock = \(id, newStock\) => \{[\s\S]*?\}\);\n    \};/, newUpdateStock);

// 7. Update addOrder to save product changes (stock deduction)
const newAddOrder = `const addOrder = (order) => {
        setOrders(prev => [order, ...prev]);
        // Deduct stock
        setProducts(prevProducts => {
            const newProducts = prevProducts.map(p => {
                const orderItem = order.items.find(item => item.name === p.name);
                if (orderItem) {
                    return { ...p, stock: Math.max(0, p.stock - orderItem.qty) };
                }
                return p;
            });
            saveProductsToDisk(newProducts);
            return newProducts;
        });
    };`;
content = content.replace(/const addOrder = \(order\) => \{[\s\S]*?\}\);\n    \};/g, newAddOrder);

// 8. Update cancelOrder to save product changes (stock increment)
const newCancelOrder = `const cancelOrder = (id) => {
        let orderToCancel = null;
        setOrders(prev => prev.map(o => {
            if (o.id === id && o.status === 'Pending') {
                orderToCancel = o;
                return { ...o, status: 'Cancelled' };
            }
            return o;
        }));

        if (orderToCancel) {
            setProducts(prevProducts => {
                const newProducts = prevProducts.map(p => {
                    const orderItem = orderToCancel.items.find(item => item.name === p.name);
                    if (orderItem) {
                        return { ...p, stock: p.stock + orderItem.qty };
                    }
                    return p;
                });
                saveProductsToDisk(newProducts);
                return newProducts;
            });
        }
    };`;
content = content.replace(/const cancelOrder = \(id\) => \{[\s\S]*?\}\n    \};/g, newCancelOrder);


fs.writeFileSync('src/context/StoreContext.jsx', content);
