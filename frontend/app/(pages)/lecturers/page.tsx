import style from "@/app/styles/lecturers.module.css";
import { lalezar } from "@/app/data/fonts.js";
import { Metadata } from "next";
import Filtering from "@/app/components/Filtering";

export const metadata: Metadata = {
  title: "Katalog lektorů",
};

export default function Lecturers() {
  return (
    <>
      <h1 className={lalezar + " " + style.h1}>Katalog lektorů</h1>
      <hr />
      <Filtering />
    </>
  );
}
