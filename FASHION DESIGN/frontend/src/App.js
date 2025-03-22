import React, { useState, useRef, useEffect } from "react";
import './App.css';
import Tshirt from "./assets/tshirt.jpg";

function App() {
  const [selectedColor, setSelectedColor] = useState("#FF0000");
  const [opacity, setOpacity] = useState(0.5);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef(null);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleOpacityChange = (e) => {
    setOpacity(e.target.value);
  };

  const saveDesign = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "tshirt-design.png";
      link.click();
    }
  };

  const resetDesign = () => {
    setSelectedColor("#FF0000");
    setOpacity(0.5);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = Tshirt;

    image.onload = () => {
      setIsLoading(false);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = selectedColor;
      ctx.globalAlpha = opacity;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1.0;
    };
  }, [selectedColor, opacity]);

  return (
    <div className="App">
      <h1>Fashion Design T-shirt Customizer</h1>
      <div className="tshirt-container">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="tshirt-canvas"
        />
        {isLoading && <p>Loading...</p>} {/* Loading Indicator */}
      </div>
      <div className="controls">
        <input
          type="color"
          value={selectedColor}
          onChange={handleColorChange}
          className="color-picker"
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={opacity}
          onChange={handleOpacityChange}
          className="opacity-slider"
        />
        <button onClick={saveDesign} className="save-button">
          Save Design
        </button>
        <button onClick={resetDesign} className="reset-button">
          Reset Design
        </button>
      </div>
    </div>
  );
}

export default App;
