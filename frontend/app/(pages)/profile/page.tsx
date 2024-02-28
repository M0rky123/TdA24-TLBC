"use client";

import style from "./page.module.css";
import { auth } from "@/app/components/Auth";

export default function Profile() {
  console.log(auth);
  const [token, setToken, clear] = auth("");
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
