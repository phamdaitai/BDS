import React from 'react';
import { Rate } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons'

import noImage from '../../assets/images/bds-no-image.png';

import './styles.scss';

const SaleItem = (props) => {
    const { postItem } = props;

    const dataDirection = ["", "Đông", "Tây", "Nam", "Bắc", "Đông Nam", "Đông Bắc", "Tây Nam", "Tây Bắc"]

    return (
        <div className="sale-item">
            <div className="sale-item-title">
                <div>
                    <span>{ postItem.title }</span>
                </div>
                <div>
                    <span>Hôm nay</span>
                </div>
            </div>
            
            <div>
                <Rate className="sale-item-rate" allowHalf disabled defaultValue={2.5} />
            </div>

            <div className="sale-item-info">
                <div className="sale-item-avatar">
                    <img src={postItem.avatar ? postItem.avatar : noImage} alt=""/> 
                </div>
                
                <div className="sale-item-content">
                    <div>{ postItem.metaDescription }</div>
                    
                    <div className="sale-item-other-info">
                        <div><span>Diện tích:</span> &ensp; {postItem.acreage} (m<sup>2</sup>)</div>
                        <div><span>Kích thước:</span> &ensp;
                            {(postItem.width && postItem.length) ? `${postItem.width} x ${postItem.length} (m)` : "--"}</div>
                        <div><span>Hướng:</span> &ensp; {postItem.direction ? dataDirection[postItem.direction] : "--"}</div>
                        <div><span>Giá:</span> &ensp; {postItem.price}</div>
                        <div><EnvironmentOutlined /> &ensp; </div>
                        {postItem.floorNumber && <div><span>Số lầu:</span> &ensp; {postItem.floorNumber}</div>}
                        {postItem.bedroomNumber && <div><span>Số phòng ngủ:</span> &ensp; {postItem.bedroomNumber}</div>}
                        {postItem.roadAhead && <div><span>Đường trước nhà:</span> &ensp; {postItem.roadAhead} (m)</div>}
                    </div>
                </div>
            </div>
        </div>
  );
};

export default SaleItem;
