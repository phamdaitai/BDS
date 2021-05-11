import React, {useEffect} from "react";
import { connect } from "react-redux";
import Container from '../../../components/container';
import Card from '../../../components/card';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CountryActions } from '../../country/redux/actions';
import { Form, Input, Select, Col } from 'antd';

const { Option } = Select;

const PostAddition = (props) => {
    const { provincesData, districtsData, wardsData } = props.country;
    
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
                
                    <p style={{marginBottom: "0.5rem"}}>Nội dung</p>
                    <CKEditor
                        editor={ ClassicEditor }
                        data=""
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                    />

                    <Col
                        span={24}
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Col span={8}>
                            <Form.Item
                                name="provinceId"
                                label="Tỉnh / thành phố"
                                rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn tỉnh / thành phố',
                                },
                                ]}
                            >
                                <Select
                                    showSearch
                                    // style={{ width: 200 }}
                                    placeholder="Chọn tỉnh / thành phố"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {provincesData && provincesData.length && 
                                        provincesData.map(p => <Option value={p.id}>
                                        {p.name}
                                    </Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Col>
                    
                    {/* <Container>
                        <Container.Col colSpan={4}>
                            <Form.Item
                                name="provinceId"
                                label="Tỉnh / thành phố"
                                rules={[
                                    {
                                    required: true,
                                    },
                                ]}
                            >
                                
                            </Form.Item>
                        </Container.Col>
                        <Container.Col colSpan={4}>
                            <Form.Item
                                name="districtId"
                                label="Quận / huyện"
                                rules={[
                                    {
                                    required: true,
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Chọn quận / huyện"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {provincesData && provincesData.length && 
                                        provincesData.map(p => <Option value={p.id}>
                                        {p.name}
                                    </Option>)}
                                </Select>
                            </Form.Item>
                        </Container.Col>
                        <Container.Col colSpan={4}>
                            <Form.Item
                                name="wardId"
                                label="Xã / phường"
                                rules={[
                                    {
                                    required: true,
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Chọn xã / phường"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {provincesData && provincesData.length && 
                                        provincesData.map(p => <Option value={p.id}>
                                        {p.name}
                                    </Option>)}
                                </Select>
                            </Form.Item>
                        </Container.Col>
                    </Container> */}
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