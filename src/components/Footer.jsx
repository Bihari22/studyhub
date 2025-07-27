import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();  // Get the current year

  return (
   <footer className="text-center py-6 border-t mb-2">
      <div className="flex justify-center space-x-6 ">
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#privacy">Privacy</a>
      </div>
      <div className="space-x-4">
        <a href="#"><i className="fab fa-twitter" /></a>
        <a href="#"><i className="fab fa-facebook" /></a>
        <a href="#"><i className="fab fa-instagram" /></a>
      </div>
      <div className="mt-2 text-gray-400">
        <p>&copy; {currentYear} StudyHub. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
