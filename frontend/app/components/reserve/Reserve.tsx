"use client";

import { useEffect, useState } from "react";
import style from "../../styles/reserve/Reserve.module.css";
import { reserve } from "@/app/data/reserve";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import ReserveContact from "./ReserveContact";
import ReservePlace from "./ReservePlace";
import ReserveDate from "./ReserveDate";
import ReserveRecap from "./ReserveRecap";

export default function Reserve() {
  const [fName, setFName] = useState<string>("");

  const items = [<ReserveContact fName={fName} setFName={setFName} />, <ReservePlace />, <ReserveDate />, <ReserveRecap />];

  useEffect(() => {
    console.log(fName);
  }, [fName]);

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
