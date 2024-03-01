"use client";

import ProfileNav from "@/app/components/ProfileNav";
import "../profile.css";
import { useEffect, useState } from "react";
import { fetchReservations, putReservation } from "@/app/utils/fetch";

export default function Reservations() {
  const auth_uuid = sessionStorage.getItem("lector_id")!;
  const auth_key = sessionStorage.getItem("auth_key")!;

  type Reservation = {
    accepted: boolean;
    client_email: string;
    client_name: string;
    client_phone: string;
    date: string;
    lecturer_id: string;
    note: string;
    online: number;
    place: string;
    reservation_id: string;
    responded: number;
    time_index: number;
  };

  type ReservationStatus = {
    unread: Reservation[];
    accepted: Reservation[];
    declined: Reservation[];
  };

  const [reservations, setReservations] = useState<ReservationStatus>();

  const allReservations = reservations ? [...reservations.unread, ...reservations.accepted, ...reservations.declined] : [];

  useEffect(() => {
    const auth_uuid = sessionStorage.getItem("lector_id")!;

    fetchReservations(auth_uuid).then((res) => console.log(res));
    fetchReservations(auth_uuid).then((res) => {
      setReservations(res);
      console.log(res);
    });
  }, []);

  useEffect(() => {
    console.log(typeof reservations);
  }, [reservations]);

  return (
    <div className="profile-page">
      <ProfileNav />
      {reservations && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {allReservations.map((res, i) => (
            <div key={i} style={{ background: "var(--white)", boxShadow: "var(--shadow)", padding: "1rem" }}>
              <p>Jméno: {res.client_name}</p>
              <p>
                Telefonní číslo: <a href={`tel:${res.client_phone}`}>{res.client_phone.replace(/(\d{3})(\d{3})(\d{3})/, "+420 $1 $2 $3")}</a>
              </p>
              <p>
                E-mail: <a href={`mailto:${res.client_email}`}>{res.client_email}</a>
              </p>
              <p>Datum: {res.date}</p>
              <p>Druh schůzky: {res.online ? "Online" : "Osobně"}</p>
              <p>Místo schůzky: {res.place ?? "Neuvedeno"}</p>
              <p>Zpráva: {res.note}</p>
              {res.responded === 0 ? (
                <>
                  <button
                    onClick={() => {
                      putReservation(res.reservation_id, true, auth_uuid, auth_key);
                    }}
                  >
                    Přijmout
                  </button>
                  <button onClick={() => putReservation(res.reservation_id, false, auth_uuid, auth_key)}>Odmítnout</button>
                </>
              ) : res.accepted ? (
                <p>Stav: Přijato</p>
              ) : (
                <p>Stav: Odmítnuto</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
