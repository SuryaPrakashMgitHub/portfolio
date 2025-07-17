// Contact.jsx
import React, { useState } from 'react';
import './Contact.css'; // Import the CSS file

const Contact = () => {
  const [result, setResult] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);  //message iruka illaya appears.

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "41a232f7-76d9-4241-94be-fd7db5ca1acf");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      setShowSuccess(true);
      event.target.reset();
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      console.log("Error", data);
      alert(data.message);
      setResult("");
    }
  };

  return (
    <div className='contact-section' id='Contact'>
      <h1 className='contact-title'>
        Contact <span className='contact-subtitle'></span>
      </h1>
     
     

      {showSuccess && (
        <div className="alert-container">
          <div className="alert-success">
            <svg className="alert-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="alert-text">Form submitted successfully!</span>
          </div>
        </div>
      )}
          
      <form onSubmit={onSubmit} className='contact-form'>   
        <div className='form-row'>
          <div className='form-field'>
            Your Name
            <input type="text" name='Name' placeholder='Your Name' required />
          </div>
          <div className='form-field'>
            Your Email
            <input type="email" name='Email' placeholder='Your Email' required />
          </div>
        </div>
        <div className='form-message'>
          Message
          <textarea name="Message" placeholder='Message' required></textarea>
        </div>
        <button type="submit" className='form-button'>
          {result ? result : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
