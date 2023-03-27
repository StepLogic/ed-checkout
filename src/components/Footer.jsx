import React from "react";

const Footer = (props) => {
  return (
    <div className="img_sfondo_bottom relative z-10 pointer-events-none">
      {props.children}
    </div>
  );
};

export default Footer;
