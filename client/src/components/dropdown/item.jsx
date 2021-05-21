import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const Item = (props) => {
    const { itemData } = props;

    return (
        <div className="dropdown-item">
            <Link to={`/post-cat/${itemData._id || ""}`}>
                <div className="dropdown-item-name">{itemData.name}</div>
            </Link>
        </div>
    );
};

export default Item;