import style from "@/app/styles/Cards.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMapPin, faTag } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { openSans } from "../data/fonts";

export default function () {
  return (
    <div className={style.card + " " + openSans}>
      <div className={style.content}>
        <Image
          src="https://tourdeapp.cz/storage/images/2023_02_25/412ff296a291f021bbb6de10e8d0b94863fa89308843b/big.png.webp"
          alt="foto lektora"
          width={300}
          height={300}
          className={style.image}
          priority
        />
        <div className={style.headers}>
          <h3 className={style.h3}>Mgr. Petra Swill Plachá MBA</h3>
          <span>Aktivní studentka / Předsedkyně spolku / Projektová manažerka</span>
        </div>
        <div className={style.info}>
          <div>
            <span>
              <FontAwesomeIcon icon={faMapPin} size="1x" className={style.icon} color="var(--dark)" width={16} height={16} />
              &nbsp;Brno
            </span>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faCoins} size="1x" className={style.icon} color="var(--dark)" width={16} height={16} />
              &nbsp;1200 Kč/h
            </span>
          </div>
          <div className={style.tags_container}>
            <span>
              <FontAwesomeIcon icon={faTag} size="1x" className={style.icon} color="var(--dark)" width={16} height={16} />
            </span>
            &nbsp;
            <ul className={style.tags}>
              <li className={style.tag}>Angličtina</li>
              <li className={style.tag}>Čeština</li>
              <li className={style.tag}>Matematika</li>
              <li className={style.tag}>Chemie</li>
              <li className={style.tag}>Fyzika</li>
              <li className={style.tag}>Biologie</li>
              <li className={style.tag}>Dejepis</li>
              <li className={style.tag}>Zeměpis</li>
              <li className={style.tag}>Společenské vědy</li>
              <li className={style.tag}>Ekonomie</li>
            </ul>
          </div>
        </div>
        <div className={style.buttons}>
          <Button text="Více podrobností" url="#" active />
        </div>
      </div>
    </div>
  );
}
