import styles from './AddBounty.module.css';

export default function AddBounty() {
    return (
        <div>
            <a href="https://bit.ly/peer-review-science-bounty" target="_blank" rel="noopener noreferrer">
                <img className={styles.addBountyImage} src="AddToBounty-PeerReview.png" alt="Add Bounty" />
            </a>
        </div>
    );
}