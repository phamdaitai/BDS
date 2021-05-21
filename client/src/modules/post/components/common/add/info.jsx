import React, {useEffect, useState} from "react";
import { Form, Select, Col, Row, Input, InputNumber } from 'antd';
import { CountryActions } from '../../../../country/redux/actions';
import { connect } from "react-redux";      
import './styles.scss';

const { Option } = Select;

const Info = (props) => {

    const [loaded, setLoaded] = useState(false);

    const { provincesData, districtsData, wardsData } = props.country;
    
    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getProvinces()
        }
    })

    const _getDistricts = async (value) => {
        let provinceInfo = await provincesData.find(p => p._id === value);
        if (provinceInfo) await props.getDistricts({ provinceId: provinceInfo.id });
    }

    const _getWards = (value) => {
        let districtInfo = districtsData.find(d => d._id === value);
        if (districtInfo) props.getWards({ districtId: districtInfo.id })
    }

    return <React.Fragment>
        {/* Phần chọn khu vực */}
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
                        name="province"
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
                            placeholder="Chọn tỉnh / thành phố"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                                onChange={(value) => _getDistricts(value)}
                        >
                            {provincesData && provincesData.length && 
                                provincesData.map(p => <Option value={p._id}>
                                {p.name}
                            </Option>)}
                        </Select>
                    </Form.Item>
                    </Col>
                    
                    <Col span={8}>
                    <Form.Item
                        name="district"
                        label="Quận / huyện"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn quận / huyện',
                        },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn quận / huyện"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                                onChange={(value) => _getWards(value)}
                        >
                            {districtsData && districtsData.length && 
                                districtsData.map(d => <Option value={d._id}>
                                {d.name}
                            </Option>)}
                        </Select>
                    </Form.Item>
                    </Col>
                    
                    <Col span={8}>
                    <Form.Item
                        name="ward"
                        label="Xã / phường"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn xã / phường',
                        },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn xã / phường"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            {wardsData && wardsData.length && 
                                wardsData.map(w => <Option value={w._id}>
                                {w.name}
                            </Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Col>
        </Row>

        {/* Phần địa chỉ */}
        <Form.Item
            name="address"
            label="Địa chỉ nhà"
        >
            <Input placeholder="Ví dụ: Số 10, Trường Chinh" />
        </Form.Item>
        
        {/* Phần diện tích, giá */}
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
                        name="projectName"
                        label="Tên dự án"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên dự án',
                        },
                        ]}
                    >
                        <Input placeholder="Nhập tên dự án..."/>
                    </Form.Item>
                    </Col>
                    
                    <Col span={8}>
                    <Form.Item
                        name="acreage"
                        label="Diện tích (m2)"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập diện tích',
                        },
                        ]}
                    >
                        <InputNumber
                            placeholder="Nhập diện tích..."
                            style={{width: "100%"}}
                        />
                    </Form.Item>
                    </Col>
                    
                    <Col span={8}>
                    <Form.Item
                        name="price"
                        label="Giá (vnđ)"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá',
                        },
                        ]}
                    >
                        <InputNumber
                            placeholder="Ví dụ: 1.000k"
                            style={{ width: "100%" }}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                </Col>
            </Col>
        </Row>
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


export default connect(mapStateToProps, mapDispatchToProps)(Info);