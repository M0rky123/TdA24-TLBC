"use client";

import style from "../styles/Filtering.module.css";
import { faAnglesDown, faCoins, faMagnifyingGlass, faMapPin, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { openSans } from "../data/fonts";
import { getMetadata } from "../utils/fetch";
import Slider from "@mui/material/Slider";

export default function Filtering() {
  const [locArray, setLocArray] = useState<string[]>([]);
  const [tagArray, setTagArray] = useState<string[]>([]);
  const [priceArray, setPriceArray] = useState<number[]>([0, 0]);

  const [tags, setTags] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([]);

  const minDistance = 1;

  useEffect(() => {
    getMetadata().then((res) => {
      setTags(res.existing_tags);
      setLocations(res.location);
      setPrice([res.min_max.min, res.min_max.max]);
      setPriceArray([res.min_max.min, res.min_max.max]);
    });
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

  const sliderOnChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceArray([Math.min(newValue[0], priceArray[1] - minDistance), priceArray[1]]);
    } else {
      setPriceArray([priceArray[0], Math.max(newValue[1], priceArray[0] + minDistance)]);
    }
  };

  return (
    <div className={style.filters + " " + openSans}>
      <div className={style.filter}>
        <span className={style.filter_text}>
          <FontAwesomeIcon icon={faMapPin} size="xl" />
          &nbsp;&nbsp;Lokalita
        </span>
        <FontAwesomeIcon className={style.arrow} icon={faAnglesDown} size="xl" />
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
          <FontAwesomeIcon icon={faTag} size="xl" />
          &nbsp;&nbsp;Tagy
        </span>
        <FontAwesomeIcon className={style.arrow} icon={faAnglesDown} size="xl" />
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
          <FontAwesomeIcon icon={faCoins} size="xl" />
          &nbsp;&nbsp;Cena
        </span>
        <FontAwesomeIcon className={style.arrow} icon={faAnglesDown} size="xl" />
        <div className={style.list + " " + style.price}>
          <div className={style.inputs}>
            <input
              className={style.input}
              type="number"
              value={priceArray[0]}
              min={price[0]}
              max={priceArray[1] - 1}
              onChange={(e) => setPriceArray([parseInt(e.target.value), priceArray[1]])}
              name="min"
            />
            <input
              className={style.input}
              type="number"
              value={priceArray[1]}
              min={priceArray[0] + 1}
              max={price[1]}
              onChange={(e) => setPriceArray([priceArray[0], parseInt(e.target.value)])}
              name="max"
            />
          </div>
          <div className={style.slider}>
            <Slider value={priceArray} step={1} min={price[0]} max={price[1]} onChange={sliderOnChange} disableSwap size="small" />
          </div>
        </div>
      </div>
      <div className={`${style.filter} ${style.search}`}>
        <span className={style.filter_text}>Vyhledat</span>
        <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
      </div>
    </div>
  );
}
