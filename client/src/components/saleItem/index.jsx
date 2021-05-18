import React from 'react';
import { Rate } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import 'moment/locale/vi';
import moment from 'moment';

import noImage from '../../assets/images/bds-no-image.png';
import { FormatMoney } from '../../helpers/formatCurrency';
import { getFullAddress } from '../../helpers/formatAddress';
import { slug } from '../../helpers/slug';

import './styles.scss';

moment.locale('vi');

const SaleItem = (props) => {
    const { postItem } = props;

    const dataDirection = ["", "Đông", "Tây", "Nam", "Bắc", "Đông Nam", "Đông Bắc", "Tây Nam", "Tây Bắc"]

    return (
        <div className="sale-item">
            <div className="sale-item-title">
                <div>
                    <Link to={`/detail/${slug(postItem.title)}.${postItem._id}.html`}>{ postItem.title }</Link>
                </div>
                <div>
                    <span>{moment(postItem.createdAt).fromNow()}</span>
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
                        <div>
                            <span>Diện tích:</span> &ensp;
                            <span >{postItem.acreage} m<sup>2</sup></span>
                        </div>

                        <div>
                            <span>Kích thước:</span> &ensp;
                            <span>
                                {(postItem.width && postItem.length) ? `${postItem.width} x ${postItem.length} m` : "--"}
                            </span>
                        </div>
                        
                        <div>
                            <span>Hướng:</span> &ensp;
                            <span>{postItem.direction ? dataDirection[postItem.direction] : "--"}</span>
                        </div>

                        <div>
                            <span>Giá:</span> &ensp;
                            <span>{FormatMoney(postItem.price)}</span>
                        </div>

                        <div>
                            <EnvironmentOutlined style={{color: "green"}}/> &ensp;
                            <span style={{fontStyle: "italic"}}>{getFullAddress(postItem?.address, postItem.ward, postItem.district, postItem.province)}</span>
                        </div>

                        {postItem.floorNumber && <div>
                            <span>Số lầu:</span> &ensp;
                            <span>{postItem.floorNumber}</span>
                        </div>}
                        
                        {postItem.bedroomNumber && <div>
                            <span>Số phòng ngủ:</span> &ensp;
                            <span>{postItem.bedroomNumber}</span>
                        </div>}

                        {postItem.roadAhead && <div>
                            <span>Đường trước nhà:</span> &ensp;
                            <span>{postItem.roadAhead} m</span>
                        </div>}

                    </div>
                </div>
            </div>
        </div>
  );
};

export default SaleItem;
