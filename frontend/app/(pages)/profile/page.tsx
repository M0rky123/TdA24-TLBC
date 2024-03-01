"use client";

import { useEffect } from "react";
import style from "./page.module.css";
import { LocalStorage } from "@/app/components/LocalStorage";
import { fetchLecturer } from "@/app/utils/fetch";
import { useSearchParams } from "next/navigation";

export default function Profile() {
  const [token, setToken] = LocalStorage("token", null);
  const lecturer = fetchLecturer("uuid");
  const uuid = useSearchParams().get("uuid");
  useEffect(() => {}, []);

  return (
    <>
      {/* <input
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
      <p>{token}</p> */}
    </>
  );
}
