"use client";

import { useEffect, useState } from "react";
import { fetchLecturerPack } from "../utils/fetch";
import Card from "./Card";
import style from "@/app/styles/Cards.module.css";
import { openSans } from "../data/fonts";
import BlankCard from "./BlankCard";
import Loader from "./Loader";

interface CardsProps {
  page: number;
  locArray: string[];
  tagArray: string[];
  priceArray: number[];
}

interface Lecturer {
  uuid?: string;
  title_before?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  title_after?: string;
  picture_url?: string;
  location?: string;
  claim?: string;
  tags?: [{ name: string; uuid: string }];
  price_per_hour?: number;
}

export default function Cards({ page, locArray, tagArray, priceArray }: CardsProps) {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [empty, setEmpty] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getLect() {
      setLoading(true);
      const data = await fetchLecturerPack(page, 12);
      setLecturers(data);
      data.length == 0 && setEmpty(true);
      setLoading(false);
    }
    getLect();
  }, [page]);

  return (
    <section className={style.cards}>
      {empty ? (
        <p className={openSans} style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          Nebyli nalezeni žádní lektoři.
        </p>
      ) : loading ? (
        <div style={{ margin: "0 auto", gridColumn: "1 / -1" }}>
          <Loader />
        </div>
      ) : (
        <>
          {lecturers.map((lecturer: Lecturer) => (
            <Card
              key={lecturer.uuid}
              uuid={lecturer.uuid}
              title_before={lecturer.title_before}
              first_name={lecturer.first_name}
              middle_name={lecturer.middle_name}
              last_name={lecturer.last_name}
              title_after={lecturer.title_after}
              picture_url={lecturer.picture_url}
              location={lecturer.location}
              claim={lecturer.claim}
              tags={lecturer.tags?.map((tag: { name: string; uuid: string }) => tag.name)}
              price_per_hour={lecturer.price_per_hour}
            />
          ))}
          {Array(12 - lecturers.length)
            .fill(null)
            .map((_, index) => (
              <BlankCard key={index} />
            ))}
        </>
      )}
    </section>
  );
}
