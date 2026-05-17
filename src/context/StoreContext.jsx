import prodImg1 from '../assets/images/products/product_1.jpg';
import prodImg2 from '../assets/images/products/product_2.jpg';
import prodImg3 from '../assets/images/products/product_3.jpg';
import prodImg4 from '../assets/images/products/product_4.jpg';
import prodImg5 from '../assets/images/products/product_5.jpg';
import prodImg6 from '../assets/images/products/product_6.jpg';
import prodImg7 from '../assets/images/products/product_7.jpg';
import prodImg8 from '../assets/images/products/product_8.jpg';
import prodImg9 from '../assets/images/products/product_9.jpg';
import prodImg10 from '../assets/images/products/product_10.jpg';
import prodImg11 from '../assets/images/products/product_11.jpg';
import prodImg12 from '../assets/images/products/product_12.jpg';
import prodImg13 from '../assets/images/products/product_13.jpg';
import prodImg14 from '../assets/images/products/product_14.jpg';
import prodImg15 from '../assets/images/products/product_15.jpg';
import prodImg16 from '../assets/images/products/product_16.jpg';
import prodImg17 from '../assets/images/products/product_17.jpg';
import prodImg18 from '../assets/images/products/product_18.jpg';
import prodImg19 from '../assets/images/products/product_19.jpg';
import prodImg20 from '../assets/images/products/product_20.jpg';

import React, { createContext, useContext, useState, useEffect } from 'react';
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
}));

const INITIAL_ORDERS = [
    { id: "ORD-7231", customer: "Sudip Chaudhari", date: "Feb 24, 2026", amount: 2500, status: "Delivered", method: "Esewa" },
    { id: "ORD-7232", customer: "Satyam Limbu", date: "Feb 25, 2026", amount: 1200, status: "Pending", method: "Cash on Delivery" },
    { id: "ORD-7233", customer: "Kushal Nepal", date: "Feb 26, 2026", amount: 3500, status: "Shipped", method: "Khalti" },
    { id: "ORD-7234", customer: "Nabin Shrestha", date: "Feb 27, 2026", amount: 4800, status: "Delivered", method: "Esewa" },
    { id: "ORD-7235", customer: "Sujata Basnet", date: "Feb 28, 2026", amount: 1500, status: "Pending", method: "Khalti" },
];

export const StoreProvider = ({ children }) => {
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

    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('urbanstyle_products');
        const parsed = saved ? JSON.parse(saved) : null;
        // If no saved data, or if saved data is from old version (less than 13 products)
        if (!parsed || parsed.length < 13) {
            return INITIAL_PRODUCTS;
        }
        return parsed;
    });

    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('urbanstyle_orders');
        const parsed = saved ? JSON.parse(saved) : null;
        // If no saved data, or if first order is still John Doe (old data)
        if (!parsed || (parsed.length > 0 && parsed[0].customer === "John Doe")) {
            return INITIAL_ORDERS;
        }
        return parsed;
    });

    useEffect(() => {
        localStorage.setItem('urbanstyle_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('urbanstyle_orders', JSON.stringify(orders));
    }, [orders]);

    // Product CRUD
    const addProduct = (product) => {
        const newProduct = { ...product, id: Date.now(), rating: 5.0 };
        const newProducts = [...products, newProduct];
        setProducts(newProducts);
        saveProductsToDisk(newProducts);
    };

    const updateProduct = (id, updatedData) => {
        const newProducts = products.map(p => p.id === id ? { ...p, ...updatedData } : p);
        setProducts(newProducts);
        saveProductsToDisk(newProducts);
    };

    const deleteProduct = (id) => {
        const newProducts = products.filter(p => p.id !== id);
        setProducts(newProducts);
        saveProductsToDisk(newProducts);
    };

    const updateStock = (id, newStock) => {
        const newProducts = products.map(p => p.id === id ? { ...p, stock: newStock } : p);
        setProducts(newProducts);
        saveProductsToDisk(newProducts);
    };

    const addOrder = (order) => {
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
    };

    const cancelOrder = (id) => {
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
    };

    const updateOrderStatus = (id, status) => {
        setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    };

    const resetStore = () => {
        if (window.confirm("Are you sure you want to reset all data to defaults? This will clear any manual changes and load the new products and manager profile.")) {
            localStorage.removeItem('urbanstyle_products');
            localStorage.removeItem('urbanstyle_orders');
            localStorage.removeItem('urbanstyle_admin_user');
            setProducts(INITIAL_PRODUCTS);
            setOrders(INITIAL_ORDERS);
            window.location.reload();
        }
    };

    const stats = {
        totalRevenue: orders.filter(o => o.status !== 'Cancelled').reduce((acc, curr) => acc + curr.amount, 0),
        totalOrders: orders.filter(o => o.status !== 'Cancelled').length,
        inStockItems: products.reduce((acc, curr) => acc + curr.stock, 0),
        lowStockCount: products.filter(p => p.stock <= p.minStock).length
    };

    return (
        <StoreContext.Provider value={{
            products,
            orders,
            addProduct,
            updateProduct,
            deleteProduct,
            updateStock,
            addOrder,
            cancelOrder,
            updateOrderStatus,
            resetStore,
            stats
        }}>
            {children}
        </StoreContext.Provider>
    );
};
