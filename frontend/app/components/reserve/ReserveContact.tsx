import style from "../../styles/reserve/ReserveContact.module.css";
import React, { ChangeEvent } from "react";

interface Props {
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
}

const [nameRegex, emailRegex, telRegex] = [
  /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/,
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  /^(?:\+?420)?(?:\s?\d{3}){3}$/,
];

const ReserveContact: React.FC<Props> = ({ fName, setFName, lName, setLName, email, setEmail, tel, setTel, text, setText }) => {
  const handleChange = (type: string, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (type === "fName") {
      const inputText = e.target.value;
      setFName(inputText);
    }
    if (type === "lName") {
      const inputText = e.target.value;
      setLName(inputText);
    }
    if (type === "email") {
      const inputText = e.target.value;
      setEmail(inputText);
      emailRegex.test(inputText) || e.target.value == "" ? (e.currentTarget.style.outline = "none") : (e.currentTarget.style.outline = "2px solid #ff0000cc");
    }
    if (type === "tel") {
      const inputText = e.target.value;
      setTel(inputText);
      telRegex.test(inputText) || e.target.value == "" ? (e.currentTarget.style.outline = "none") : (e.currentTarget.style.outline = "2px solid #ff0000cc");
    }
    if (type === "text") {
    }
  };

  const onBlur = (type: string, e: ChangeEvent<HTMLInputElement>) => {
    const regex = type === "name" ? nameRegex : type === "email" ? emailRegex : telRegex;
    const inputValue = e.target.value;
    regex.test(inputValue) || e.target.value == "" ? (e.currentTarget.style.outline = "none") : (e.currentTarget.style.outline = "2px solid #ff0000cc");
  };

  // Funkce pro únik speciálních znaků HTML
  function escapeHtml(unsafe: string) {
    return unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return (
    <form className={style.form}>
      <div className={style.fullName}>
        <div className={style.field}>
          <label htmlFor="fName">
            Jméno <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="fName"
            id="fName"
            onChange={(e) => handleChange("fName", e)}
            onBlur={(e) => onBlur("name", e)}
            value={fName}
            className={style.input}
            autoComplete="given-name"
          />
        </div>
        <div className={style.field}>
          <label htmlFor="lName">
            Příjmení <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="lName"
            id="lName"
            onChange={(e) => handleChange("lName", e)}
            onBlur={(e) => onBlur("name", e)}
            value={lName}
            className={style.input}
            autoComplete="family-name"
          />
        </div>
      </div>
      <div className={style.field}>
        <label htmlFor="email">
          E-mail <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => handleChange("email", e)}
          onBlur={(e) => onBlur("email", e)}
          value={email}
          className={style.input}
          autoComplete="email"
        />
      </div>
      <div className={style.field}>
        <label htmlFor="tel">
          Telefonní číslo <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="tel"
          id="tel"
          onChange={(e) => handleChange("tel", e)}
          onBlur={(e) => onBlur("tel", e)}
          value={tel}
          className={style.input}
          autoComplete="tel"
        />
      </div>
      <div className={style.field}>
        <label htmlFor="text">Zpráva</label>
        <textarea name="text" id="text" onChange={(e) => handleChange("text", e)} value={text} className={style.input} rows={5}></textarea>
      </div>
    </form>
  );
};

export default ReserveContact;
