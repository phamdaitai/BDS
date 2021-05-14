import React, {useState} from "react";
import {  Upload, Button, message } from 'antd';
import { connect } from "react-redux";
import { UploadOutlined } from '@ant-design/icons';

import './styles.scss';

const ImageUpload = (props) => {

    const [fileList, setFileList] = useState([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    
    const onChange = ({ fileList: newFileList }) => {
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
            <span>Thêm hình ảnh cho bất động sản</span>
        </div>

        <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
        >
            {fileList.length < 6 && '+ Chọn ảnh'}
        </Upload>
    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);