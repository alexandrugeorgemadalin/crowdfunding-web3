import Link from "next/link";
import styles from "./home-page.module.css";

export default function HomePage() {
  return (
    <div type="commands" className={styles.commands}>
      <Link href="/create-campaign">
        <button type="button" className={styles.button}>
          Create campaign
        </button>
      </Link>
      <Link href="/donate">
        <button type="button" className={styles.button}>
          Donate
        </button>
      </Link>
    </div>
  );
}
