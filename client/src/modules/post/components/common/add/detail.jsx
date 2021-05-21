import React, {useEffect, useState} from "react";
import { Form, Input, Select, Row, Col } from 'antd';
import { connect } from "react-redux";
import { CategoryActions } from '../../../../category/redux/actions';

import './styles.scss';

const { Option } = Select;
const { TextArea } = Input;

const Detail = (props) => {
    const { listCategoriesNoPagination = [] } = props.category;
    const { type, setType } = props;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getAllCategoriesNoPagination()
        }
    })

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

        <Row >
            <Col
                span={24}
                style={{
                    textAlign: 'right',
                }}
                className="post-select-add-address"
            >
                <Col span={8}>
                    <Form.Item
                        name="type"
                        label="Loại tin"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn loại tin',
                        },
                        ]}
                    >
                        <Select
                            placeholder="Chọn loại tin"
                            onChange={(v) => setType(v)}
                        >
                            <Option value={1}>Nhà đất bán</Option>
                            <Option value={2}>Nhà đất cho thuê</Option>
                        </Select>
                    </Form.Item>
                </Col>
                    
                <Col span={16}>
                    <Form.Item
                        name="categories"
                        label="Danh mục"
                        rules={[
                        {
                            required: true,
                            message: 'Chọn ít nhất 01 danh mục',
                        },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Chọn danh mục"
                        >
                            {listCategoriesNoPagination.filter(c => c.type === type).map(c =>
                                (<Option key={c._id} value={c._id}>{c.name}</Option>))}
                        </Select>
                    </Form.Item>
                </Col>

            </Col>
        </Row>
    </React.Fragment>
}

const mapStateToProps = state => {
    const { category } = state;
    return { category };
}

const mapDispatchToProps = {
    getAllCategoriesNoPagination: CategoryActions.getAllCategoriesNoPagination
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail);