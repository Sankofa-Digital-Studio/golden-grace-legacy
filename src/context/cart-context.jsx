import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = useMemo(
    () => cart.reduce((acc, i) => acc + (i.quantity ?? 0), 0),
    [cart]
  );

const addToCart = (product) => {
  setCart((prev) => {
    const size = product.selectedSize ?? null;

    const exists = prev.find(
      (i) => i.id === product.id && (i.selectedSize ?? null) === size
    );

    if (exists) {
      return prev.map((i) =>
        i.id === product.id && (i.selectedSize ?? null) === size
          ? { ...i, quantity: (i.quantity ?? 0) + 1 }
          : i
      );
    }

    return [...prev, { ...product, quantity: 1 }];
  });

  // IMPORTANT: do NOT auto-open cart (your preference)
  // setIsCartOpen(true);
};


 const updateQuantity = (id, selectedSize, nextQuantity) => {
  const qty = Number(nextQuantity);

  // Guard: don't wipe cart on bad values
  if (!Number.isFinite(qty)) return;

  setCart((prev) =>
    prev
      .map((item) => {
        const sameLine =
          item.id === id && (item.selectedSize ?? null) === (selectedSize ?? null);

        if (!sameLine) return item;

        return { ...item, quantity: Math.max(0, qty) };
      })
      .filter((item) => (item.quantity ?? 0) > 0)
  );
};

const removeItem = (id, selectedSize) => {
  setCart((prev) =>
    prev.filter(
      (item) =>
        !(item.id === id && (item.selectedSize ?? null) === (selectedSize ?? null))
    )
  );
};



  const value = useMemo(
    () => ({
      cart,
      cartCount,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      addToCart,
      updateQuantity,
    }),
    [cart, cartCount, isCartOpen]
  );

  return <CartContext.Provider value={{ ...value, removeItem }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within <CartProvider>");
  }
  return ctx;
};

export default CartProvider;