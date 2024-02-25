import { Dayjs } from "dayjs";

export default function ReserveRecap({ recap }: { recap: (string | Dayjs | null)[] }) {
  return (
    <ul>
      {recap.map((item, index) => (
        <li key={index}>{String(item)}</li>
      ))}
    </ul>
  );
}
