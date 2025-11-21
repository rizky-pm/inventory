import type { IProduct } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IProductInCart extends IProduct {
  qty: number;
}

interface ICartState {
  products: IProductInCart[];
  addProduct: (item: IProductInCart) => void;
  removeProduct: (item: IProductInCart['id']) => void;
  updateQty: (id: IProductInCart['id'], qty: IProductInCart['qty']) => void;
  increaseQty: (id: IProductInCart['id']) => void;
  decreaseQty: (id: IProductInCart['id']) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<ICartState>()(
  persist(
    (set, get) => ({
      products: [],

      addProduct: (product) =>
        set((state) => {
          const existing = state.products.find((i) => i.id === product.id);

          if (existing) {
            return {
              products: state.products.map((i) =>
                i.id === product.id
                  ? {
                      ...i,
                      qty: i.qty + product.qty,
                    }
                  : i
              ),
            };
          }
          return { products: [...state.products, product] };
        }),

      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((i) => i.id !== id),
        })),

      updateQty: (id, quantity) =>
        set((state) => ({
          products: state.products.map((i) =>
            i.id === id ? { ...i, qty: quantity } : i
          ),
        })),

      increaseQty: (id) =>
        set((state) => ({
          products: state.products.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i
          ),
        })),

      decreaseQty: (id) =>
        set((state) => {
          const updated = state.products
            .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0);
          return { products: updated };
        }),

      clearCart: () => set({ products: [] }),

      total: () => get().products.reduce((sum, i) => sum + i.qty, 0),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ products: state.products }),
    }
  )
);
