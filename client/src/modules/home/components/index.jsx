import React from "react";
import { connect } from "react-redux";


const Home = (props) => {
    
    return <div> Trang chủ </div>
};

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
