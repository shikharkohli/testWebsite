import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [faqs, setFaqs] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFaqs('');
    try {
      const response = await fetch('/api/generateFaq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      setFaqs(data.faqs);
    } catch (error) {
      console.error('Error:', error);
      setFaqs('Error generating FAQs.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>FAQ Generator</h2>
        <p>Enter a website URL to generate a custom FAQ page automatically.</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="url" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
          />
          <button type="submit">Generate FAQs</button>
        </form>
        {loading && <p>Generating FAQs...</p>}
        {faqs && (
          <div className="faq-output">
            <h3>Generated FAQs:</h3>
            <pre>{faqs}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

