import styles from './DemoVideo.module.css';

function DemoEmbed() {
  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoWrapper}>
        <iframe 
          src="https://www.loom.com/embed/742038f06f724ee1aeb2776b27be91bc?sid=a03762b8-6ced-4bb7-96e4-a2dc2b64d91d" 
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default DemoEmbed;