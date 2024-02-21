import { Key } from "react";
import { fetchLecturerPack } from "../utils/fetch";
import Card from "./Card";
import style from "@/app/styles/Cards.module.css";

interface CardsProps {
  page: number;
  locArray: string[];
  tagArray: string[];
  priceArray: number[];
}

export default function Cards({ page, locArray, tagArray, priceArray }: CardsProps) {
  async function getLecturers() {
    const data = await fetchLecturerPack(page, 8);
    return data;
  }

  return (
    <section className={style.cards}>
      {getLecturers().then((data) =>
        data.forEach(
          (lecturer: {
            uuid: Key | null | undefined;
            first_name: string;
            last_name: string;
            claim: string | undefined;
            location: string | undefined;
            middle_name: string | undefined;
            picture_url: string | undefined;
            price_per_hour: number | undefined;
            tags: string[] | undefined;
            title_after: string | undefined;
            title_before: string | undefined;
          }) => {
            return (
              <Card
                key={lecturer.uuid}
                first_name={lecturer.first_name}
                last_name={lecturer.last_name}
                claim={lecturer.claim}
                location={lecturer.location}
                middle_name={lecturer.middle_name}
                picture_url={lecturer.picture_url}
                price_per_hour={lecturer.price_per_hour}
                tags={lecturer.tags}
                title_after={lecturer.title_after}
                title_before={lecturer.title_before}
              />
            );
          }
        )
      )}
    </section>
  );
}
