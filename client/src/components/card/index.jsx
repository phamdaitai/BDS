import React from 'react';
import Header from './header';
import Body from './footer';
import Footer from './footer';

import './styles.scss';

const Card = (props) => {
  return (
    <div className="card">
        {props.children}
    </div>
  );
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
