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

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: "Classic Urban Tee",
        category: "T-Shirt",
        price: 1200,
        image: prodImg1,
        rating: 4.8,
        stock: 45,
        minStock: 20,
        sku: "UT-001",
        fullDescription: "Our signature Urban Tee is crafted from 100% premium cotton. It features a relaxed fit and a durable neckline that holds its shape even after multiple washes. Perfect for everyday street style."
    },
    {
        id: 2,
        name: "Night Rider Jacket",
        category: "Jacket",
        price: 3500,
        image: prodImg2,
        rating: 4.9,
        stock: 12,
        minStock: 15,
        sku: "NRJ-002",
        fullDescription: "A high-performance technical jacket designed for the urban explorer. Water-resistant, wind-breaking, and featuring reflective details for safety and style during night rides."
    },
    {
        id: 3,
        name: "Mustard Street Hoodie",
        category: "Sweatshirt",
        price: 2500,
        image: prodImg3,
        rating: 4.7,
        stock: 0,
        minStock: 10,
        sku: "MSH-003",
        fullDescription: "This oversized hoodie brings warmth and vibrant color to your wardrobe. Soft fleece lining and heavy-duty drawstrings make it a winter essential."
    },
    {
        id: 4,
        name: "Tech Cargo Joggers",
        category: "Joggers",
        price: 2800,
        image: prodImg4,
        rating: 4.6,
        stock: 25,
        minStock: 15,
        sku: "TCJ-004",
        fullDescription: "Functional fashion at its best. These joggers feature multiple utility pockets and an adjustable ankle cuff. Streamlined for a modern techwear silhouette."
    },
    {
        id: 5,
        name: "Custom Logo Tee",
        category: "T-Shirt",
        price: 1500,
        image: prodImg5,
        rating: 4.9,
        stock: 60,
        minStock: 25,
        sku: "CLT-005",
        fullDescription: "Want to represent yourself? Send us your design and we'll print it on our premium tees using high-quality DTG printing. Durable and vibrant prints."
    },
    {
        id: 6,
        name: "Retro Windbreaker",
        category: "Jacket",
        price: 3200,
        image: prodImg6,
        rating: 4.5,
        stock: 18,
        minStock: 10,
        sku: "RWB-006",
        fullDescription: "A throwback to the 90s streetwear era. Lightweight, breathable, and features a classic color-blocked design. Perfect for breezy evenings."
    },
    {
        id: 7,
        name: "Urban Oversized Shirt",
        category: "Trending",
        price: 1800,
        image: prodImg7,
        rating: 4.8,
        stock: 32,
        minStock: 15,
        sku: "UOS-007",
        fullDescription: "Boxy fit, dropped shoulders, and a heavy-weight fabric. This is the ultimate oversized shirt for those who value silhouette and comfort."
    },
    {
        id: 8,
        name: "Stealth Black Hoodie",
        category: "Sweatshirt",
        price: 2700,
        image: prodImg3,
        rating: 5.0,
        stock: 15,
        minStock: 12,
        sku: "SBH-008",
        fullDescription: "The ultimate basics. A triple-black hoodie that goes with everything. Minimal branding, maximum impact."
    },
    {
        id: 9,
        name: "Graffiti Oversized Tee",
        category: "T-Shirt",
        price: 1400,
        image: prodImg8,
        rating: 4.7,
        stock: 28,
        minStock: 10,
        sku: "GOT-009",
        fullDescription: "Brave the streets with our graffiti-inspired oversized tee. Hand-drawn graphics on premium heavy-weight cotton for that authentic street look."
    },
    {
        id: 12,
        name: "Minimalist Beanie",
        category: "Accessories",
        price: 800,
        image: prodImg9,
        rating: 4.9,
        stock: 55,
        minStock: 20,
        sku: "MB-012",
        fullDescription: "The perfect finishing touch. A soft, ribbed-knit beanie that keeps you warm without the bulk. Featuring a subtle woven UrbanStyle tag."
    },
    {
        id: 13,
        name: "Urban Explorer Backpack",
        category: "Accessories",
        price: 4500,
        image: prodImg10,
        rating: 4.8,
        stock: 8,
        minStock: 10,
        sku: "UEB-013",
        fullDescription: "Built for the daily commute or weekend escapes. Multiple compartments, padded laptop sleeve, and weather-resistant material. Stylishly functional."
    },
    {
        id: 14,
        name: "Midnight Denim Jacket",
        category: "Jacket",
        price: 4200,
        image: prodImg11,
        rating: 4.9,
        stock: 15,
        minStock: 10,
        sku: "MDJ-014",
        fullDescription: "A premium indigo-washed denim jacket with custom UrbanStyle hardware. Designed to age beautifully with every wear."
    },
    {
        id: 15,
        name: "Sunset Gradient Tee",
        category: "T-Shirt",
        price: 1600,
        image: prodImg12,
        rating: 4.7,
        stock: 40,
        minStock: 15,
        sku: "SGT-015",
        fullDescription: "Stand out with our sunset gradient tee. Hand-dyed for a unique look every time. Soft, breathable cotton for maximum comfort."
    },
    {
        id: 16,
        name: "Olive Drab Cargos",
        category: "Pants",
        price: 3400,
        image: prodImg13,
        rating: 4.8,
        stock: 20,
        minStock: 12,
        sku: "ODC-016",
        fullDescription: "Modern military-inspired cargos with a tapered fit. Featuring reinforced stitching and multiple secure pockets."
    },
    {
        id: 17,
        name: "Urban Knit Sweater",
        category: "Sweatshirt",
        price: 2900,
        image: prodImg14,
        rating: 4.6,
        stock: 12,
        minStock: 8,
        sku: "UKS-017",
        fullDescription: "A cozy, heavy-knit sweater for the colder months. Minimalist design with a focus on texture and quality."
    },
    {
        id: 18,
        name: "Peak Performance Cap",
        category: "Accessories",
        price: 1200,
        image: prodImg15,
        rating: 4.9,
        stock: 30,
        minStock: 10,
        sku: "PPC-018",
        fullDescription: "Water-repellent performance cap with an adjustable strap. Perfect for outdoor activities or urban exploration."
    },
    {
        id: 19,
        name: "Street Icon Hoodie",
        category: "Sweatshirt",
        price: 3100,
        image: prodImg3,
        rating: 5.0,
        stock: 18,
        minStock: 10,
        sku: "SIH-019",
        fullDescription: "Our limited edition Street Icon hoodie features bold reflective branding on the back. Heavy-weight fleece for premium feel."
    },
    {
        id: 22,
        name: "Urban Leather Belt",
        category: "Accessories",
        price: 1800,
        image: prodImg16,
        rating: 4.7,
        stock: 15,
        minStock: 5,
        sku: "ULB-022",
        fullDescription: "Handcrafted genuine leather belt with a matte black buckle. A versatile accessory that lasts for years."
    },
    {
        id: 23,
        name: "Neon Nights Tee",
        category: "T-Shirt",
        price: 1500,
        image: prodImg17,
        rating: 4.8,
        stock: 35,
        minStock: 10,
        sku: "NNT-023",
        fullDescription: "Cyberpunk-inspired neon graphics on a premium black tee. Guaranteed to turn heads after dark."
    },
    {
        id: 24,
        name: "Vintage Wash Crew",
        category: "Sweatshirt",
        price: 2800,
        image: prodImg18,
        rating: 4.6,
        stock: 20,
        minStock: 10,
        sku: "VWC-024",
        fullDescription: "Pigment-dyed for a vintage look and feel. Each piece is unique and gets softer with every wash."
    },
    {
        id: 25,
        name: "Urban Cargo Shorts",
        category: "Pants",
        price: 2400,
        image: prodImg19,
        rating: 4.5,
        stock: 30,
        minStock: 15,
        sku: "UCS-025",
        fullDescription: "Comfortable and practical cargo shorts for the warm summer days. Featuring durable ripstop fabric."
    },
    {
        id: 26,
        name: "Slate Puffer Jacket",
        category: "Jacket",
        price: 4800,
        image: prodImg6,
        rating: 4.9,
        stock: 12,
        minStock: 10,
        sku: "SPJ-026",
        fullDescription: "Deep slate puffer jacket with recycled insulation. Extremely warm and lightweight for the modern urban dweller."
    },
    {
        id: 27,
        name: "Lavender Street Tee",
        category: "T-Shirt",
        price: 1300,
        image: prodImg1,
        rating: 4.7,
        stock: 45,
        minStock: 20,
        sku: "LST-027",
        fullDescription: "Soft lavender hue in our signature boxy fit. Perfect for spring/summer layering or a clean standalone look."
    },
    {
        id: 28,
        name: "Onyx Utility Cargo",
        category: "Pants",
        price: 3800,
        image: prodImg20,
        rating: 4.8,
        stock: 18,
        minStock: 12,
        sku: "OUC-028",
        fullDescription: "Professional-grade utility cargos in deep onyx black. Featuring reinforced knees and breathable tech fabric."
    },
    {
        id: 29,
        name: "Cyber Graphic Tee",
        category: "T-Shirt",
        price: 1600,
        image: prodImg8,
        rating: 4.9,
        stock: 32,
        minStock: 15,
        sku: "CGT-029",
        fullDescription: "Neon cyber-themed graphics on premium heavy-weight cotton. A bold statement piece for any streetwear collection."
    },
    {
        id: 30,
        name: "Sherpa Fleece Hoodie",
        category: "Sweatshirt",
        price: 3500,
        image: prodImg14,
        rating: 4.7,
        stock: 10,
        minStock: 5,
        sku: "SFH-030",
        fullDescription: "Ultra-soft sherpa-lined hoodie. The peak of comfort and warmth for the chilliest winter days."
    },
    {
        id: 31,
        name: "Modern Bomber Jacket",
        category: "Jacket",
        price: 4200,
        image: prodImg2,
        rating: 4.8,
        stock: 14,
        minStock: 8,
        sku: "MBJ-031",
        fullDescription: "A minimalist take on the classic bomber. Featuring a sleek sateen finish and hidden zippered utility pockets."
    },
    {
        id: 32,
        name: "Acid Wash Hoodie",
        category: "Sweatshirt",
        price: 3200,
        image: prodImg3,
        rating: 4.6,
        stock: 22,
        minStock: 10,
        sku: "AWH-032",
        fullDescription: "Unique acid wash finish on heavy-weight loopback terry. Each piece has a distinct, weathered look."
    },
    {
        id: 33,
        name: "Technical Windbreaker",
        category: "Jacket",
        price: 3900,
        image: prodImg4,
        rating: 4.8,
        stock: 15,
        minStock: 8,
        sku: "TWN-033",
        fullDescription: "Ultra-breathable technical windbreaker with mesh lining and adjustable bungees for the perfect fit."
    },
    {
        id: 34,
        name: "Earth Day Cargos",
        category: "Pants",
        price: 3400,
        image: prodImg13,
        rating: 4.7,
        stock: 20,
        minStock: 12,
        sku: "EDC-034",
        fullDescription: "Sustainable cotton blend cargos in olive earth tones. Durable, eco-friendly, and stylish."
    },
    {
        id: 35,
        name: "Vintage Indigo Denim",
        category: "Trending",
        price: 4500,
        image: prodImg11,
        rating: 4.9,
        stock: 12,
        minStock: 10,
        sku: "VID-035",
        fullDescription: "Raw indigo denim with a classic straight cut. Designed to break in and mold to your lifestyle."
    },
    {
        id: 36,
        name: "Retro City Cap",
        category: "Accessories",
        price: 1100,
        image: prodImg15,
        rating: 4.8,
        stock: 40,
        minStock: 15,
        sku: "RCC-036",
        fullDescription: "Classic 6-panel city cap with vintage-inspired embroidery. Adjustable closure for all-day comfort."
    },
    {
        id: 37,
        name: "Urban Commute Tote",
        category: "Accessories",
        price: 1800,
        image: prodImg10,
        rating: 4.7,
        stock: 25,
        minStock: 10,
        sku: "UCT-037",
        fullDescription: "Heavy-duty canvas tote with reinforced handles. Perfect for carrying your daily essentials in style."
    }
];

const INITIAL_ORDERS = [
    { id: "ORD-7231", customer: "Sudip Chaudhari", date: "Feb 24, 2026", amount: 2500, status: "Delivered", method: "Esewa" },
    { id: "ORD-7232", customer: "Satyam Limbu", date: "Feb 25, 2026", amount: 1200, status: "Pending", method: "Cash on Delivery" },
    { id: "ORD-7233", customer: "Kushal Nepal", date: "Feb 26, 2026", amount: 3500, status: "Shipped", method: "Khalti" },
    { id: "ORD-7234", customer: "Nabin Shrestha", date: "Feb 27, 2026", amount: 4800, status: "Delivered", method: "Esewa" },
    { id: "ORD-7235", customer: "Sujata Basnet", date: "Feb 28, 2026", amount: 1500, status: "Pending", method: "Khalti" },
];

export const StoreProvider = ({ children }) => {
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
        setProducts([...products, newProduct]);
    };

    const updateProduct = (id, updatedData) => {
        setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    // Inventory logic
    const updateStock = (id, newStock) => {
        setProducts(products.map(p => p.id === id ? { ...p, stock: newStock } : p));
    };

    // Order Management
    const addOrder = (order) => {
        setOrders(prev => [order, ...prev]);
        // Deduct stock
        setProducts(prevProducts => {
            return prevProducts.map(p => {
                const orderItem = order.items.find(item => item.name === p.name);
                if (orderItem) {
                    return { ...p, stock: Math.max(0, p.stock - orderItem.qty) };
                }
                return p;
            });
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
                return prevProducts.map(p => {
                    const orderItem = orderToCancel.items.find(item => item.name === p.name);
                    if (orderItem) {
                        return { ...p, stock: p.stock + orderItem.qty };
                    }
                    return p;
                });
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
