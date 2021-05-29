import React, {useState} from "react";
import { connect } from "react-redux";
import { Button,  Modal, Form, Input, Select, InputNumber } from 'antd';

const { Option } = Select;

const dataTypes = ["", "Nhà đất bán", "Nhà đất cho thuê", "Cần thuê nhà đất", "Cần mua nhà đất", "Dự án"];

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const AddForm = (props) => {
    const { fee, visible, setVisible, submitAddForm } = props;

    return <Modal
        title="Thêm mức phí VIP"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
    >
        <Form
            {...layout}
            name="basic"
            onFinish={ submitAddForm}
        >
            <Form.Item
                name="name"
                label="Tên gói"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên gói',
                    },
                ]}
            >
                <Input placeholder="Ví dụ: VIP 1" />
            </Form.Item>

            <Form.Item
                name="fee"
                label="Mức phí"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập mức phí',
                },
                ]}
            >
                <InputNumber
                    placeholder="Ví dụ: 1.000"
                    style={{ width: "100%" }}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
            </Form.Item>

            <Form.Item
                name="type"
                label="Loại"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn loại phí',
                    },
                ]}
            >
                <Select placeholder="Chọn loại phí">
                    <Option value={1}>Gói 01 ngày</Option>
                    <Option value={2}>Gói 30 ngày</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="point"
                label="Trọng số"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trọng số',
                    },
                ]}
            >
                <InputNumber
                    placeholder="Ví dụ: 1"
                    style={{ width: "100%" }}
                />
            </Form.Item>
            
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={fee.isLoading}>
                    Thêm mới
                </Button>
            </Form.Item>
        </Form>
    </Modal>
};

const mapStateToProps = state => {
    const { fee } = state;
    return { fee };
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
