import style from "@/app/styles/Button.module.css";
import Link from "next/link";
import { lalezar } from "../data/fonts";

export default function Button({
  text,
  url,
  variant,
  active,
  width,
}: {
  text: string;
  url: string;
  variant?: "white" | "yellow" | "blue";
  active?: boolean;
  width?: string;
}) {
  let color = "";
  if (variant === "yellow") color = style.yellow;
  if (variant === "blue") color = style.blue;
  const selected = active ? style.active : "";

  return (
    <Link href={url} className={style.link + " " + color + " " + selected} style={{ width: width }}>
      <span className={lalezar}>{text}</span>
    </Link>
  );
}
