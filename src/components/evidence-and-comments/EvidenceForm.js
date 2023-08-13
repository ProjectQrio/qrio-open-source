import classes from './evidence-form.module.css';
import { useState, useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import 'draft-js/dist/Draft.css';
import { convertToRaw, EditorState, Editor } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import sanitizeHtml from 'sanitize-html';

function EvidenceForm({ claimId, onEvidenceSubmit }) {
  const [sourceLink, setSourceLink] = useState('');
  const [position, setPosition] = useState('');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please create an account or log in to submit evidence.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blockToHTMLConfig = {
      unstyled: (elem) => {
        if (elem.text === '\n') {
          return <br />;
        }
        return <p>{elem.children}</p>;
      },
    };
    
    const summaryHtml = stateToHTML(editorState.getCurrentContent(), { blockToHTML: blockToHTMLConfig });
    const cleanHtml = sanitizeHtml(summaryHtml, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a'],
      allowedAttributes: {
        'a': ['href'],
      },
    });


    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const summary = editorState.getCurrentContent().getPlainText();
        
    if (!sourceLink || !position || summary === JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (summary.length < 50) {
      setErrorMessage('Summary must be at least 50 characters long.');
      return;
    }

    const response = await fetch('/api/evidence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sourceLink, position, summary: cleanHtml, userId: user.sub, claimId }),
    });

    if (!response.ok) {
      const responseData = await response.json();
      setErrorMessage(responseData.message || 'Something went wrong!');
      return;
    }

    setSourceLink('');
    setPosition('');
    setEditorState(EditorState.createEmpty());

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);

    onEvidenceSubmit();
  };

  function getBlockStyle(block) {
    switch (block.getType()) {
        case 'unstyled':
            return 'public-DraftStyleDefault-pre';
        default:
            return '';
    }
}


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

        <label htmlFor="summary">Summary:</label>
        <div className={classes.editorContainer}>
          <Editor
              editorState={editorState}
              onChange={setEditorState} 
              blockStyleFn={getBlockStyle}           />
        </div>

        <button type="submit">Submit</button>
      </form>

      {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}

      {isSubmitted && <p className={classes.successMessage}>Form successfully submitted!</p>}
    </div>
  );
}

export default EvidenceForm;
