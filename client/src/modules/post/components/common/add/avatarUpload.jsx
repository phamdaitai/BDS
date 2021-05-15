import React from "react";
import {  Upload } from 'antd';
import { connect } from "react-redux";

import './styles.scss';

const AvatarUpload = (props) => {
    const { avatar, setAvatar } = props;
    
    const onChange = ({ fileList: newFileList }) => {
        setAvatar(newFileList);
    };
    
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    return <React.Fragment>
        <div className="post-add-item-header" style={{marginTop: "1rem"}}>
            <span>Ảnh đại diện</span>
        </div>

        <Upload
            listType="picture-card"
            fileList={avatar}
            onChange={onChange}
            onPreview={onPreview}
            accept="image/*"
        >
            {avatar.length < 1 && '+ Chọn ảnh'}
        </Upload>
    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(AvatarUpload);