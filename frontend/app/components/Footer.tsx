import Image from "next/image";
import { openSans } from "../data/fonts";
import style from "@/app/styles/Footer.module.css";
import logo from "@/app/images/logo.svg";
import Button from "./Button";

export default function Footer() {
  return (
    <footer className={openSans}>
      <div className={style.upper}>
        <Image src={logo} alt="logo" width={80} priority />
        <Button text="Přihlášení pro lektory" url="/login" />
      </div>
      <div className={style.lower}>
        <p>
          <strong style={{ fontWeight: 300 }}>Copyright © 2023 Teacher digital Agency | </strong>
          <b>Všechna práva vyhrazena</b>
        </p>
        <span>Made with ❤️ by The Last Brain Cell</span>
      </div>
    </footer>
  );
}
