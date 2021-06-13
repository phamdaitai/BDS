import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import {Button, Select, Form, DatePicker } from 'antd';
import moment from 'moment';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, CartesianGrid, Line
} from 'recharts';

import { FormatMoney } from '../../../helpers/formatCurrency';

import { PostActions } from '../../post/redux/actions';
import { CountryActions } from '../../country/redux/actions';

import Container from '../../../components/container';
import Card from '../../../components/card';

import './styles.scss';

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

const BarchartTooltip = (data) => {
    if (!data?.payload?.length)
        return 0
    if (data.active) {
        return (
            <div className="chart-tooltip">
                <p className="label">{`Khu vực: `} <b>{data?.payload[0]?.payload?.x}</b></p>
                <p className="label">{`Giá nhà đất trung bình: `} <b style={{color: "red"}}>{FormatMoney(data?.payload[0]?.payload?.y)}</b></p>
            </div>
        );
    }

    return null;
};

const LineChartTooltip = (data) => {
    if (!data?.payload?.length)
        return 0
    if (data.active) {
        return (
            <div className="chart-tooltip">
                <p className="label">{`Ngày: `} <b>{data?.payload[0]?.payload?.x}</b></p>
                <p className="label">{`Giá nhà đất trung bình: `} <b style={{color: "red"}}>{FormatMoney(data?.payload[0]?.payload?.y)}</b></p>
            </div>
        );
    }

    return null;
};

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

                        <h2>Biểu đồ giá nhà đất trung bình theo khu vực</h2>
                        <BarChart width={1200} height={400} data={areaDashboard} style={{width: "100% !important"}}>
                        <CartesianGrid stroke="none" />
                            <XAxis dataKey="x" />
                            <YAxis dataKey="y" tickFormatter={(data) => FormatMoney(data)} />
                            <Tooltip content={<BarchartTooltip />}/>
                            <Bar dataKey="y" fill="#413ea0" name="Biểu đồ giá nhà đất trung bình theo khu vực" />
                        </BarChart>
                        <br />

                        <h2>Biểu đồ biến động giá nhà đất theo thời gian</h2>
                        <LineChart width={1200} height={400} data={dateDashboard} style={{width: "100% !important"}}>
                            <CartesianGrid stroke="none" />
                            <XAxis dataKey="x" />
                            <YAxis dataKey="y" tickFormatter={(data) => FormatMoney(data)} />
                            <Tooltip content={<LineChartTooltip />}/>
                            <Line type="monotone" dataKey="y" stroke="#82ca9d" />
                        </LineChart>
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