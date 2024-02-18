"use client";

import style from "../styles/Filtering.module.css";
import { faAnglesDown, faCoins, faMagnifyingGlass, faMapPin, faMinus, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { openSans } from "../data/fonts";
import { getMetadata } from "../utils/fetch";

export default function Filtering() {
  const [locArray, setLocArray] = useState<string[]>([]);
  const [tagArray, setTagArray] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const [tags, setTags] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [price, setPrice] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });

  useEffect(() => {
    async function fetch() {
      await getMetadata().then((res) => {
        setTags(res.existing_tags);
        setLocations(res.location);
        setPrice(res.min_max);
      });
    }
    fetch();
  }, []);

  function modifyArray(item: string, array: string[], setArray: (array: string[]) => void) {
    const index = array.indexOf(item);
    if (index > -1) {
      const newArray = [...array];
      newArray.splice(index, 1);
      setArray(newArray);
    } else {
      setArray([...array, item]);
    }
  }

  return (
    <div className={style.filters + " " + openSans}>
      <div className={style.filter}>
        <span className={style.filter_text}>
          <FontAwesomeIcon icon={faMapPin} />
          &nbsp;Lokalita
        </span>
        <FontAwesomeIcon className={style.arrow} icon={faAnglesDown} />
        <ul className={style.list}>
          {locations.map((item) => (
            <li
              onClick={(e) => {
                modifyArray(e.currentTarget.innerText, locArray, setLocArray);
                e.currentTarget.classList.toggle(style.selected);
              }}
              key={item}
              className={style.item}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={style.filter}>
        <span className={style.filter_text}>
          <FontAwesomeIcon icon={faTag} />
          &nbsp;Tagy
        </span>
        <FontAwesomeIcon className={style.arrow} icon={faAnglesDown} />
        <ul className={style.list}>
          {tags.map((item) => (
            <li
              onClick={(e) => {
                modifyArray(e.currentTarget.innerText, tagArray, setTagArray);
                e.currentTarget.classList.toggle(style.selected);
              }}
              key={item}
              className={style.item}
            >
              {item[1]}
            </li>
          ))}
        </ul>
      </div>
      <div className={style.filter}>
        <span className={style.filter_text}>
          <FontAwesomeIcon icon={faCoins} />
          &nbsp;Cena
        </span>
        <FontAwesomeIcon className={style.arrow} icon={faAnglesDown} />
        <div className={style.list + " " + style.prices}>
          <div className={style.min}>
            <label htmlFor="min" className={style.label}>
              Minimální cena
            </label>
            <input
              type="number"
              onChange={() => {
                console.log("change");
              }}
              onInput={() => {
                console.log("input");
              }}
              key={price.min}
              value={price.min}
              name="min"
              className={style.input}
            />
          </div>
          <FontAwesomeIcon icon={faMinus} className={style.minus} />
          <div className={style.max}>
            <label htmlFor="max" className={style.label}>
              Maximální cena
            </label>
            <input
              type="number"
              onChange={() => {
                console.log("change");
              }}
              onInput={() => {
                console.log("input");
              }}
              key={price.max}
              value={price.max}
              name="max"
              className={style.input}
            />
          </div>
        </div>
      </div>
      <div className={`${style.filter} ${style.search}`}>
        <span className={style.filter_text}>Vyhledat</span>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </div>
  );
}
