import { useRef, useEffect } from 'react';
import './Squares.css';
import Scrolllvelocity from '../../ScrollVelocity/ScrollVelocity';
import CountUp from'../../Count/CountUp/CountUp'

import imges from '../assets/newImg.png'
import photo from '../assets/photo.png'
import Contact from './Contact';




const Squares = ({
  direction = 'diagonal',
  speed = 0.5,
  borderColor = 'purple',
  squareSize = 40,
  hoverFillColor = 'purple',
  className = ''
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef();
  const numSquaresY = useRef();
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquare.current &&
            Math.floor((x - startX) / squareSize) === hoveredSquare.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquare.current.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };
    

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);

      if (
        !hoveredSquare.current ||
        hoveredSquare.current.x !== hoveredSquareX ||
        hoveredSquare.current.y !== hoveredSquareY
      ) {
        hoveredSquare.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquare.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

 return (
  <>
    <canvas ref={canvasRef} className={`squares-canvas ${className}`}></canvas>
    <div class="name">
  <div class="row">
    <div class="col-md-10 order-2 order-md-1">
       <div className='banner-text'>
      <h3 className='hello'>Hello,</h3>
      <h3 className='hello'>I'm <i id='surya'>Surya Praksh</i></h3>
      <h3 className='hello'>Website Designer</h3>
      <h1>
        "Building functional,  <br />meaningful websites that <br />
        inspire user interaction and  <br />elevate digital brands."
      </h1>
      </div>
    </div>
    <div class="col-md-2 order-1 order-md-2 ">
        <div className="astro">
      <img src={imges} alt="" />
      </div>
    
    </div>
  </div>
</div>

    <div className='name'>
      
       
      
      
    

    </div>
  
  
   {/* <DecryptedText text="“I'm Surya Prakash, a passionate and dedicated web developer focused on building clean, 
responsive, and user-friendly websites. 
 I'm currently honing my skills and excited to work on real-world projects
  that solve problems and create value.”" /> */}
  <div className='scroll'>
     <ScrollVelocity />
  </div>
  <div className="holl">
   <h2 className='skill'>👋 Skills</h2>
  <div>
         <h3 className='skill-text'>I specialize in front-end development, building intuitive, user-friendly digital experiences using technologies like HTML, CSS, JavaScript, React, and more.</h3>
         <div className="increase">
         <div class="container">
  <div class="row">
    <div class="col">
      <h1><CountUp /></h1>
            <h2>HTML</h2>
    </div>
    <div class="col">
       <h1><CountUp /></h1>
            <h2>CSS</h2>
    </div>
    <div class="col">
      <h1><CountUp /></h1>
            <h2>BOOTSTRAP</h2>
    </div>
  </div>
 </div>
</div>
<div class="container">
  <div class="row">
    <div class="col">
       <h1><CountUp /></h1>
            <h2>JAVASCRIPT</h2>
    </div>
    <div class="col" >
      <h1><CountUp /></h1>
            <h2>REACT JS</h2>
    </div>
   
  </div>
</div>

  </div>

     <div className='button'>
     <button type="button" class="btn btn-dark">Contact</button>
     </div>
     <div className='about'>
       <h3 className='about-me'>👨‍💻ABOUT ME</h3>
       <div className="photo">
             <img src={photo} alt="" />
       </div>
           
     <h3 className='about-text'>I’m Surya Prakash, a passionate and dedicated web developer specializing in creating clean, responsive, and user-friendly websites.
       I focus on writing efficient code and designing seamless user experiences that work well across all devices
      . Currently, I’m actively enhancing my skills and eager to apply them by working on real-world projects that address challenges and deliver meaningful solutions.

”</h3>
       <div className='button'>
     <button type="button" class="btn btn-dark">Resume</button>
     </div>
     </div>
     <br />
     <h2 className='p'>Projects</h2> <br />
       <h3 className='project'>Project 1: E-commerce</h3> <br />
       <h3 className='project-text'>Wow Holidays is a simple travel-themed website built using HTML and CSS. The site showcases different holiday destinations with images, descriptions, and clean layouts. It's designed to be visually attractive and easy to navigate, giving users an idea of where they might want to travel.</h3>
        <br />
        <h3 className='project'>Project 2: Portfolio</h3> <br />
       <h3  className='project-text'>This is my personal portfolio website designed and developed to showcase my skills, projects, and contact information. It’s built using HTML, CSS, Bootstrap for responsive design, JavaScript for interactivity, and React.js to create a smooth, component-based user experience.</h3>
        <h3 className='project-text'>The website features a clean layout, smooth navigation, and responsive design to ensure it looks great on all devices. It also includes sections like About Me, Projects, Skills, and Contact.</h3>
        <br />
     <div>
     
      
        <Contact />
     </div>

  

     <hr />
     <footer className='footer'>
       &copy; 2025 <strong>Surya Prakash</strong>. All rights reserved.
     </footer>
     </div>
   </>
)

};

export default Squares;
