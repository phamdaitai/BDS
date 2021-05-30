import React from "react";
import { connect } from "react-redux";
import { FormatMoney } from '../../../../helpers/formatCurrency';
import { getFullAddress } from '../../../../helpers/formatAddress';

const dataDirection = ["", "Đông", "Tây", "Nam", "Bắc", "Đông Nam", "Đông Bắc", "Tây Nam", "Tây Bắc"];
const dataLegal = ["", "Sổ đỏ/sổ hồng", "Giấy tờ hợp lệ", "Giấy phép xây dựng", "Giấy phép kinh doanh"]

const Info = (props) => {
    const { postDetail } = props;

    
    return <React.Fragment>
        <h3 style={{color: "#0f78da"}}>Thông tin bất động sản</h3>

        <div className="post-detail-info">
            <div>
                <span>Giá:</span> &ensp;
                <span>{FormatMoney(postDetail.price)}</span>
            </div>

            <div>
                <span>Diện tích:</span> &ensp;
                <span>{postDetail.acreage} m<sup>2</sup></span>
            </div>

            <div>
                <span>Địa chỉ tài sản:</span> &ensp;
                 <span>{getFullAddress(postDetail?.address, postDetail.ward, postDetail.district, postDetail.province)}</span>
            </div>
        </div>

        <div className="post-detail-other-info">
            <div className="post-detail-other-info-title">
                <span>Các thông tin khác</span>
            </div>

            <div className="post-detail-other-info-table">
                <table>
                    <tbody>
                        <tr>
                            <td><span>Chiều ngang</span></td>
                            <td><span>{postDetail.width ? postDetail.width + " m" : "--"}</span></td>
                            <td><span>Chiều dài</span></td>
                            <td><span>{postDetail.length ? postDetail.length + " m" : "--"}</span></td>
                            <td><span>Hướng</span></td>
                            <td><span>{postDetail.direction ? dataDirection[postDetail.direction] : "--"}</span></td>
                        </tr>

                        <tr>
                            <td><span>Số lầu</span></td>
                            <td><span>{postDetail.floorNumber ? postDetail.floorNumber : "--" }</span></td>
                            <td><span>Số phòng ngủ</span></td>
                            <td><span>{postDetail.bedroomNumber ? postDetail.bedroomNumber : "--" }</span></td>
                            <td><span>Đường trước nhà</span></td>
                            <td><span>{postDetail.roadAhead ? postDetail.roadAhead + " m" : "--" }</span></td>
                        </tr>

                        <tr>
                            <td><span>Pháp lý</span></td>
                            <td><span>{postDetail.legal ? dataLegal[postDetail.legal] : "--"}</span></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </React.Fragment>
};

const mapStateToProps = state => {
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);