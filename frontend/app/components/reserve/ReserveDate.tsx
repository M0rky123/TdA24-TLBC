import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/cs";
import { useState } from "react";
import Calendar from "react-calendar";
import "../../styles/Calendar.css";
import { openSans } from "../../data/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
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
  time: number | undefined;
  setTime: (time: number | undefined) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [reserved, setReserved] = useState<number[]>([]);

  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  async function handleClick(newDate: any) {
    setDate(newDate);
    setLoading(true);
    const res = await fetchReservationGet(uuid, dayjs(newDate).format("DD.MM.YYYY"));
    console.log(res);
    res[1] === 200 && setReserved(res[0]);
    setLoading(false);
  }

  return (
    <div className={"container " + openSans}>
      <div className="calendar">
        <Calendar
          onClickDay={(date) => handleClick(date)}
          value={date?.toString()}
          formatDay={(_, date) => date.getDate().toString()}
          calendarType="iso8601"
          locale="cs-cz"
          minDate={new Date()}
          minDetail="month"
          maxDetail="month"
          nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
          prevLabel={<FontAwesomeIcon icon={faChevronLeft} />}
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
          // tileClassName={}
          tileContent={<span className="span">12</span>}
          // tileDisabled={({ activeStartDate, date, view }) => date.getDay() === 2}
        />
      </div>
      <ul className="list">
        {hours.map((hour, index) => (
          <li key={index} className="item">
            <button className="item_button" onClick={() => setTime(hour)}>{`${hour.toString().padStart(2, "0")}:00 - ${(hour + 1)
              .toString()
              .padStart(2, "0")}:00 `}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
