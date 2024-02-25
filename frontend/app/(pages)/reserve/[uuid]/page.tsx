import { lalezar, openSans } from "@/app/data/fonts";
import style from "./page.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faMapPin, faSackDollar, faSquarePhone, faUser } from "@fortawesome/free-solid-svg-icons";
import Reserve from "@/app/components/reserve/Reserve";

export default async function page({ params: { uuid } }: { params: { uuid: string } }) {
  return (
    <>
      <h2 className={style.h2 + " " + lalezar}>Rezervace</h2>
      <div className={style.container + " " + openSans}>
        <section className={style.lecturer}>
          <Image src="https://picsum.photos/300" alt="foto lektora" width={300} height={300} className={style.image} />
          <div className={style.info}>
            <span className={style.span}>
              <FontAwesomeIcon icon={faUser} className={style.icon} /> Mgr. Petra Swil Plachá MBA
            </span>
            <span className={style.span}>
              <FontAwesomeIcon icon={faMapPin} className={style.icon} /> Brno
            </span>
            <span className={style.span}>
              <FontAwesomeIcon icon={faSackDollar} className={style.icon} /> 1200 Kč/hod
            </span>
            <div className={style.listContainer}>
              <span>
                <FontAwesomeIcon icon={faSquarePhone} className={style.icon} />
              </span>
              <ul className={style.list}>
                <li>+420 123 456 789</li>
                <li>+420 123 456 789</li>
                <li>+420 123 456 789</li>
              </ul>
            </div>
            <div className={style.listContainer}>
              <span>
                <FontAwesomeIcon icon={faAt} className={style.icon} />
              </span>
              <ul className={style.list}>
                <li>petraswill@tourdeapp.cz</li>
                <li>petraswill@tourdeapp.cz</li>
                <li>petraswill@tourdeapp.cz</li>
              </ul>
            </div>
          </div>
        </section>
        <Reserve />
      </div>
    </>
  );
}
