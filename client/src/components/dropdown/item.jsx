import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const Item = (props) => {
    const { itemData, isManage } = props;

    return (
        <div className="dropdown-item">
            <Link to={!isManage ? `/post-cat/${itemData._id || ""}` : `/${itemData.path}`}>
                <div className="dropdown-item-name">{itemData.name}</div>
            </Link>
        </div>
    );
};

export default Item;