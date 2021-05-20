import React from "react";
import { connect } from "react-redux";
import { DeleteOutlined, EnvironmentOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Modal} from 'antd';

import { FormatMoney } from '../../../../helpers/formatCurrency';
import { getFullAddress } from '../../../../helpers/formatAddress';

import { PostActions } from '../../../post/redux/actions';

const { confirm } = Modal;

const dataStatus = [{},
    { title: "Đang chờ", color: "#FFE4C4" },
    { title: "Đã duyệt", color: "#00FFFF" },
    { title: "Đã hủy", color: "#DC143C" }]

const PostItem = (props) => {
    const { postItem, index } = props;

    const showConfirmDelete = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa bài đăng hay không?',
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Xóa",
            cancelText: "Hủy",
            
            onOk() {
                props.deletePost(postItem._id)
            },
            onCancel() {},
        });
    }

    return <tr>
        <td>{index}</td>

        <td className="user-post-item-avatar">
            <img src={postItem.avatar} alt="Ảnh"/>
        </td>

        <td>
            <div className="user-post-item-title">
                <Link to={`/post-edit/${postItem._id}`}>{ postItem.title }</Link>
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
            <DeleteOutlined title="Xóa" onClick={showConfirmDelete} />
        </td>
    </tr>
};

const mapStateToProps = state => {
}

const mapDispatchToProps = {
    deletePost: PostActions.deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);