"use client";

import { useEffect, useState } from "react";
import "./profile.css";
import { fetchLecturer } from "@/app/utils/fetch";
import ProfileNav from "@/app/components/ProfileNav";

export default function Profile() {
  const [lecturer, setLecturer] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    
    async function lec() {
      const auth_key = sessionStorage.getItem("auth_key")!;
      const auth_uuid = sessionStorage.getItem("lector_id")!;
      await fetchLecturer(auth_uuid).then((res) => setLecturer(res));
      setLoaded(true);
    }
    lec();
  }, []);

  return (
    <div className="profile-page">
      <ProfileNav />
      {loaded ? (
        <table>
          <tr>
            <th>Jmémo</th>
            <td>{lecturer.first_name}</td>
          </tr>
          <tr>
            <th>Prostřední jméno</th>
            <td>{lecturer.middle_name}</td>
          </tr>
          <tr>
            <th>Příjmení</th>
            <td>{lecturer.last_name}</td>
          </tr>
          <tr>
            <th>Titul před jménem</th>
            <td>{lecturer.title_before}</td>
          </tr>
          <tr>
            <th>Titul po jménu</th>
            <td>{lecturer.title_after}</td>
          </tr>
          <tr>
            <th>Lokalika</th>
            <td>{lecturer.location}</td>
          </tr>
          <tr>
            <th>Claim</th>
            <td>{lecturer.claim}</td>
          </tr>
          <tr>
            <th>Bio</th>
            <td>{lecturer.bio}</td>
          </tr>
          <tr>
            <th>Tagy</th>
            <td>
              <ul>
                {lecturer.tags.map((tag: { name: string }, i: number) => (
                  <li key={i}>{tag.name}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <th>Cena za hodinu</th>
            <td>{lecturer.price_per_hour}</td>
          </tr>
          <tr>
            <th>Telefonní čísla</th>
            <td>
              <ul>
                {lecturer.contact.telephone_numbers.map((tel: string, i: number) => (
                  <li key={i}>{tel}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <th>E-maily</th>
            <td>
              <ul>
                {lecturer.contact.emails.map((mail: string, i: number) => (
                  <li key={i}>{mail}</li>
                ))}
              </ul>
            </td>
          </tr>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
