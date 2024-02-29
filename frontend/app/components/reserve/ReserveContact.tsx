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

const ReserveContact: React.FC<Props> = ({ fName, setFName, lName, setLName, email, setEmail, tel, setTel, text, setText }) => {
  const handleFNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const nameRegex = /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/;
    setFName(inputValue);
    nameRegex.test(inputValue) ? (e.currentTarget.style.background = "#00FF0080") : (e.currentTarget.style.background = "#ff000080");
  };

  const handleLNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const nameRegex = /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/;
    setLName(inputValue);
    nameRegex.test(inputValue) ? (e.currentTarget.style.background = "#00FF0080") : (e.currentTarget.style.background = "#ff000080");
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(inputValue);
    emailRegex.test(inputValue) ? (e.currentTarget.style.background = "#00FF0080") : (e.currentTarget.style.background = "#ff000080");
  };

  const handleTelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const czechPhoneNumberRegex = /^(?:\+?420)?(?:\s?\d{3}){3}$/;
    setTel(inputValue);
    czechPhoneNumberRegex.test(inputValue) ? (e.currentTarget.style.background = "#00FF0080") : (e.currentTarget.style.background = "#ff000080");
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    const safeText = escapeHtml(inputText);
    setText(safeText);
  };

  // Funkce pro únik speciálních znaků HTML
  function escapeHtml(unsafe: string) {
    return unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return (
    <form className={style.form}>
      <div className={style.fullName}>
        <div className={style.field}>
          <label htmlFor="fName">Jméno</label>
          <input type="text" name="fName" id="fName" onChange={handleFNameChange} value={fName} className={style.input} autoComplete="given-name" />
        </div>
        <div className={style.field}>
          <label htmlFor="lName">Příjmení</label>
          <input type="text" name="lName" id="lName" onChange={handleLNameChange} value={lName} className={style.input} autoComplete="family-name" />
        </div>
      </div>
      <div className={style.field}>
        <label htmlFor="email">E-mail</label>
        <input type="email" name="email" id="email" onChange={handleEmailChange} value={email} className={style.input} autoComplete="email" />
      </div>
      <div className={style.field}>
        <label htmlFor="tel">Telefonní číslo</label>
        <input type="text" name="tel" id="tel" onChange={handleTelChange} onBlur={() => {}} value={tel} className={style.input} autoComplete="tel" />
      </div>
      <div className={style.field}>
        <label htmlFor="text">Zpráva</label>
        <textarea name="text" id="text" onChange={handleTextChange} value={text} className={style.input} rows={5}></textarea>
      </div>
    </form>
  );
};

export default ReserveContact;
