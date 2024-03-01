"use client";

import { useEffect, useState } from "react";
import style from "./page.module.css";
import { LocalStorage } from "@/app/components/LocalStorage";
import { fetchLecturer } from "@/app/utils/fetch";
import { useSearchParams } from "next/navigation";

export default function Profile() {
  const [token, setToken] = LocalStorage("token", null);

  const uuid: string = useSearchParams().get("uuid")!;

  useEffect(() => {
    async function lec() {
      await fetchLecturer(uuid).then((res) => console.log(res));
    }
    lec();
  }, []);

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
