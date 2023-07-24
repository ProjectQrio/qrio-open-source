import classes from './evidence-form.module.css'
import { useState } from 'react';

function EvidenceForm() {
  const [sourceLink, setSourceLink] = useState('');
  const [position, setPosition] = useState('');
  const [summary, setSummary] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Let's assume the user is stored in a state or prop
  const [user, setUser] = useState('John Doe'); 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!sourceLink || !position || !summary) {
      setErrorMessage('All fields are required.'); // Set error message
      return; // Stop form submission
    }

    if (summary.length < 50) {
      setErrorMessage('Summary must be at least 50 characters long.'); // Set error message
      return; // Stop form submission
    }

    // Here you would typically send the form data to your server
    console.log({ sourceLink, position, summary, user });

    setSourceLink('');
    setPosition('');
    setSummary('');

    setIsSubmitted(true);

    // Reset the isSubmitted state after three seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className={classes.contactFormContainer}>
      <form className={classes.contactForm} onSubmit={handleSubmit}>
      <h2 className={classes.formTitle}>Submit Evidence</h2> 
        <label>
          Source Link:
          <input type="url" value={sourceLink} onChange={e => setSourceLink(e.target.value)} required />
        </label>

        <label>
          Position:
          <select value={position} onChange={e => setPosition(e.target.value)} required>
            <option value="">Select...</option>
            <option value="for">For</option>
            <option value="against">Against</option>
          </select>
        </label>

        <label>
          Summary:
          <textarea value={summary} onChange={e => setSummary(e.target.value)} required />
        </label>

        {/* Hidden input that tracks which user submitted the form */}
        <input type="hidden" value={user} />

        <button type="submit">Submit</button>
      </form>

      {/* Display error message */}
      {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}

      {isSubmitted && <p className={classes.successMessage}>Form successfully submitted!</p>}
    </div>
  );
}

export default EvidenceForm;
