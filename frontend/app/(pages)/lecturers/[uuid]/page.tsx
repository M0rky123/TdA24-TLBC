import Image from "next/image";
import style from "./page.module.css";
import { fetchLecturer } from "@/app/utils/fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/app/components/Button";
import { lalezar, openSans } from "@/app/data/fonts";
import { faAt, faCoins, faMapPin, faSquarePhone, faTag } from "@fortawesome/free-solid-svg-icons";

export default async function page({ params: { uuid } }: { params: { uuid: string } }) {
  const lecturer = await fetchLecturer(uuid);

  for (let key in lecturer) {
    if (lecturer[key] === null) {
      lecturer[key] = "";
    }
  }

  return (
    <div className={style.container + " " + openSans}>
      <div className={style.image}>
        <Image
          src={lecturer.picture_url ? lecturer.picture_url : "https://picsum.photos/300"}
          alt="foto lektora"
          width={300}
          height={300}
          style={{ borderRadius: "1rem" }}
        />
        <div style={{ width: "300px", display: "flex", alignItems: "center" }}>
          <Button text="Rezervovat" url={"/reserve/" + uuid} width="100%" active />
        </div>
      </div>
      <div className={style.text}>
        <h2 className={lalezar + " " + style.h2}>
          {lecturer.title_before + " " + lecturer.first_name + " " + lecturer.middle_name + " " + lecturer.last_name + " " + lecturer.title_after}
        </h2>
        <h3 className={style.h3}>{lecturer.claim}</h3>
        <p>{lecturer.bio}</p>
        <div className={style.info}>
          <div className={style.priceLoc}>
            <span className={style.span}>
              <FontAwesomeIcon icon={faMapPin} className={style.icon} /> &nbsp;
              {lecturer.location}
            </span>
            <span className={style.span}>
              <FontAwesomeIcon icon={faCoins} className={style.icon} /> &nbsp;
              {lecturer.price_per_hour} Kč/hod
            </span>
          </div>
          <div className={style.listContainer}>
            <span>
              <FontAwesomeIcon icon={faSquarePhone} className={style.icon} />
            </span>
            <ul className={style.list}>
              {lecturer.contact.telephone_numbers?.map((phone: string, index: number) => (
                <li key={index}>{phone}</li>
              ))}
            </ul>
          </div>
          <div className={style.listContainer}>
            <span>
              <FontAwesomeIcon icon={faAt} className={style.icon} />
            </span>
            <ul className={style.list}>
              {lecturer.contact.emails?.map((email: string, index: number) => (
                <li key={index}>{email}</li>
              ))}
            </ul>
          </div>
        </div>
        <ul className={style.tags}>
          <li>
            <FontAwesomeIcon icon={faTag} className={style.icon} />
          </li>
          {lecturer.tags?.map((tag: { name: string; uuid: string }, index: number) => (
            <li key={index} className={style.tag}>
              {tag?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
