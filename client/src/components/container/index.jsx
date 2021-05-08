import React from 'react';
import Col from './Col';

import './styles.scss';

const Container = (props) => {
  return (
    <div className="container">
        {props.children}
    </div>
  );
};

Container.Col = Col;

export default Container;
