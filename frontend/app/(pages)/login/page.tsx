"use client";

import { lalezar, openSans } from "@/app/data/fonts";
import style from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { fetchAuth } from "@/app/utils/fetch";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(username: string, password: string) {
    const response = await fetchAuth(username, password);
    if (response) {
      
      window.location.href = "/profile";
    } else {
      alert("Nesprávné jméno nebo heslo");
    }
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
          type="submit"
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
