import React, { useEffect } from 'react';

const SinusoidalLines = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    const color = '#20887c';
    const lineWidthFactor = 1.5;
    const speedFactor = 2; 
    
    class SinusoidalLine {
      constructor(frequency, amplitude, speed, lineWidth) {
        this.frequency = frequency;
        this.amplitude = amplitude;
        this.speed = speed;
        this.lineWidth = lineWidth;
        this.phase = Math.random() * Math.PI * 2;
      }
    
      draw() {
        ctx.beginPath();
        ctx.moveTo(-100, height / 2); // Start from a negative x-coordinate
        ctx.strokeStyle = color;
        ctx.lineWidth = this.lineWidth * lineWidthFactor;
        for (let x = -100; x < width + 100; x++) { // Extend beyond canvas width
          const y = height / 2 + Math.sin(x * this.frequency + this.phase) * this.amplitude;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.closePath();
        this.phase += this.speed * speedFactor;
      }
    }
    
    const lines = [
      new SinusoidalLine(0.007, 200, 0.004, 2),
      new SinusoidalLine(0.007, 170, 0.007, 2.5),
      new SinusoidalLine(0.007, 140, 0.005, 3),
      new SinusoidalLine(0.007, 80, 0.01, 3.5)
    ];
    
    canvas.width = width;
    canvas.height = height;
    
    function draw() {
      ctx.clearRect(0, 0, width, height);
      
      lines.forEach(line => {
        line.draw();
      });
      
      requestAnimationFrame(draw);
    }
    
    draw();


    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });


    return () => {
      ctx.clearRect(0, 0, width, height);
      window.removeEventListener('resize', () => {});
    };

  }, []);

  return <canvas id="canvas" />;
}

export default SinusoidalLines;