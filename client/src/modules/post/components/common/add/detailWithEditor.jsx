import React from "react";
import { Form, Input } from 'antd';
import { connect } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './styles.scss';

const { TextArea } = Input;

const Detail = (props) => {
    const { onChangeDescription, description } = props;

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
                    message: 'Vui lòng nhập tiêu đề',
                },
            ]}
            className="ant-advanced-search-form"
        >
            <Input placeholder="Nhập tiêu đề..."/>
        </Form.Item>

        <Form.Item
            name="metaDescription"
            label="Mô tả ngắn về dự án"
            rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập mô tả ngắn về dự án',
                },
            ]}
        >
            <TextArea placeholder="Nhập mô tả..." rows={4}/>
        </Form.Item>

        <p style={{marginBottom: "0.5rem"}}>Nội dung</p>
        <CKEditor
            editor={ ClassicEditor }
            data={description}
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                onChangeDescription(data)
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