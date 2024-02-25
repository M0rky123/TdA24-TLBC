import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import "dayjs/locale/cs";
import { useState } from "react";
import style from "../../styles/reserve/ReserveDate.module.css";

export default function ReserveDate({
  date,
  setDate,
  time,
  setTime,
}: {
  date: Dayjs | null;
  setDate: (date: Dayjs | null) => void;
  time: string;
  setTime: (time: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const hours = Array.from({ length: 20 - 8 }, (_, i) => {
    const start = i + 8;
    const end = i + 9;
    return `${start.toString().padStart(2, "0")}:00 - ${end.toString().padStart(2, "0")}:00`;
  });

  return (
    <div className={style.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
        <DateCalendar
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            setLoading(true);
            setTimeout(() => setLoading(false), 500);
          }}
          disablePast
          disabled={loading}
        />
      </LocalizationProvider>
      {date !== null && (
        <ul className={style.list}>
          {hours.map((hour) => (
            <li key={hour} className={style.item} onClick={() => setTime(hour.toString())}>
              {hour}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
