"use client";

import ReserveContact from "./ReserveContact";
import ReserveDate from "./ReserveDate";
import ReservePlace from "./ReservePlace";
import ReserveRecap from "./ReserveRecap";

export default function ReserveItem({ page }: { page: number }) {
  const items = [ReserveContact(), ReservePlace(), ReserveDate(), ReserveRecap()];

  return <>{items[page]}</>;
}
