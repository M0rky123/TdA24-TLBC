"use client";

import style from "./page.module.css";
import { Auth } from "@/app/components/Auth";

export default function Profile() {
  const [token, setToken, clear] = Auth("");
  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setToken(e.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          clear();
        }}
      >
        Clear
      </button>
      <p>{token}</p>
    </>
  );
}
