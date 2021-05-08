import React from 'react';

const Footer = (props) => {
    const { styles } = props;

    return (
        <div className="card-item card-footer" styles={styles}>
            {props.children}
        </div>
    );
};

export default Footer;
