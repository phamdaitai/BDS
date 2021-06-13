import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import {Button, Select, Form, DatePicker } from 'antd';
import moment from 'moment';

import { PostActions } from '../../post/redux/actions';
import { CountryActions } from '../../country/redux/actions';

import Container from '../../../components/container';
import Card from '../../../components/card';
import { Bar, MiniArea } from 'ant-design-pro/lib/Charts';

import './styles.scss';

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

const DashBoard = (props) => {
    const {dateDashboard = [], areaDashboard = []} = props.post;
    const { provincesData, districtsData } = props.country;

    const [form] = Form.useForm();

    const [loaded, setLoaded] = useState(false);
    
    const [queryData, setQueryData] = useState({});

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getDashboardData(queryData);
            props.getProvinces()
        }
    })

    useEffect(() => {
        props.getDashboardData(queryData);
    }, [queryData])

    const _getDistricts = async (value) => {
        let provinceInfo = await provincesData.find(p => p._id === value);
        if (provinceInfo) await props.getDistricts({ provinceId: provinceInfo.id });
    }

    const submitFilter = (values) => {
        if (values.date?.length){
            values.startDate = new Date(values.date[0]._d)
            values.endDate = new Date(values.date[1]._d)
        }
        console.log("values", values);
        setQueryData({...queryData, ...values})
    }

    return (<Container>
        <Container.Col colSpan={12}>
                <Card>
                    <Card.Header>
                        Thống kê
                    </Card.Header>

                    <Card.Body>
                         {/* Filter */}
                        <Form
                            layout="vertical"
                            name="user-filter"
                            form={form}
                            onFinish={submitFilter}
                            className="filter-table"
                        >
                            <Form.Item
                                name="date"
                            >
                                <RangePicker
                                    defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                                    format={dateFormat}
                                />
                            </Form.Item>
                            <Form.Item
                                name="province"
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

                            <Form.Item
                                name="district"
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
                                >
                                    {districtsData && districtsData.length && 
                                        districtsData.map(d => <Option value={d._id}>
                                        {d.name}
                                    </Option>)}
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Tìm kiếm
                                </Button>
                            </Form.Item>
                        </Form>


                        <Bar height={400} title="Biểu đồ giá nhà đất trung bình theo khu vực" data={areaDashboard} />
                        <MiniArea line title="Biến động theo thời gian" color="#cceafe" height={400} data={dateDashboard} />
                    </Card.Body>
                    
                    <Card.Footer>
                    
                    </Card.Footer>
                </Card>
                
            </Container.Col>
        </Container>
    );
};

const mapStateToProps = state => {
    const { post, country } = state;
    return { post, country };
}

const mapDispatchToProps = {
    getDashboardData: PostActions.getDashboardData,
    getProvinces: CountryActions.getProvinces,
    getDistricts: CountryActions.getDistricts
}


export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);