function Footer() {
    return (
      <footer style={styles.footer}>
        <p style={styles.text}>
          © Stacia Wilson / Project Qrio 2023. 
          If you have any questions, feedback, ideas, or problems with the site, 
          please <a href="mailto:projectqrio@gmail.com" style={styles.link}>email me</a>.
        </p>
        <p style={styles.text}><a href="https://www.flaticon.com/free-icons/evidence" title="evidence icons" style={styles.link}>Evidence icons created by Freepik - Flaticon</a>&nbsp;|&nbsp;
        <a href="https://www.flaticon.com/free-icons/forum" title="forum icons" style={styles.link}>Forum icons created by apien - Flaticon</a></p>
      </footer>
    );
  }
  
  const styles = {
    footer: {
      width: '100%',
      padding: '20px 0',
      borderTop: '1px solid #ddd',
      textAlign: 'center',
      marginTop: '50px'
    },
    text: {
      fontSize: '14px',
      color: '#777'
    },
    link: {
      color: '#337ab7',
      textDecoration: 'none'
    }
  }
  
  export default Footer;
  