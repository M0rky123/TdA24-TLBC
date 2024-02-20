import Card from "./Card";
import style from "@/app/styles/Cards.module.css";

export default function Cards() {
  return (
    <section className={style.cards}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </section>
  );
}
