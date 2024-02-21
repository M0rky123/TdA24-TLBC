import style from "@/app/styles/Cards.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMapPin, faTag } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { openSans } from "../data/fonts";

interface CardProps {
  uuid?: string;
  title_before?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  title_after?: string;
  picture_url?: string;
  location?: string;
  claim?: string;
  tags?: string[];
  price_per_hour?: number;
}

export default function Card({
  uuid = "",
  title_before = "",
  first_name = "Jméno",
  middle_name = "",
  last_name = "Příjmení",
  title_after = "",
  picture_url = "https://picsum.photos/300",
  location = "",
  claim = "",
  tags = [],
  price_per_hour = 0,
}: CardProps) {
  return (
    <div className={style.card + " " + openSans}>
      <div className={style.content}>
        <Image src={picture_url} alt="foto lektora" width={300} height={300} className={style.image} priority />
        <div className={style.headers}>
          <h3 className={style.h3}>{title_before + " " + first_name + " " + middle_name + " " + last_name + " " + title_after}</h3>
          <span>{claim}</span>
        </div>
        <div className={style.info}>
          <div>
            <span>
              <FontAwesomeIcon icon={faMapPin} size="1x" className={style.icon} color="var(--dark)" width={16} height={16} />
              &nbsp;{location ? location : "Lokalita nebyla uvedena"}
            </span>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faCoins} size="1x" className={style.icon} color="var(--dark)" width={16} height={16} />
              &nbsp;{price_per_hour ? price_per_hour : "Cena nebyla uvedena"} Kč/hod
            </span>
          </div>
          <div className={style.tags_container}>
            <span>
              <FontAwesomeIcon icon={faTag} size="1x" className={style.icon} color="var(--dark)" width={16} height={16} />
            </span>
            &nbsp;
            <ul className={style.tags}>
              {tags
                ? tags.map((tag, index) => (
                    <li key={index} className={style.tag}>
                      {tag}
                    </li>
                  ))
                : "Tagy nebyly uvedeny."}
            </ul>
          </div>
        </div>
        <div className={style.buttons}>
          <Button text="Více podrobností" url={"/lecturers/" + uuid} active />
        </div>
      </div>
    </div>
  );
}
