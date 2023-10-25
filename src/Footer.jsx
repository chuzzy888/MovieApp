import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const yourName = 'CHIZU';

  return (
    <div className="footer" style={{backgroundColor:"black", color:"wheat"}}>
      &copy; {currentYear} {yourName} . All Right Reserved
    </div>
  );
};

export default Footer;
 