import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BACK_ADDRESS } from "../../utils/BackAddress";
import Header from "../../utils/Header";
import Footer from "../../utils/Footer";
import { Card, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'
import { VscAccount } from 'react-icons/vsc';
import { Table } from "antd";

const SearchPage = ({ history }) => {
    return (
        <>
        <center className="background">
        <Header style={{ margin: 'auto', width: '100%' }}></Header>
        <Card style={{ width: '70rem', margin:'auto', marginTop:'30px'}} text='black'> 
            <Card.Header style={{marginBottom:'0px' }}>
                <p style={{ marginBottom:'10px' ,fontSize: '25px', fontWeight: 'bold'}}>
                    사용자 목록
                </p>
            </Card.Header>
            <Card.Body>
                <Card.Title style={{fontWeight:'bold'}}></Card.Title>
                <Card.Text>
                </Card.Text>
            </Card.Body>
            </Card>
            <Card style={{ width: '70rem', marginTop: '10px'}}>
                <Card.Body>
                    <Card.Link onClick={() => history.push('/folio/me')}> My Page </Card.Link>
                    <Card.Link onClick={() => history.push('/folio/me')}> Main </Card.Link>
                </Card.Body>
            </Card>
        </center>
        </>
    )
};

export default SearchPage;