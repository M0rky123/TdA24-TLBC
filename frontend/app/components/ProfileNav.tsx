import { useRouter } from "next/navigation";

export default function ProfileNav() {
  const route = useRouter();

  return (
    <nav className="profile-nav">
      <ul className="profile-list">
        <li onClick={() => route.push("/profile")}>Profil</li>
        <li
          onClick={() => {
            route.push("/profile/reservations");
          }}
        >
          Rezervace
        </li>
        <li
          style={{ cursor: "pointer" }}
          onClick={() => {
            sessionStorage.clear();
            route.push("/login");
          }}
        >
          Odhlásit se
        </li>
      </ul>
    </nav>
  );
}
