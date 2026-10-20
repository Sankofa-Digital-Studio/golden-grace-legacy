import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();
const CART_STORAGE_KEY = 'golden-grace-cart';

const readStoredCart = () => {
  if (typeof window === 'undefined') return [];

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
};

const isSameLineItem = (item, id, selectedSize) =>
  item.id === id && item.selectedSize === selectedSize;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(readStoredCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // A blocked or full storage quota must not break ordering.
    }
  }, [cart]);

  const addToCart = (product, selectedSize = product.sizes?.[0]) => {
    const lineItem = { ...product, selectedSize };

    setCart((prev) => {
      const exists = prev.find((item) => isSameLineItem(item, product.id, selectedSize));

      if (exists) {
        return prev.map((item) =>
          isSameLineItem(item, product.id, selectedSize)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...lineItem, quantity: 1 }];
    });
  };

  const updateQuantity = (id, selectedSize, quantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          isSameLineItem(item, id, selectedSize)
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id, selectedSize) => {
    setCart((prev) => prev.filter((item) => !isSameLineItem(item, id, selectedSize)));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
