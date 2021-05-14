import React, {useState} from "react";
import {  Upload, Button, message } from 'antd';
import { connect } from "react-redux";
import { UploadOutlined } from '@ant-design/icons';

import './styles.scss';

const AvatarUpload = (props) => {

    const [fileList, setFileList] = useState([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    
    const onChange = ({ fileList: newFileList }) => {
        console.log("newFileList", newFileList);
        setFileList(newFileList);
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
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            accept="image/*"
        >
            {fileList.length < 1 && '+ Chọn ảnh'}
        </Upload>
    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(AvatarUpload);