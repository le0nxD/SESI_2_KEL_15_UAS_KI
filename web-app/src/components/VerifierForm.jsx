import React, { useState } from 'react';

function VerifierForm() {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [signer, setSigner] = useState('');
  const [result, setResult] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature, expectedSigner: signer }),
      });

      const data = await res.json();
      setResult(data.valid ? '✅ Signature Valid' : '❌ Invalid Signature');
    } catch (err) {
      console.error(err);
      setResult('❌ Error verifying signature.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔏 Signature Verifier</h2>
      <form onSubmit={handleVerify}>
        <div>
          <label>Message: </label>
          <input value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <div>
          <label>Signature: </label>
          <textarea value={signature} onChange={(e) => setSignature(e.target.value)} required />
        </div>
        <div>
          <label>Signer Address: </label>
          <input value={signer} onChange={(e) => setSigner(e.target.value)} required />
        </div>
        <button type="submit">Verify Signature</button>
      </form>

      {result && <p style={{ marginTop: 20 }}>{result}</p>}
    </div>
  );
}

export default VerifierForm;
