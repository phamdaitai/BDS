import React from "react";
import { connect } from "react-redux";

import './styles.scss';

const Map = (props) => {

    return <React.Fragment>
        <div className="post-add-item-header-map post-add-item-header">
            <span>Bản đồ</span>
        </div>
        <p style={{color: "#d33320", marginBottom: "1.5rem"}}>Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn,
            hãy chọn vị trí rao bán của bạn trên bản đồ</p>
        


    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(Map);