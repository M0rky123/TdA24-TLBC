import style from "../../styles/reserve/ReserveContact.module.css";

export default function ReserveContact({ fName, setFName }: { fName: string; setFName: (value: string) => void }) {
  return (
    <form className={style.form}>
      <div className={style.fullName}>
        <div className={style.field}>
          <label htmlFor="fName">Jméno</label>
          <input
            type="text"
            name="fName"
            id="fName"
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFName(event.target.value);
              console.log(fName);
            }}
            value={fName}
            className={style.input}
            autoComplete="on"
          />
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
    </form>
  );
}
