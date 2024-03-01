import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/cs";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../../styles/Calendar.css";
import { openSans } from "../../data/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { fetchFreeReservationHours, fetchReservationGet } from "@/app/utils/fetch";

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
  type Reservation = {
    date: number;
    count: number;
  };

  const [loading, setLoading] = useState(false);
  const [freeHours, setFreeHours] = useState<number[]>([]);
  const [freeReservations, setFreeReservations] = useState<Reservation[]>([]);

  const hoursArray = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const test = [200, []];

  async function handleClick(newDate: Date) {
    console.log(dayjs(newDate));
    setDate(dayjs(newDate));
    setLoading(true);
    await fetchReservationGet(uuid, dayjs(newDate).format("DD.MM.YYYY")).then((res) => {
      setFreeHours(res);
      console.log(res);
    });
    setLoading(false);
  }

  function fetchFreeRes(date: Dayjs | null) {
    fetchFreeReservationHours(uuid, date?.format("MM"), date?.format("YYYY")).then((res) => {
      if (res) {
        setFreeReservations(res);
      } else {
        setFreeReservations([]);
      }
    });
  }

  useEffect(() => {
    fetchFreeRes(date);
  }, []);

  useEffect(() => {
    console.log(freeHours);
  }, [freeHours]);

  // "/api/reserve/<lector_id>" pro casy

  return (
    <div className={"container " + openSans}>
      <div className="calendar">
        <Calendar
          onClickDay={(date) => handleClick(date)}
          onActiveStartDateChange={({ action, activeStartDate, value, view }) => fetchFreeRes(dayjs(activeStartDate))}
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
          tileContent={({ activeStartDate, date, view }) => (
            <span className="span">{freeReservations.find((reservation) => reservation.date === date.getDate())?.count ?? "12"}</span>
          )}
        />
      </div>
      <ul className="list">
        {freeHours.map((hour, index) => (
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
