"use client";

import { lalezar, openSans } from "@/app/data/fonts";
import style from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const route = useRouter();

  async function handleLogin(username: string, password: string) {
    await fetch("http://localhost/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username, password: password }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          sessionStorage.setItem("auth_key", res.auth_key);
          sessionStorage.setItem("lector_id", res.lector_id);
          route.push("/profile");
        });
      } else {
        // throw new Error("There was a problem with the fetch operation");
        res.json().then((res) => {
          if (res.status == "name") alert("Zadané lektorské jméno neexistuje!");
          else if (res.status == "pass") alert("Hesla se neschodují!");
          else alert("Něco se pokazilo!");
        });
      }
    });
    // .then((res) => route.push("/profile?uuid=6dee7e9a-7548-4ab4-863d-d8b5ad20bf28"));
  }

  return (
    <div className={style.container}>
      <h1 className={lalezar} style={{ color: "var(--dark)", lineHeight: "1", marginBottom: "1rem" }}>
        Login
      </h1>
      <form className={openSans + " " + style.form} method="post">
        <div className={style.field}>
          <label htmlFor="user">Lektorské jméno</label>
          <input type="text" id="user" name="user" value={username} onChange={(e) => setUsername(e.currentTarget.value)} className={style.input} />
        </div>
        <div className={style.field}>
          <label htmlFor="pass">Lektorské heslo</label>
          <input
            type={showPass ? "text" : "password"}
            id="pass"
            name="pass"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className={style.input}
          />
          <button className={style.icon} type="button" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
            <FontAwesomeIcon icon={showPass ? faEye : faEyeSlash} />
          </button>
        </div>
        <button
          type="button"
          className={style.button}
          onKeyDown={(key) => {
            if (key.key == "Enter") {
              key.currentTarget.click();
            }
          }}
          onClick={() => {
            handleLogin(username, password);
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
