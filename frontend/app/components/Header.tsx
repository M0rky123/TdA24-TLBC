"use client";

import Image from "next/image";
import logo from "@/app/images/logo.svg";
import style from "@/app/styles/Header.module.css";
import Button from "./Button";
import { usePathname } from "next/navigation";
import { pages } from "@/app/data/pages";

export default function Header() {
  const url = usePathname();

  return (
    <header className={style.header}>
      <div>
        <Image src={logo} alt="logo" width={80} priority />
      </div>
      <nav className={style.nav}>
        {pages.map((page) => (
          <Button text={page[1]} url={page[0]} active={page[0] === url} key={"button" + Math.random()} />
        ))}
      </nav>
    </header>
  );
}
