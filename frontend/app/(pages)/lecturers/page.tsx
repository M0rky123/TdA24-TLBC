import style from "./page.module.css";
import { lalezar } from "@/app/data/fonts";
import { Metadata } from "next";
import Filtering from "@/app/components/Filtering";
import Card from "@/app/components/Card";

export const metadata: Metadata = {
  title: "Katalog lektorů",
};

export default function Lecturers() {
  return (
    <>
      <h1 className={lalezar + " " + style.h1}>Katalog lektorů</h1>
      <Filtering />
      <Card />
    </>
  );
}
