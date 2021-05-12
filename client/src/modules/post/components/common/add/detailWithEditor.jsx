import React from "react";
import { Form, Input } from 'antd';
import { connect } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './styles.scss';

const Detail = (props) => {

    return <React.Fragment>
        <div className="post-add-item-header">
            <span>Thông tin bắt buộc</span>
        </div>

        <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[
                {
                required: true,
                },
            ]}
            className="ant-advanced-search-form"
        >
            <Input placeholder="Nhập tiêu đề..."/>
        </Form.Item>

        <p style={{marginBottom: "0.5rem"}}>Nội dung</p>
        <CKEditor
            editor={ ClassicEditor }
            data=""
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
            } }
        />
    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail);