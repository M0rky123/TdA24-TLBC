"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { lalezar, openSans } from "@/app/data/fonts";
import { texts } from "@/app/data/whyUsData";
import style from "@/app/styles/WhyUsCards.module.css";
import ideas from "@/app/images/ideas.jpg";
import resumes from "@/app/images/resumes.jpg";
import goals from "@/app/images/goals.jpg";
import exercises from "@/app/images/exercises.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

export default function WhyUsCards() {
  const images = [ideas, resumes, goals, exercises];
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState(ideas);
  const [header, setHeader] = useState<string>("Pomáháme tvořit z nápadů skutečnost!");
  const [paragraph, setParagraph] = useState<string>(
    "Nabízíme inspiraci a podporu pro každý kreativní počin. S našimi zdroji a know-how můžete přetvořit své myšlenky na skutečnost a posunout svou tvůrčí vizi ještě dál."
  );

  useEffect(() => {
    const updateContent = () => {
      setImage(images[index]);
      setHeader(texts[index][0]);
      setParagraph(texts[index][1]);
    };
    updateContent();
  }, [index]);

  return (
    <section className={style.container}>
      <h2 className={style.header + " " + lalezar}>Jsme jedni z nejlepších na trhu! Jakto?</h2>
      <div className={style.cards}>
        <div className={style.card}>
          <Image src={image} alt="obrázek" width={300} height={300} />
          <div className={style.content}>
            <div className={style.text}>
              <h3 className={openSans}>{header}</h3>
              <br />
              <p className={openSans}>{paragraph}</p>
            </div>
            <div className={style.btns}>
              <button className={style.btn} onClick={() => setIndex((p) => (p - 1 + 4) % 4)}>
                <FontAwesomeIcon icon={faArrowLeftLong} size="3x" />
              </button>
              <button className={style.btn} onClick={() => setIndex((p) => (p + 1) % 4)}>
                <FontAwesomeIcon icon={faArrowRightLong} size="3x" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
