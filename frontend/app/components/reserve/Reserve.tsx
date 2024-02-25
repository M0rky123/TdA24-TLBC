"use client";

import { useState } from "react";
import style from "../../styles/reserve/Reserve.module.css";
import { reserve } from "@/app/data/reserve";
import ReserveContact from "./ReserveContact";
import ReserveDate from "./ReserveDate";
import ReservePlace from "./ReservePlace";
import ReserveRecap from "./ReserveRecap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

export default function Reserve() {
  const items = [ReserveContact(), ReservePlace(), ReserveDate(), ReserveRecap()];
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
      {items[page]}
      <div className={style.btns}>
        <button className={style.btn} disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          <FontAwesomeIcon icon={faArrowCircleLeft} size="3x" color={`var(--${page === 0 ? "black" : "dark"})`} />
        </button>
        <button className={style.btn} disabled={page === 3} onClick={() => setPage((p) => p + 1)}>
          <FontAwesomeIcon icon={faArrowCircleRight} size="3x" color={`var(--${page === 3 ? "black" : "dark"})`} />
        </button>
      </div>
    </div>
  );
}
