import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";
import { Layout } from "antd";

const { Header } = Layout;

const Headers = () => {
    return <Header className="header" style={{ lineHeight: "55px", height: "55px" }}></Header>;
};

export default Headers;
