import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Pagination, Empty, Button, Table, Form } from 'antd';

import { FormatMoney } from '../../../helpers/formatCurrency';

import Container from '../../../components/container';
import Card from '../../../components/card';
import Loading from '../../../components/loading';

import AddForm from './addForm';

import { FeeActions } from '../redux/actions';

const dataTypes = ["", "Gói 01 ngày", "Gói 30 ngày" ];

const Fee = (props) => {
    const { fee } = props;

    const [queryData, setQueryData] = useState({
        limit: 10,
        page: 1
    })

    const [loaded, setLoaded] = useState(false);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            
            props.getAllFees(queryData);
        }
    })

    useEffect(() => {
        props.getAllFees(queryData);
    }, [queryData])

    const columns = [
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Tên gói',
            width: '30%',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            key: 'type',
            dataIndex: 'type',
            title: 'Loại',
            width: '30%',
            render: (data) => {
                return (<span>{dataTypes[data]}</span>)
            }
        },
        {
            key: 'point',
            dataIndex: 'point',
            title: 'Trọng số',
            width: '20%',
            align: 'center'
        },
        {
            key: 'fee',
            dataIndex: 'fee',
            title: 'Mức phí',
            width: '20%',
            align: 'center',
            render: (data) => {
                return (<span>{FormatMoney(data)}</span>)
            }
        },
    ];

    const submitAddForm = async (values) => {
        await props.createFee(values);
        setVisible(false)
    }

    return <Container>
        {fee.isLoading && <Loading />}
        <Container.Col colSpan={12}>
            <Card >
                <Card.Header>
                    Mức phí bài đăng VIP
                    <Button
                        type="primary" style={{ float: "right" }}
                        onClick={() => setVisible(true)}
                    >
                        Thêm mức phí
                    </Button>
                </Card.Header>
                <Card.Body>

                    {fee.listFees?.length !== 0 ?
                        <Table
                            columns={columns}
                            dataSource={fee.listFees}
                            pagination={false}
                        /> :
                        <Empty description="Không có dữ liệu"/>
                    }

                    < AddForm
                        visible={visible}
                        setVisible={setVisible}
                        submitAddForm={submitAddForm}
                    />

                </Card.Body>
                <Card.Footer styles={{textAlign: "right"}}>
                    <Pagination
                        total={fee.totalDocs}
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
    </Container>
};

const mapStateToProps = state => {
    const { fee } = state;
    return { fee };
}

const mapDispatchToProps = {
    getAllFees: FeeActions.getAllFees,
    createFee: FeeActions.createFee,
}

export default connect(mapStateToProps, mapDispatchToProps)(Fee);
