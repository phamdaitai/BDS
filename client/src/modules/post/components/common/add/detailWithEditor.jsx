import React, {useEffect} from "react";
import { Form, Select, Col, Row, Input } from 'antd';
import { CountryActions } from '../../../../country/redux/actions';
import { connect } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const { Option } = Select;

const Detail = (props) => {

    const { provincesData, districtsData, wardsData } = props.country;
    
    useEffect(() => {
        if (!props.country.provincesData.length) {
            props.getProvinces()
        }
    })

    console.log("provincesData", provincesData);

    return <React.Fragment>
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
                <Input />
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
    const { country } = state
    return { country };
}

const mapDispatchToProps = {
    getProvinces: CountryActions.getProvinces,
    getDistricts: CountryActions.getDistricts,
    getWards: CountryActions.getWards
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail);