import React, {useEffect} from "react";
import { connect } from "react-redux";
import Container from '../../../components/container';
import Card from '../../../components/card';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CountryActions } from '../../country/redux/actions';
import { Form, Input } from 'antd';

const PostAddition = (props) => {
    
    useEffect(() => {
        if (!props.country.provincesData.length) {
            props.getProvinces()
        }
    })

    console.log("DATA", props.country.provincesData)

    return <Container>
    <Container.Col colSpan={9}>
        <Card >
            <Card.Header>Đăng tin dự án</Card.Header>
                <Card.Body>
                    <Form layout="vertical" name="post">
                        <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>

                    <CKEditor
                        editor={ ClassicEditor }
                        data=""
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                    /> 
                </Card.Body>
            <Card.Footer>Lưu thông tin</Card.Footer>
        </ Card>
    </Container.Col>
    <Container.Col colSpan={3}>
        <Card >
            <Card.Header style={{backgroundColor: "#0090b5", color: "white"}}>Danh mục nhà đất</Card.Header>
            <Card.Body>Nội dung danh mục nhà đất</Card.Body>
            <Card.Footer>footer</Card.Footer>
        </ Card>
    </Container.Col>
</Container>
};

const mapStateToProps = state => {
    const { country } = state
    return { country };
}

const mapDispatchToProps = {
    getProvinces: CountryActions.getProvinces,
    getDistricts: CountryActions.getDistricts,
    getWards: CountryActions.getWards
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAddition);