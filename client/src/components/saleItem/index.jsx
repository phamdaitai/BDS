import React from 'react';
import { Rate } from 'antd';

import noImage from '../../assets/images/bds-no-image.png';

import './styles.scss';

const SaleItem = (props) => {
    const { postItem } = props;

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
                    <div>
                    PHÒNG ĐẦY ĐỦ NỘI THẤT, TỰ DO GIỜ GIẤC, RỘNG VÀ SANG, AN NINH TUYỆT ĐỐI - Phòng mới xây dạng nhà trọ cao cấp nên thiết kế rất thoáng mát, nhằm đáp ứng cho mọi người có môi trường sống an ninh, thoải mái không bị cảm giác, thoải mái không bị cảm giác
                    </div>
                    
                    <div>
                    </div>

                    <div>
                    </div>    
                </div>
            </div>
        </div>
  );
};

export default SaleItem;
