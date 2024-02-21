"use client";

import style from "./page.module.css";
import { lalezar } from "@/app/data/fonts";
import Filtering from "@/app/components/Filtering";
import Paging from "@/app/components/Paging";
import { useEffect, useState } from "react";
import Cards from "@/app/components/Cards";

export default function Lecturers() {
  document.title = "Katalog lektorů";

  const [locArray, setLocArray] = useState<string[]>([]);
  const [tagArray, setTagArray] = useState<string[]>([]);
  const [priceArray, setPriceArray] = useState<number[]>([0, 0]);

  const [page, setPage] = useState<number>(1);

  return (
    <>
      <h1 className={lalezar + " " + style.h1}>Katalog lektorů</h1>
      <Filtering
        locArray={locArray}
        setLocArray={setLocArray}
        tagArray={tagArray}
        setTagArray={setTagArray}
        priceArray={priceArray}
        setPriceArray={setPriceArray}
      />
      <Cards page={page} locArray={locArray} tagArray={tagArray} priceArray={priceArray} />
      <Paging page={page} setPage={setPage} />
    </>
  );
}
