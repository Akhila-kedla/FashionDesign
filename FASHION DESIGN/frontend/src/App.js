import React, { useState, useRef } from "react";
import './App.css';
import Tshirt from "./assets/tshirt.jpg";
import SummaryApi from "./common"; 

function App() {
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [isSaving, setIsSaving] = useState(false);
  const tshirtRef = useRef(null);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const saveDesign = async () => {
    setIsSaving(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const tshirt = tshirtRef.current;
      if (tshirt && tshirt.complete) {
        canvas.width = tshirt.naturalWidth;
        canvas.height = tshirt.naturalHeight;
        ctx.fillStyle = selectedColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

      
        ctx.drawImage(tshirt, 0, 0, canvas.width, canvas.height);

       
        const imageData = canvas.toDataURL('image/png');

      
        const response = await fetch(SummaryApi.addDesign.url, {
          method: SummaryApi.addDesign.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            color: selectedColor,
            image: imageData,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) throw new Error('Save failed');
        alert('Design saved successfully!');
      } else {
        console.error("Image not ready for drawing on canvas.");
        alert("Please wait for the image to load before saving.");
      }
    } catch (error) {
      console.error('Error saving design:', error);
      alert('Error saving design');
    }
    setIsSaving(false);
  };

  return (
    <div className="App">
      <h1>Fashion Design T-Shirt Customizer</h1>
      <div className="tshirt-container">
        <div className="tshirt-overlay" style={{ backgroundColor: selectedColor }}>
          <img 
            src={Tshirt} 
            className="tshirt-image" 
            alt="T-shirt" 
            ref={tshirtRef} 
            onLoad={() => console.log("Image loaded successfully!")} 
          />
        </div>
      </div>

      <div className="controls">
        <input 
          type="color" 
          value={selectedColor} 
          onChange={handleColorChange} 
          className="color-picker"
        />
        <button 
          onClick={saveDesign} 
          className="save-button" 
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Design"}
        </button>
      </div>
    </div>
  );
}

export default App;
