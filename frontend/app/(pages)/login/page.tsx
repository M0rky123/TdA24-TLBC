import { lalezar, openSans } from "@/app/data/fonts";
import style from "./page.module.css";

export default function Login() {
  return (
    <div className={style.container}>
      <h1 className={lalezar}>Login</h1>
      <form className={openSans + " " + style.form}>
        <input type="text" placeholder="Lektorské jméno" className={style.input} />
        <input type="password" placeholder="Lektorské heslo" className={style.input} />
        <button type="submit" className={style.button}>
          Login
        </button>
      </form>
    </div>
  );
}
