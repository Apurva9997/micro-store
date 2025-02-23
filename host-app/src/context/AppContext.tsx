import React, { createContext, useContext, useState, useCallback } from "react";
import { toast } from "react-hot-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface AppContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Calculate total quantity of items in cart
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = useCallback((product: Omit<CartItem, "quantity">) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      const newItems = existingItem
        ? currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...currentItems, { ...product, quantity: 1 }];
      return newItems;
    });
    toast.success(`Added ${product.name} to cart`);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((currentItems) => {
      const item = currentItems.find((i) => i.id === productId);
      if (item) {
        toast.success(`Removed ${item.name} from cart`);
      }
      return currentItems.filter((item) => item.id !== productId);
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCartItems((currentItems) => {
      const item = currentItems.find((i) => i.id === productId);
      if (item && quantity === 0) {
        toast.success(`Removed ${item.name} from cart`);
      }
      return quantity === 0
        ? currentItems.filter((item) => item.id !== productId)
        : currentItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
