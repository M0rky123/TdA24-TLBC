import { openSans } from "./data/fonts";

export default function NotFount() {
  return (
    <div className={openSans} style={{ margin: "auto", fontSize: "1.5rem", fontWeight: "bold", color: "var(--black)" }}>
      Stránka kterou hledáte nebyla nalezena...
    </div>
  );
}
