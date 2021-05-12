import React, {useEffect} from "react";
import { connect } from "react-redux";
import Container from '../../../../components/container';
import Card from '../../../../components/card';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CountryActions } from '../../../country/redux/actions';
import { Form, Input, Select, Col, Row, Button } from 'antd';
// import Detail from './add/detail';
import Detail from '../common/add/detailWithEditor';
import Info from '../common/add/info';

const { Option } = Select;

const PostAddition = (props) => {
    const { provincesData, districtsData, wardsData } = props.country;
    
    useEffect(() => {
        if (!props.country.provincesData.length) {
            props.getProvinces()
        }
    })

    const onSubmit = async (values) => {
        console.log(values)
    };

    return <Container>
    <Container.Col colSpan={9}>
        <Card >
            <Card.Header>Đăng tin dự án</Card.Header>
                <Card.Body>
                    <Form
                        layout="vertical"
                        name="post"
                        onFinish={onSubmit}
                    >
                        <Detail />
                        
                        <Info />

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Đăng bài
                            </Button>
                        </Form.Item>
                    </Form>
                </Card.Body>
            <Card.Footer>
            
                
           
            </Card.Footer>
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