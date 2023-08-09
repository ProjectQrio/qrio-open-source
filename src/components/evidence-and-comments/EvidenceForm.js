import classes from './evidence-form.module.css';
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import 'draft-js/dist/Draft.css'; // For default Draft.js styling
import { convertToRaw, EditorState, RichUtils, Editor, stateToPlainText } from 'draft-js';
import { useRef } from 'react';
import { stateToHTML } from 'draft-js-export-html';



function EvidenceForm({ claimId, onEvidenceSubmit }) {
  const router = useRouter();
  const editorRef = useRef();
  const [sourceLink, setSourceLink] = useState('');
  const [position, setPosition] = useState('');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user, error, isLoading } = useUser();

  const toggleBlockType = (blockType) => {
    const newState = RichUtils.toggleBlockType(editorState, blockType);
    setEditorState(newState);
    editorRef.current.focus();
  };
  

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };
  
  const onBoldClick = (e) => {
    e.preventDefault();
    const newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
    setEditorState(newState);
    // Focus the editor again
    editorRef.current.focus();
  };
  
  const onItalicClick = (e) => {
    e.preventDefault();
    const newState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
    setEditorState(newState);
    // Focus the editor again
    editorRef.current.focus();
  };
  
  
  
  // You can add more functions for other formatting as needed
  


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please create an account or log in to submit evidence.</p>;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert editorState to raw content and then to string
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const summary = editorState.getCurrentContent().getPlainText();
    const summaryHtml = stateToHTML(editorState.getCurrentContent());

    // Check if all fields are filled
    if (!sourceLink || !position || summary === JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))) {
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
      body: JSON.stringify({ sourceLink, position, summary: summaryHtml, userId: user.sub, claimId }),
    });
  
    if (!response.ok) {
      const responseData = await response.json();
      setErrorMessage(responseData.message || 'Something went wrong!'); // Set error message
      return;
    }
  
    setSourceLink('');
    setPosition('');
    setEditorState(EditorState.createEmpty()); // Reset editorState
  
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

        <label htmlFor="summary">Summary:</label>
<div className={classes.editorContainer}>
  <div className={classes.formatButtons}>
  <button type="button" className={classes.formatButton} onClick={() => toggleBlockType('header-one')}>H1</button>
  <button type="button" className={classes.formatButton} onClick={() => toggleBlockType('header-two')}>H2</button>
  <button type="button" className={classes.formatButton} onClick={() => toggleBlockType('header-three')}>H3</button>
    <button type="button" className={classes.formatButton} onClick={e => onBoldClick(e)}>Bold</button>
    <button type="button" className={classes.formatButton} onClick={e => onItalicClick(e)}>Italic</button>
  </div>
  <Editor
      ref={editorRef}
      editorState={editorState}
      onChange={setEditorState}
      handleKeyCommand={handleKeyCommand}
    />
</div>

        <button type="submit">Submit</button>
      </form>

      {/* Display error message */}
      {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}

      {isSubmitted && <p className={classes.successMessage}>Form successfully submitted!</p>}
    </div>
  );
}

export default EvidenceForm;
