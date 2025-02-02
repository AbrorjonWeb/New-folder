import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "light",
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),
}));

export const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, done: false }],
    })),
  removeTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    })),
}));

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const exists = state.cart.find((p) => p.id === product.id);
      return {
        cart: exists
          ? state.cart.map((p) =>
              p.id === product.id ? { ...p, qty: p.qty + 1 } : p
            )
          : [...state.cart, { ...product, qty: 1 }],
      };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0),
    })),
  clearCart: () => set({ cart: [] }),
}));

export const useAuthStore = create((set) => ({
  user: null,
  login: (username) => set({ user: { username } }),
  logout: () => set({ user: null }),
}));

export const useLangStore = create((set) => ({
  language: "uz",
  setLanguage: (lang) => set({ language: lang }),
}));
