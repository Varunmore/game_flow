import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section">
      <h2>Contact Us</h2>
      <p>
        Have questions or need support? Reach out to us at{' '}
        <a href="mailto:contact@gameshow.com">contact@gameshow.com</a>.
      </p>
    </section>
  );
};

export default Contact;
