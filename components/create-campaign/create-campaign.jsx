import styles from "./create-campaign.module.css";

export default function CreateCampaignForm() {
  return (
    <div>
      <form
        class="form"
        className={styles.form}
        action="/api/create-campaign"
        method="post"
      >
        <p className={styles.heading}>Create new campaign</p>
        <input
          class={styles.input}
          placeholder="Campaign name"
          type="text"
          id="campaign-name"
          name="campaign-name"
          required
        />
        <input
          class={styles.input}
          placeholder="Campaign goal"
          type="text"
          id="campaign-goal"
          name="campaign-goal"
          required
        />
        <button class={styles.btn}>Submit</button>
      </form>
    </div>
  );
}
