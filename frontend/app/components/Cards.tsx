"use client";

import { Key, useEffect, useState } from "react";
import { fetchLecturerPack } from "../utils/fetch";
import Card from "./Card";
import style from "@/app/styles/Cards.module.css";

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
  tags?: { name: string; uuid: string };
  price_per_hour?: number;
}

export default function Cards({ page, locArray, tagArray, priceArray }: CardsProps) {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);

  useEffect(() => {
    async function getLecturers() {
      const data = await fetchLecturerPack(page, 8);
      setLecturers(data);
    }
    getLecturers();
  }, [page]);

  return (
    <section className={style.cards}>
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
          tags={lecturer.tags?.map((tag) => tag.name)}
          price_per_hour={lecturer.price_per_hour}
        />
      ))}
    </section>
  );
}
