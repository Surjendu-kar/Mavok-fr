import { create } from 'zustand';
import { LocalStorageKeys } from '@/enum';
import { removeLocalStorage, setLocalStorage, getLocalStorage } from '@/utils';

type AccessoriesWithQuantity = Accessories & { quantity: number };

interface CartStore {
  items: AccessoriesWithQuantity[];
  addItem: (item: Accessories) => void;
  removeItem: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  total: () => number;
  totalQuantity: () => number;
}

const useCartStore = create<CartStore>((set, get) => ({
  // get items from local storage if exists
  items: getLocalStorage(LocalStorageKeys.CART),

  // add item to cart
  addItem: item => {
    set(state => {
      const existingItem = state.items.find(i => i.id === item.id);

      if (existingItem) {
        // If item exists, increment its quantity
        const updatedItems = state.items.map(i =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
        return { items: updatedItems };
      }

      // If item is new, add it with quantity 1
      return { items: [...state.items, { ...item, quantity: 1 }] };
    });

    setLocalStorage(LocalStorageKeys.CART, get().items);
  },

  // remove item from cart
  removeItem: id => {
    const items = get().items.filter(item => item.id !== id);
    set({ items });
    setLocalStorage(LocalStorageKeys.CART, items);
  },

  // decrease quantity of item
  decreaseQuantity: id => {
    const item = get().items.find(item => item.id === id);

    if (item && item.quantity <= 1) {
      get().removeItem(id);
      return;
    }

    const items = get().items.map(item =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );

    set({ items });
    setLocalStorage(LocalStorageKeys.CART, items);
  },

  // clear cart
  clearCart: () => {
    set({ items: [] });
    removeLocalStorage(LocalStorageKeys.CART);
  },

  // total price of items in cart
  total: () => {
    const items = get().items;
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  // total quantity of items in cart
  totalQuantity: () => {
    const items = get().items;
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));

export default useCartStore;
