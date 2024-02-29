"use client";

import { useEffect } from "react";
import style from "./page.module.css";
import { LocalStorage } from "@/app/components/LocalStorage";
import { fetchLecturer,fetchAuth } from "@/app/utils/fetch";

export default function Profile() {
  const [token, setToken] = LocalStorage("token", null);
  const lecturer = fetchLecturer();

  useEffect(() => {}, []);

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
