import { useState } from "react";
import Calendar from "react-calendar";
import "../styles/Calendar.css";
import { openSans } from "../data/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function CalendarComponent() {
  const [date, setDate] = useState<Date | null>(new Date());
  const times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const timesArray: string[] = times.map((time) => {
    return `${time.toString().padStart(2, "0")}:00 - ${(time + 1).toString().padStart(2, "0")}:00 `;
  });

  return (
    <div className={"container " + openSans}>
      <div className="calendar">
        <Calendar
          onClickDay={(value) => setDate(value as Date)}
          value={date}
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
        {timesArray.map((time, index) => (
          <li key={index} className="item">
            <button
              className="item_button"
              onClick={() => {
                console.log(time);
              }}
            >
              {time}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
