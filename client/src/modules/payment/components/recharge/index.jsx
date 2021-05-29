import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { Button, Table, Empty, Pagination } from 'antd';

import { FormatMoney } from '../../../../helpers/formatCurrency';

import { PaymentActions } from '../../redux/actions';

import Category from '../../../user/components/common/category';
import Container from '../../../../components/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';

import './styles.scss';

const dataTypes = ["", "Nạp tiền", "Thanh toán"]

const ReCharge = (props) => {
    const { payment } = props;
    const { listPayments = [] } = payment;

    const [queryData, setQueryData] = useState({
        page: 1,
        limit: 10,
        type: 1
    })

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getAllPayments(queryData);
        }
    })

    useEffect(() => {
        props.getAllPayments(queryData);
    }, [queryData])

    const columns = [
        {
            key: 'type',
            dataIndex: 'type',
            title: 'Loại',
            width: '10%',
            render: (data) => {
                return (<span>{dataTypes[data]}</span>)
            }
        },
        {
            key: 'transaction',
            dataIndex: 'transaction',
            title: 'Tiền giao dịch',
            width: '15%',
            render: (data) => {
                return (<span>{FormatMoney(data)}</span>)
            }
        },
        {
            key: 'bankName',
            dataIndex: 'bankName',
            title: 'Tên ngân hàng',
            width: '15%'
        },
        {
            key: 'bankAccount',
            dataIndex: 'bankAccount',
            title: 'Số tài khoản',
            width: '20%'
        },
        {
            key: 'bankAccount',
            dataIndex: 'bankAccount',
            title: 'bankOwer',
            width: '20%'
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày nạp tiền',
            width: '20%',
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
            render: (data, record) => {
                return (
                    <span>{moment(new Date(data)).format("hh:mm - DD/MM/YYYY")}</span>
                )
            }
        },
    ];

    return <Container>
        {payment.isLoading && <Loading />}
        <Container.Col colSpan={9}>
            <Card >
                <Card.Header>Lịch sử nạp tiền</Card.Header>
                    
                <Card.Body>
                    {listPayments?.length !== 0 ?
                        <Table
                            columns={columns}
                            dataSource={listPayments}
                            pagination={false}
                        /> :
                        <Empty description="Không có dữ liệu"/>
                    }
                </Card.Body>

                <Card.Footer styles={{textAlign: "right"}}>
                    <Pagination
                        total={payment.totalDocs}
                        current={queryData.page}
                        pageSize={queryData.limit}
                        onChange={(page, pageSize) => {
                            setQueryData({ ...queryData, page, limit: pageSize })
                        }}
                        showSizeChanger
                        showQuickJumper
                        pageSizeOptions={[5, 10, 15, 20, 50]}
                        showTotal={total => `Tổng ${total} mục`}
                    />
                </Card.Footer>
            </ Card>
        </Container.Col>
        
        <Category />
    </Container>
};

const mapStateToProps = state => {
    const { payment } = state;
    return { payment }
}

const mapDispatchToProps = {
    getAllPayments: PaymentActions.getAllPayments
}

export default connect(mapStateToProps, mapDispatchToProps)(ReCharge);