import classes from './evidence-form.module.css';
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

function EvidenceForm({ claimId, onEvidenceSubmit }) {
  const router = useRouter();
  const [sourceLink, setSourceLink] = useState('');
  const [position, setPosition] = useState('');
  const [summary, setSummary] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please create an account or log in to submit evidence.</p>;
  }

  // Rest of your code...

  const handleSubmit = async (e) => {
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

    const response = await fetch('/api/evidence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sourceLink, position, summary, userId: user.sub, claimId }),
    });

    if (!response.ok) {
      const responseData = await response.json();
      setErrorMessage(responseData.message || 'Something went wrong!'); // Set error message
      return;
    }

    setSourceLink('');
    setPosition('');
    setSummary('');

    setIsSubmitted(true);

    // Reset the isSubmitted state after three seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
    // Refetch the evidence after successful form submission
    onEvidenceSubmit();
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

        <button type="submit">Submit</button>
      </form>

      {/* Display error message */}
      {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}

      {isSubmitted && <p className={classes.successMessage}>Form successfully submitted!</p>}
    </div>
  );
}

export default EvidenceForm;
