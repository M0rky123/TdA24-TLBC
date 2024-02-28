"use client";

import { lalezar, openSans } from "@/app/data/fonts";
import style from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Login() {
  const [showPass, setShowPass] = useState(false);

  // on enter, submit form
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });

  return (
    <div className={style.container}>
      <h1 className={lalezar} style={{ color: "var(--dark)", lineHeight: "1", marginBottom: "1rem" }}>
        Login
      </h1>
      <form className={openSans + " " + style.form} method="post">
        <div className={style.field}>
          <label htmlFor="user">Lektorské jméno</label>
          <input type="text" placeholder="" id="user" name="user" className={style.input} />
        </div>
        <div className={style.field}>
          <label htmlFor="pass">Lektorské heslo</label>
          <input type={showPass ? "text" : "password"} placeholder="" id="pass" name="pass" className={style.input} />
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
        >
          Login
        </button>
      </form>
    </div>
  );
}
