import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { Table, Empty, Pagination } from 'antd';
import { Link } from 'react-router-dom';

import { FormatMoney } from '../../../../helpers/formatCurrency';
import { slug } from '../../../../helpers/slug';

import { PaymentActions } from '../../redux/actions';

import Category from '../../../user/components/common/category';
import Container from '../../../../components/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';

import './styles.scss';

const Payment = (props) => {
    const { payment } = props;
    const { listPayments = [] } = payment;

    const [queryData, setQueryData] = useState({
        page: 1,
        limit: 10,
        type: 2
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
            key: 'post',
            dataIndex: 'post',
            title: 'Bài đăng được trả phí',
            width: '60%',
            render: (data) => {
                return (<Link to={`/detail/${slug(data?.title)}.${data?._id}.html`}>{data?.title}</Link>)
            }
        },
        {
            key: 'transaction',
            dataIndex: 'transaction',
            title: 'Tiền giao dịch',
            width: '20%',
            render: (data) => {
                return (<span>{FormatMoney(data)}</span>)
            }
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày thanh toán',
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
                <Card.Header>Lịch sử thanh toán</Card.Header>
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(Payment);