"use client";

import { useState } from "react";
import style from "../../styles/Reserve.module.css";
import ReserveItem from "./ReserveItem";
import { reserve } from "@/app/data/reserve";

export default function Reserve() {
  const [page, setPage] = useState(0);

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {reserve.map((item, index) => (
          <li key={index} onClick={() => setPage(index)} className={`${index === page ? style.activeItem : style.item}`}>
            {item}
          </li>
        ))}
      </ul>
      <ReserveItem page={page} />
    </div>
  );
}
