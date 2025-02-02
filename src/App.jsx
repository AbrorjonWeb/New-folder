import React from "react";
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

  const texts = {
    uz: { hello: "Salom", change: "Tilni o‘zgartirish" },
    en: { hello: "Hello", change: "Change Language" },
  };

  return (
    <div className={theme}>
      <h1>{texts[language].hello}</h1>
      <button
        className=" rounded-md bg-gradient-to-b from-[#190019] via-[#2B124C] via-[#52285B] via-[#854F6C] via-[#DFB6B2] to-[#FBE4D8] p-2 mr-2"
        onClick={toggleTheme}
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
      <button
        className=" rounded-md bg-gradient-to-b from-[#190019] via-[#2B124C] via-[#52285B] via-[#854F6C] via-[#DFB6B2] to-[#FBE4D8] p-2"
        onClick={() => setLanguage(language === "uz" ? "en" : "uz")}
      >
        {texts[language].change}
      </button>
      <hr />
      <br />
      <hr />
      <h2>Todo List:</h2>
      <input className="border-2 mr-3" id="task" />
      <button
        className=" rounded-md bg-gradient-to-b from-[#190019] via-[#2B124C] via-[#52285B] via-[#854F6C] via-[#DFB6B2] to-[#FBE4D8] p-2"
        onClick={() => addTodo(document.getElementById("task").value)}
      >
        Qoshish
      </button>
      <ul>
        {todos.map((t) => (
          <li
            key={t.id}
            style={{ textDecoration: t.done ? "line-through" : "none" }}
          >
            {t.text}
            <button
              className=" rounded-md bg-gradient-to-b from-[#190019] via-[#2B124C] via-[#52285B] via-[#854F6C] via-[#DFB6B2] to-[#FBE4D8] p-2"
              onClick={() => toggleTodo(t.id)}
            >
              ✔
            </button>
            <button
              className=" rounded-md bg-gradient-to-b from-[#190019] via-[#2B124C] via-[#52285B] via-[#854F6C] via-[#DFB6B2] to-[#FBE4D8] p-2"
              onClick={() => removeTodo(t.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <br />
      <hr />
      <h2>Shopping Cart:</h2>
      <button
        className=" rounded-md bg-gradient-to-b from-[#190019] via-[#2B124C] via-[#52285B] via-[#854F6C] via-[#DFB6B2] to-[#FBE4D8] p-2 mr-2"
        onClick={() => addToCart({ id: 1, name: "Laptop", price: 1000 })}
      >
        add ietm
      </button>
      <button
        className=" rounded-md bg-gradient-to-b from-[#190019] via-[#2B124C] via-[#52285B] via-[#854F6C] via-[#DFB6B2] to-[#FBE4D8] p-2"
        onClick={clearCart}
      >
        clear
      </button>
      <ul>
        {cart.map((p) => (
          <li className="list-none" key={p.id}>
            {p.name} ({p.qty}x)
            <button
              className=" rounded-md bg-gradient-to-b from-[#190019] via-[#2B124C] via-[#52285B] via-[#854F6C] via-[#DFB6B2] to-[#FBE4D8] p-2"
              onClick={() => removeFromCart(p.id)}
            >
              ➖
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <br />
      <hr />
      {user ? (
        <div className="bg-blue-600 flex gap-19  w-[400px]">
          <p>ustoz {user.username}?</p>
          <button
            className=" rounded-md p-2  bg-gradient-to-b from-[#190019] via-[#2B124C] via-[#52285B] via-[#854F6C] via-[#DFB6B2] to-[#FBE4D8]"
            onClick={logout}
          >
            chiqing
          </button>
        </div>
      ) : (
        <button
          className=" rounded-md bg-gradient-to-b from-[#190019] via-[#2B124C] via-[#52285B] via-[#854F6C] via-[#DFB6B2] to-[#FBE4D8] p-2"
          onClick={() => login("100 ball qoyib bera olasizmi😁 ")}
        >
          bosing
        </button>
      )}
    </div>
  );
}

export default App;
