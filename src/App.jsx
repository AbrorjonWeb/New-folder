import React, { useState } from "react";
import { useThemeStore } from "./store";
import { useTodoStore } from "./store";
import { useCartStore } from "./store";
import { useAuthStore } from "./store";
import { useLangStore } from "./store";

function App() {
  const { theme, toggleTheme } = useThemeStore();
  const { todos, addTodo, removeTodo, toggleTodo } = useTodoStore();
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();
  const { user, login, logout } = useAuthStore();
  const { language, setLanguage } = useLangStore();
  const [isLogged, setIsLogged] = useState(false);

  const texts = {
    uz: { hello: "Salom", change: "Tilni o‘zgartirish" },
    en: { hello: "Hello", change: "Change Language" },
  };

  return (
    <div
      className={`${theme} min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold">{texts[language].hello}</h1>
        <div className="mt-4 flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={toggleTheme}
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            onClick={() => setLanguage(language === "uz" ? "en" : "uz")}
          >
            {texts[language].change}
          </button>
        </div>

        <hr className="my-4 border-gray-400" />

        {}
        <h2 className="text-xl font-semibold">Todo List:</h2>
        <div className="mt-2 flex gap-2">
          <input className="border-2 rounded-lg px-3 py-1 flex-1" id="task" />
          <button
            className="px-4 py-2 bg-purple-500 text-blue rounded-lg hover:bg-purple-600 transition"
            onClick={() => addTodo(document.getElementById("task").value)}
          >
            Qo‘shish
          </button>
        </div>
        <ul className="mt-3 space-y-2">
          {todos.map((t) => (
            <li
              key={t.id}
              className={`p-2 rounded-lg shadow-md flex justify-between items-center ${
                t.done ? "line-through text-gray-500" : ""
              }`}
            >
              {t.text}
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded-md"
                  onClick={() => toggleTodo(t.id)}
                >
                  ✔
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                  onClick={() => removeTodo(t.id)}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>

        <hr className="my-4 border-gray-400" />

        {}
        <h2 className="text-xl font-semibold">Shopping Cart:</h2>
        <div className="mt-2 flex gap-2">
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            onClick={() => addToCart({ id: 1, name: "Laptop", price: 1000 })}
          >
            Add Item
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={clearCart}
          >
            Clear
          </button>
        </div>
        <ul className="mt-3 space-y-2">
          {cart.map((p) => (
            <li
              key={p.id}
              className="p-2 rounded-lg bg-gray-200 flex justify-between items-center"
            >
              {p.name} ({p.qty}x)
              <button
                className="px-2 py-1 bg-red-500 text-white rounded-md"
                onClick={() => removeFromCart(p.id)}
              >
                ➖
              </button>
            </li>
          ))}
        </ul>

        <hr className="my-4 border-gray-400" />

        {}
        {isLogged ? (
          <p className="text-xl font-semibold text-green-500">
            Ustoz menimcha endi 100 ball bersangiz bo‘ladi 😁
          </p>
        ) : user ? (
          <div className="bg-blue-600 p-3 text-white rounded-lg flex justify-between items-center">
            <p>salom {user.username}!</p>
            <button
              className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition"
              onClick={() => {
                logout();
                setIsLogged(false);
              }}
            >
              Chiqish
            </button>
          </div>
        ) : (
          <button
            className="mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition"
            onClick={() => setIsLogged(true)}
          >
            Bosing
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
