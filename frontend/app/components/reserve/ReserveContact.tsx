import style from "../../styles/reserve/ReserveContact.module.css";

export default function ReserveContact({
  fName,
  setFName,
  lName,
  setLName,
  email,
  setEmail,
  tel,
  setTel,
  text,
  setText,
}: {
  fName: string;
  setFName: (name: string) => void;
  lName: string;
  setLName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  tel: string;
  setTel: (tel: string) => void;
  text: string;
  setText: (text: string) => void;
}) {
  return (
    <form className={style.form}>
      <div className={style.fullName}>
        <div className={style.field}>
          <label htmlFor="fName">Jméno</label>
          <input
            type="text"
            name="fName"
            id="fName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFName(e.target.value);
            }}
            value={fName}
            className={style.input}
            autoComplete="on"
          />
        </div>
        <div className={style.field}>
          <label htmlFor="lName">Příjmení</label>
          <input
            type="text"
            name="lName"
            id="lName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLName(e.target.value)}
            value={lName}
            className={style.input}
            autoComplete="on"
          />
        </div>
      </div>
      <div className={style.field}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          value={email}
          className={style.input}
          autoComplete="on"
        />
      </div>
      <div className={style.field}>
        <label htmlFor="tel">Telefonní číslo</label>
        <input
          type="tel"
          name="tel"
          id="tel"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTel(e.target.value);
          }}
          value={tel}
          className={style.input}
          autoComplete="on"
        />
      </div>
      <div className={style.field}>
        <label htmlFor="text">Zpráva</label>
        <textarea
          name="text"
          id="text"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          value={text}
          className={style.input}
          rows={5}
        ></textarea>
      </div>
    </form>
  );
}
