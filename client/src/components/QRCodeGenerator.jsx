import React, { useState } from 'react';

const QRCodeGenerator = ({id}) => {
  const [carNumber, setCarNumber] = useState('');
  const [name, setName] = useState('');
  const [qrCodeImage, setQRCodeImage] = useState('');
  
  const generateQRCode = async () => {
    
    const link = window.location.href + 'carCallerPage'+carNumber   
    try {
      const response = await fetch('/api/car/generateQR', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, link , carNumber}),
      });

      const data = await response.json();
      if (data.success) {
        setQRCodeImage(data.qrCodeImage);
        } else {
        console.error('Failed to generate QR code');
      }
    } catch (error) {
      console.error('Failed to generate QR code', error);
    }
  };

  return (
    <div>
      <h1>Car QR Code Generator</h1>
      <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      <input type="text" value={carNumber} onChange={(e) => setCarNumber(e.target.value)} />
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCodeImage && <img src={qrCodeImage} alt="QR Code" />}
    </div>
  );
};

export default QRCodeGenerator;
