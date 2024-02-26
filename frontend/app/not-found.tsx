// import { openSans } from "./data/fonts";
import { Open_Sans } from "next/font/google";
const openSans = Open_Sans({ subsets: ["latin"] });

export default function NotFount() {
  return (
    <div className={openSans.className} style={{ margin: "auto", fontSize: "1.5rem", fontWeight: "bold", color: "var(--black)" }}>
      Stránka kterou hledáte nebyla nalezena...
    </div>
  );
}
