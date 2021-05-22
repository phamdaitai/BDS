import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Pagination, Empty, Button, Table, Modal, Select } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

import Container from '../../../../components/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';

import { UserActions } from '../../redux/actions';

import './styles.scss';

const { Option } = Select;
const { confirm } = Modal;

const dataTypes = ["", "Nhà đất bán", "Nhà đất cho thuê", "Cần thuê nhà đất", "Cần mua nhà đất", "Dự án"];

const UserListManage = (props) => {
    const { user } = props;
    const { listUsers = [] } = user;

    const [queryData, setQueryData] = useState({
        limit: 10,
        page: 1
    })

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            
            props.getAllUsers(queryData);
        }
    })

    useEffect(() => {
        props.getAllUsers(queryData);
    }, [queryData.page, queryData.limit])

    const columns = [
        {
            key: 'avatar',
            dataIndex: 'avatar',
            title: 'Ảnh',
            width: '5%',
            render: (data, record) => {
                return (
                    <div className="user-list-item-magage-avatar">
                        <img src={record.avatar} alt="" />
                    </div>
                );
            },
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Tên',
            width: '20%',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            key: 'email',
            dataIndex: 'email',
            title: 'Email',
            width: '20%',
        },
        {
            key: 'phone',
            dataIndex: 'phone',
            title: 'Số điện thoại',
            width: '15%',
        },
        {
            key: 'role',
            dataIndex: 'role',
            title: 'Quyền',
            width: '15%',
            render: (data, record) => {
                return (
                    <Select defaultValue={data} className="select-user-role" onChange={(value) => {props.updateUser(record._id, {role: value})}}>
                        <Option value={1}>
                            <badge className="badge-user-list badge-active">Chưa kích hoạt</badge>
                        </Option>
                        <Option value={2}>
                            <badge className="badge-user-list badge-user">Người dùng</badge>
                        </Option>
                        <Option value={3}>
                            <badge className="badge-user-list badge-admin">Admin</badge>
                        </Option>
                    </Select>
                )
            }
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày đăng ký',
            width: '15%',
            render: (data, record) => {
                return (
                    <span>{moment(new Date(data)).format("hh:mm - DD/MM/YYYY")}</span>
                )
            }
        },
        {
            key: 'actions',
            title: 'Hành động',
            width: 'auto',
            align: 'center',
            render: (data, record) => {
                return (
                    <div >
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            size='small'
                            onClick={() => { showConfirmDelete(record) }}
                        >
                        </Button>
                    </div>
                );
            },
        },
    ];

    const showConfirmDelete = (u) => {
        confirm({
            title: `Bạn có chắc chắn muốn xóa tài khoản "${u.name}" hay không?`,
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Xóa",
            cancelText: "Hủy",
            
            onOk() {
                // props.deleteCategory(cat._id)
            },
            onCancel() {},
        });
    }

    return <Container>
        {user.isLoading && <Loading />}
        <Container.Col colSpan={12}>
            <Card >
                <Card.Header>
                    Quản lý người dùng
                </Card.Header>
                <Card.Body>
                    {listUsers?.length !== 0 ?
                        <Table
                            columns={columns}
                            dataSource={listUsers}
                            pagination={false}
                        /> :
                        <Empty description="Không có dữ liệu"/>
                    }

                </Card.Body>
                <Card.Footer styles={{textAlign: "right"}}>
                    <Pagination
                        total={user.totalDocs}
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
    const { user } = state;
    return { user };
}

const mapDispatchToProps = {
    getAllUsers: UserActions.getAllUsers,
    updateUser: UserActions.updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListManage);