"use client";

import { lalezar } from "@/app/data/fonts";
import Filtering from "@/app/components/Filtering";
import Paging from "@/app/components/Paging";
import { useEffect, useState } from "react";
import Cards from "@/app/components/Cards";

export default function Lecturers() {
  useEffect(() => {
    document.title = "Katalog lektorů";
  }, []);

  const [locArray, setLocArray] = useState<string[]>([]);
  const [tagArray, setTagArray] = useState<string[]>([]);
  const [priceArray, setPriceArray] = useState<number[]>([0, 0]);

  const [page, setPage] = useState<number>(1);

  return (
    <>
      <h1 className={lalezar} style={{ color: "var(--dark)", fontSize: "3rem", margin: "0 auto" }}>
        Katalog lektorů
      </h1>
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
