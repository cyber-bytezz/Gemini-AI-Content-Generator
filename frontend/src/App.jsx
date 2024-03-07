import axios from 'axios';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import "./App.css";

const makeRequestAPI = async (prompt) => {
  const res = await axios.post('http://localhost:8080/generate', { prompt });
  return res.data;
};

function App() {
  const [prompt, setPrompt] = useState("");
  const mutation = useMutation({
    mutationFn: makeRequestAPI,
    mutationKey: ['gemini-ai-request']
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(prompt);
  };

  return (
    <div className='container'>
      <header>
        <h1>Gemini AI Content Generator</h1>
        <p>Enter a Prompt & let Gemini Create For You</p>
      </header>
      <form className='form' onSubmit={submitHandler}>
        <label htmlFor='prompt'>Enter Your Prompt:</label>
        <input
          id='prompt'
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write a content about.."
          className="input"
        />
        <button className='button' type='submit'>
          Generate Content
        </button>
        <section className='response'>
          {mutation.isPending && <p>Generating Your Content</p>}
          {mutation.isError && <p>{mutation.error.message}</p>}
          {mutation.isSuccess && <p>{mutation.data}</p>}
        </section>
      </form>
    </div>
  );
}

export default App;
