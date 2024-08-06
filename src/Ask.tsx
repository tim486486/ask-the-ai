import React from 'react'
import { useState } from "react";

const Ask = () => {
  const [question, setQuestion] = useState('');
  const [isPending, setIsPending] = useState(false)
  const [answer, setAnswer] = useState<any | null>(null); // New state for storing response
  const [error, setError] = useState<string | null>(null); // State for error handling

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    try {
      const ques = {question};
      const res = await fetch('http://localhost:3001/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },        
        body: JSON.stringify(ques) // Send question in the body
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await res.json(); // Assuming the response is in JSON format
      setAnswer(result.answer); // Store response in state    
      setIsPending(false);
    } catch (err: any) {
      setIsPending(false);
      setError(err.message);
    }
  };

  return (
    <div className="ask">
      <h2>Ask Me Anything</h2>
      <form onSubmit={handleSubmit}>
        <label>Question</label>
        <input
          type="text"
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)          
          }
        />
        { !isPending && <button>Submit</button>}
        { isPending && <button disabled>AI Is Thinking...</button>}
      </form>
      {error && <p>Error: {error}</p>}
      {answer && (
        <div>
          <h3>Response:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}

export default Ask;