import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types/product';

interface CartItem {
  product: Product;
  quantity: number;
  images?: string[];
}

interface User {
  _id: string;
  name: string;
  email: string;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, images?: string[]) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // User
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Cart state
      cart: [],
      
      addToCart: (product, quantity, images) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.product._id === product._id);
          
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return {
            cart: [...state.cart, { product, quantity, images }],
          };
        }),
      
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product._id !== productId),
        })),
      
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        })),
      
      clearCart: () => set({ cart: [] }),
      
      // User state
      user: null,
      isAuthenticated: false,
      
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
      
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          cart: [],
        }),
    }),
    {
      name: 'printshop-storage',
    }
  )
);
