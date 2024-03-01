import { useRouter, usePathname } from "next/navigation";

export default function ProfileNav() {
  const route = useRouter();
  const pathname = usePathname() === "/profile/reservations";

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
          {pathname && (
            <ul className="profile-tabbed-list">
              <li>Sublist Item 1</li>
              <li>Sublist Item 2</li>
              <li>Sublist Item 3</li>
            </ul>
          )}
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
