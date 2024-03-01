import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/cs";
import { useState } from "react";
import style from "../../styles/reserve/ReserveDate.module.css";
import { fetchReservationGet } from "@/app/utils/fetch";

export default function ReserveDate({
  uuid,
  date,
  setDate,
  time,
  setTime,
}: {
  uuid: string;
  date: Dayjs | null;
  setDate: (date: Dayjs | null) => void;
  time: Dayjs | null;
  setTime: (time: Dayjs | null) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [reserved, setReserved] = useState<number[]>([]);

  const hours = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
  ];

  async function handleClick(newDate: any) {
    setDate(newDate);
    setLoading(true);
    const array = await fetchReservationGet(uuid, dayjs(newDate).format("DD.MM.YYYY"));
    array[1] === 200 && setReserved(array[0]);

    setLoading(false);
  }

  return (
    <div className={style.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
        <DateCalendar
          value={date}
          onChange={(newDate) => {
            handleClick(newDate);
          }}
          disablePast
          disabled={loading}
        />
      </LocalizationProvider>
      {date !== null && (
        <ul className={style.list}>
          {hours.map((hour, index) => (
            <li
              key={hour}
              className={`${style.item} ${dayjs(time).hour() === parseInt(hour) ? style.activeItem : ""}`}
              onClick={() => {
                setTime(dayjs(hour, "HH:mm"));
              }}
            >
              {hour}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
