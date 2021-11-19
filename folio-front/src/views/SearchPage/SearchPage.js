import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BACK_ADDRESS } from "../../utils/BackAddress";
import Header from "../../utils/Header";
import Footer from "../../utils/Footer";
import { Card } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'
import { VscAccount } from 'react-icons/vsc';
import { Table, Button } from "antd";

const SearchPage = ({ history }) => {

    // const renderStacks = stacks.map((stack, idx) => {
    //     return (
    //         <Button key={idx} style={{ height: '40px' }}>{stack}<a id={stack} onClick={removeStack}>X</a></Button>
    //     );
    // });
    
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
            <Card bg="Secondary" style={{ width: '100rem' }}>
                <Card.Body>
                    <Card.Title style={{fontWeight:'bold'}}> 
                    <p style={{ marginBottom:'10px' ,fontSize: '25px', fontWeight: 'bold'}}>
                        <VscAccount size='30'/> 나동현 (1@naver.com)
                    </p> </Card.Title>
                    <Card.Text>
                        <Button style={{ height: '40px' }}>python</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
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