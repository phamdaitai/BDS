import React from "react";
import { connect } from "react-redux";
import { DeleteOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { FormatMoney } from '../../../../helpers/formatCurrency';
import { getFullAddress } from '../../../../helpers/formatAddress';

const dataStatus = [{},
    { title: "Đang chờ", color: "#FFE4C4" },
    { title: "Đã duyệt", color: "#00FFFF" },
    { title: "Đã hủy", color: "#DC143C" }]

const PostItem = (props) => {
    const { postItem, index } = props;

    return <tr>
        <td>{index}</td>

        <td className="user-post-item-avatar">
            <img src={postItem.avatar} alt="Ảnh"/>
        </td>

        <td>
            <div className="user-post-item-title">
                <Link to={`/edit/${postItem._id}`}>{ postItem.title }</Link>
            </div>
            <div>
                <EnvironmentOutlined style={{color: "green"}}/> &ensp;
                <span style={{ fontStyle: "italic" }}>
                    {getFullAddress(postItem?.address, postItem.ward, postItem.district, postItem.province)}
                </span>
            </div>
        </td>

        <td>
            {FormatMoney(postItem.price)}
        </td>

        <td style={{ color: `${postItem.status ? dataStatus[postItem.status].color : "black"}` }}>
            {postItem.status ? dataStatus[postItem.status].title : "--"}
        </td>

        <td className="user-post-list-delete">
            <DeleteOutlined title="Xóa"/>
        </td>
    </tr>
};

const mapStateToProps = state => {
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);