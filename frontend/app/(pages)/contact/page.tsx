import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./page.module.css";
import { lalezar, openSans } from "@/app/data/fonts";
import { faAt, faMapPin, faSquarePhone } from "@fortawesome/free-solid-svg-icons";

export default async function page() {
  return (
    <div>
      <h1 className={style.h1 + " " + lalezar}>Kontakt</h1>
      <div className={style.content + " " + openSans}>
        <section className={style.info}>
          <ul className={style.ul}>
            <li className={style.li}>
              <span className={style.span}>
                <FontAwesomeIcon icon={faSquarePhone} height={20} width={20} />
              </span>
              kontakt@teacherdigitalagency.cz
            </li>
            <li className={style.li}>
              <span className={style.span}>
                <FontAwesomeIcon icon={faAt} height={20} width={20} />
              </span>
              +420 736 661 774
            </li>
            <li className={style.li}>
              <span className={style.span}>
                <FontAwesomeIcon icon={faMapPin} height={20} width={20} />
              </span>
              Křenová 89/19, 602 00 Brno
            </li>
          </ul>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.451079556216!2d16.61849937830947!3d49.19200192284951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471294f9ab2ffb2b%3A0xac1b00a7c8488590!2zS8WZZW5vdsOhIDg5LzE5LCA2MDIgMDAgQnJuby1zdMWZZWQtVHJuaXTDoQ!5e0!3m2!1scs!2scz!4v1708692782075!5m2!1scs!2scz"
            width="400"
            height="400"
            style={{ border: "0", borderRadius: "4px", boxShadow: "0 0 3px #3339" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
        <section>
          <div className={style.formContainer}>
            <h2>Máte otázky? Napište nám!</h2>
            <form className={style.form}>
              <div className={style.fullName}>
                <div className={style.field}>
                  <label htmlFor="fName">Jméno</label>
                  <input type="text" name="fName" id="fName" className={style.input} autoComplete="on" />
                </div>
                <div className={style.field}>
                  <label htmlFor="lName">Příjmení</label>
                  <input type="text" name="lName" id="lName" className={style.input} autoComplete="on" />
                </div>
              </div>
              <div className={style.field}>
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" className={style.input} autoComplete="on" />
              </div>
              <div className={style.field}>
                <label htmlFor="tel">Telefonní číslo</label>
                <input type="tel" name="tel" id="tel" className={style.input} autoComplete="on" />
              </div>
              <div className={style.field}>
                <label htmlFor="text">Zpráva</label>
                <textarea name="text" id="text" className={style.input} rows={5}></textarea>
              </div>
              <button type="submit" className={style.button}>
                Odeslat
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
