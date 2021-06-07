import React, {useState} from "react";
import { connect } from "react-redux";
import { Form, Select, Radio } from 'antd';

import { FormatMoney } from '../../../../../helpers/formatCurrency';
import { FeeActions } from '../../../../fee/redux/actions';

import './styles.scss';

const { Option } = Select;

const VIP = (props) => {
    const { listFees = [] } = props.fee;

    const [queryData] = useState({
        limit: 1000,
        page: 1
    })

    return <React.Fragment>
        <div className="post-add-item-header-map post-add-item-header">
            <span>Bài đăng VIP</span>
        </div>
        <p style={{ color: "#d33320", marginBottom: "1.5rem" }}>Mua gói VIP sẽ giúp bài đăng của bạn xuất hiện trên trang đầu,
        gói VIP càng cao bài đăng càng được ưu tiên</p>
        
        <Form.Item
            name="vipType"
            label="Loại gói VIP"
        >
            <Select onChange={(value) => props.getAllFees({...queryData, type: value })}>
                <Option value={1}>Gói VIP 1 ngày</Option>
                <Option value={2}>Gói VIP 30 ngày</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="vipPoint"
        >
            <Radio.Group>
                {listFees.map(f => (
                    <Radio value={f.point} key={f._id}>
                        <b>{f.name}</b> &ensp;
                        <span style={{color: "red"}}>{FormatMoney(f.fee)}</span>
                    </Radio>
                ))}
            </Radio.Group>
        </Form.Item>
    </React.Fragment>
}

const mapStateToProps = state => {
    const { fee } = state;
    return { fee };
}

const mapDispatchToProps = {
    getAllFees: FeeActions.getAllFees
}

export default connect(mapStateToProps, mapDispatchToProps)(VIP);