import style from "./page.module.css"

export default async function page({ params: { uuid } }: { params: { uuid: string } }) {
  return (
    <div className={style.container}>
      <h2 className={style.h2}></h2>
    </div>
  );
}
