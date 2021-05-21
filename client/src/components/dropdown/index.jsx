import React from 'react';
import Item from './item';

import './styles.scss';

const Dropdown = (props) => {
    const { columns = 3, title, items } = props;

    return (
        <div className="dropdown">
            <div>
                <div className="header-center-item">{title}</div>
            </div>
            
            <div className={`dropdown-${columns}-cols`}>
                {Array.isArray(items) && items.map((item , index) => <Item itemData={item} key={index}/>)}
            </div>
        </div>
    );
};

export default Dropdown;