import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  totalPrice: () =>
    get().items.reduce((total, item) => Math.round((total + item.price) * 100) / 100, 0)
}));

export default useCartStore;