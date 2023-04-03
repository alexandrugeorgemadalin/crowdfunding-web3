import styles from "./header.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <nav type="nav" className={styles.nav}>
        <div>
          <div>
            <ul>
              <l1>
                <Link href="/"> Home</Link>
              </l1>
              <l1>
                <Link href="/create-campaign"> Create Campaign</Link>
              </l1>

              <l1>
                <Link href="/donate"> Donate</Link>
              </l1>
            </ul>
          </div>
        </div>

        <div type="title" className={styles.title}>
          <h2>Crowdfunding Web3</h2>
        </div>

        <div>
          <ConnectButton
            accountStatus={{ smallScreen: "address", largeScreen: "address" }}
            chainStatus="icon"
            showBalance={{ smallScreen: false, largeScreen: true }}
          />
        </div>
      </nav>
    </div>
  );
}
