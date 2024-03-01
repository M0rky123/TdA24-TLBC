"use client";

import ProfileNav from "@/app/components/ProfileNav";
import "../profile.css";
import { useEffect, useState } from "react";
import { fetchReservations } from "@/app/utils/fetch";

export default function Reservations() {
  

  const [reservations, setReservations] = useState<any>([]);

  useEffect(() => {
    const auth_uuid = sessionStorage.getItem("lector_id")!;

    fetchReservations(auth_uuid).then((res) => console.log(res));
    fetchReservations(auth_uuid).then((res) => {
      setReservations(res);
      console.log(res);
    });
  }, []);


  return (
    <div className="profile-page">
      <ProfileNav />
    </div>
  );
}
