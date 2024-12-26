import React, { useState } from 'react';
import './Contact.css';
import theme_pattern from '../../assets/theme_pattern.svg';
import mail_icon from '../../assets/mail_icon.svg';
import location_icon from '../../assets/location_icon.svg';
import call_icon from '../../assets/call_icon.svg';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState('Submit Now'); // Button text state
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const onSubmit = (event) => {
    event.preventDefault();

    // Clear input fields as soon as the button is clicked
    const currentName = name;
    const currentEmail = email;
    const currentMessage = message;

    setName('');
    setEmail('');
    setMessage('');

    const serviceId = 'service_luriyi5';
    const contactTemplateId = 'template_jtzhofc';
    const autoResponseTemplateId = 'template_auto_response';
    const publicKey = 'ce2gVIuJV9fWcMcYT';

    // Parameters for sending the contact email
    const contactTemplateParams = {
      from_name: currentName,
      from_email: currentEmail,
      to_name: 'AmbFavor',
      message: currentMessage,
    };

    // Parameters for sending the auto-response email
    const autoResponseTemplateParams = {
      from_email: currentEmail, // User's email address as recipient
      from_name: currentName, // User's name for personalization
    };

    // Start the loading state
    setIsSubmitting(true);
    setButtonText('Loading...');

    // Send the contact email
    emailjs
      .send(serviceId, contactTemplateId, contactTemplateParams, publicKey)
      .then((response) => {
        console.log('Contact email sent successfully:', response);

        // Send the auto-response email
        emailjs
          .send(serviceId, autoResponseTemplateId, autoResponseTemplateParams, publicKey)
          .then((response) => {
            console.log('Auto-response email sent successfully:', response);

            // Update button text to "Sent!" and stop loading
            setButtonText('Sent!');
            setTimeout(() => setButtonText('Submit Now'), 3000); // Reset button text after 3 seconds
          })
          .catch((error) => {
            console.error('Failed to send auto-response email:', error);
            setButtonText('Submit Now');
          });
      })
      .catch((error) => {
        console.error('Failed to send contact email:', error);
        setButtonText('Submit Now');
      })
      .finally(() => {
        setIsSubmitting(false); // Stop loading state
      });
  };

  return (
    <div id="contact" className="contact">
      <div className="contact-title">
        <h1>Get In Touch</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="contact-section">
        <div className="contact-left">
          <h1>Let's Talk</h1>
          <p>
            I'm currently available to take on new projects, so feel free to
            send me a message about anything that you want me to work on. You
            can contact me anytime.
          </p>
          <div className="contact-details">
            <div className="contact-detail">
              <img src={mail_icon} alt="Email" />
              <p>chikaugwu0121@gmail.com</p>
            </div>
            <div className="contact-detail">
              <img src={call_icon} alt="Phone" />
              <p>+2349016126060</p>
            </div>
            <div className="contact-detail">
              <img src={location_icon} alt="Location" />
              <p>Abuja, Nigeria</p>
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="contact-right">
          <label htmlFor="">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="user_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting} // Disable input while submitting
          />
          <label htmlFor="">Your Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="user_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting} // Disable input while submitting
          />
          <label htmlFor="">Write your message here</label>
          <textarea
            name="message"
            rows="8"
            placeholder="Enter your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting} // Disable input while submitting
          ></textarea>
          <button
            type="submit"
            className="contact-submit"
            disabled={isSubmitting} // Disable button while submitting
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
