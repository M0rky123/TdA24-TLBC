import { Metadata } from "next";
import Button from "./components/Button";
import Image from "next/image";
import classroom from "./images/classroom.jpg";
import style from "./styles/Home.module.css";
import { lalezar, openSans } from "./data/fonts";
import WhyUsCards from "./components/WhyUsCards";

export const metadata: Metadata = {
  title: "Domů",
};

export default async function Home() {
  return (
    <>
      <section className={style.intro}>
        <div className={style.wrapper}>
          <div>
            <h1 className={style.header + " " + lalezar}>Teacher digital Agency</h1>
            <p className={style.paragraph + " " + openSans}>Cesta za znalostmi začíná s námi!</p>
          </div>
          <div className={style.btns}>
            <Button text="To mě zajímá" url="/lecturers" variant="yellow" />
            <Button text="Chci se stát lektorem" url="/contact" variant="blue" />
          </div>
        </div>
        <Image src={classroom} alt="fotografie třídy" height={320} className={style.image} />
      </section>
      <WhyUsCards />
    </>
  );
}
