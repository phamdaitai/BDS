import React from 'react';
import { Rate, Button, Input, Avatar } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import './styles.scss';

const CommentItem = (props) => {
    const { item } = props;

    return (
        <div className="post-comment-item">
            <div className="post-comment-item-info">
                <Avatar
                    style={{
                        backgroundColor: '#87d068',
                    }}
                    icon={<UserOutlined />}
                    src={item?.user?.avatar ? item?.user?.avatar : ""}
                    size={30}
                />
                <span>{item?.user?.name || "Nguời dùng ẩn danh"}</span>
                <span>11 giờ trước</span>
            </div>

            <div className="post-comment-item-action">
                <EditOutlined title="Chỉnh sửa"/>
                <DeleteOutlined title="Xóa bình luận"/>
            </div>

            <div className="post-comment-item-content">
                <p>{item.comment}</p>
            </div>
        </div>
    );
};

export default CommentItem;