import React, {useEffect} from "react";
import { Form, Select, Col, Row } from 'antd';
import { CountryActions } from '../../../../country/redux/actions';
import { connect } from "react-redux";      
import './styles.scss';

const { Option } = Select;

const Info = (props) => {

    const { provincesData, districtsData, wardsData } = props.country;
    
    useEffect(() => {
        if (!props.country.provincesData.length) {
            props.getProvinces()
        }
    })

    console.log("provincesData", provincesData);

    return <React.Fragment>
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