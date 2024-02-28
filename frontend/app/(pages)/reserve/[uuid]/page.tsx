import { lalezar, openSans } from "@/app/data/fonts";
import style from "./page.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faMapPin, faSackDollar, faSquarePhone, faUser } from "@fortawesome/free-solid-svg-icons";
import Reserve from "@/app/components/reserve/Reserve";
import { fetchLecturer } from "@/app/utils/fetch";

export default async function page({ params: { uuid } }: { params: { uuid: string } }) {
  const lecturer = await fetchLecturer(uuid);

  for (let key in lecturer) {
    if (lecturer[key] === null) {
      lecturer[key] = "";
    }
  }

  return (
    <>
      <div className={style.container + " " + openSans}>
        <section className={style.lecturer}>
          <h2 className={style.h2 + " " + lalezar}>Rezervace</h2>
          <Image src="https://picsum.photos/300" alt="foto lektora" width={300} height={300} className={style.image} priority />
          <div className={style.info}>
            <span className={style.span}>
              <FontAwesomeIcon icon={faUser} className={style.icon} />
              {lecturer.title_before + " " + lecturer.first_name + " " + lecturer.middle_name + " " + lecturer.last_name + " " + lecturer.title_after}
            </span>
            <span className={style.span}>
              <FontAwesomeIcon icon={faMapPin} className={style.icon} /> {lecturer.location}
            </span>
            <span className={style.span}>
              <FontAwesomeIcon icon={faSackDollar} className={style.icon} /> {lecturer.price_per_hour} Kč/hod
            </span>
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
        </section>
        <Reserve />
      </div>
    </>
  );
}
