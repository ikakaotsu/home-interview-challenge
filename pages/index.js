import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Index() {
  return (
    <ul>
      <li>
        <Link href="/login" as="/login">
          <a>login</a>
        </Link>
      </li>
      <li>
        <Link href="/register" as="/register">
          <a>register</a>
        </Link>
      </li>
      <li>
        <Link href="/noexiste" as="/noexiste">
          <a>noExiste</a>
        </Link>
      </li>
    </ul>
  );
}
