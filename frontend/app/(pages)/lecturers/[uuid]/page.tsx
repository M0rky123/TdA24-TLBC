import Image from "next/image";
import style from "./page.module.css";
import { fetchLecturer } from "@/app/utils/fetch";
import Button from "@/app/components/Button";

export default async function page({ params: { uuid } }: { params: { uuid: string } }) {
  const lecturer = await fetchLecturer(uuid);
  console.log(lecturer);

  return (
    <>
      <div className={style.header}>
        <Image src={lecturer.pricture_url} alt="foto lektora" />
        <h2>{lecturer.title_before + " " + lecturer.first_name + " " + lecturer.middle_name + " " + lecturer.last_name + " " + lecturer.title_after}</h2>
        <h3>{lecturer.claim}</h3>
        <p>{lecturer.bio}</p>
      </div>
      <div className={style.info}>
        <Button text="Rezervovat" url={"/reservation/" + uuid} />
        <div>
          <span>{lecturer.location}</span>
          <span>{lecturer.price_per_hour}</span>
        </div>
        <div className={style.list}>
          <span></span>
          <ul>
            {lecturer.contact.telephone_numbers.map((phone: string) => (
              <li>{phone}</li>
            ))}
          </ul>
        </div>
        <div className={style.list}>
          <span></span>
          <ul>
            {lecturer.contact.emails.map((email: string) => (
              <li>{email}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={style.tags}>
        <ul>
          <li>TAG IKONA</li>
          {lecturer.tags.map((tag: string) => (
            <li>{tag.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
