import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/cs";

export default function ReserveDate() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
      <DateCalendar value={null} onChange={(value)=>{}} disablePast />
    </LocalizationProvider>
  );
}
