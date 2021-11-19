import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BACK_ADDRESS } from "../../utils/BackAddress";
import Header from "../../utils/Header";
import Footer from "../../utils/Footer";
import { Card } from 'react-bootstrap';
import { VscAccount } from 'react-icons/vsc';
import { Button } from "antd";

const SearchPage = ({ history, match }) => {
    const user = match.params.userName;
    const [searchText, setSearchText] = useState('');
    const [searchPeople, setsearchPeople] = useState([]);
    useEffect(() => {
        const body = {
            searchText: user,
        };
        axios.post(BACK_ADDRESS + '/main/search', body)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data.userInfo)
                    setsearchPeople(res.data.userInfo)
                } else {
                    alert('검색 실패');
                }
            });
    }, []);

    const renderPeople = searchPeople.map((human, idx) => {
        return (   
            <Card.Body style = {{width:'40rem', margin: 'auto'}} key={idx}>
            <Card.Header>
                <Card.Title style={{ fontWeight:'bold' }}> 
                    <p style={{ marginBottom:'10px' ,fontSize: '25px', fontWeight: 'bold'}}>
                        <VscAccount size='30'/> {human.name}
                    </p> 
                </Card.Title>
            </Card.Header>
            <Card.Text>
                {human.email}
            </Card.Text>
        </Card.Body>
        );
    });

    return (
        <>
        <center className="background">
        <Header style={{ margin: 'auto', width: '100%' }}></Header>
        <Card style={{ width: '60rem', margin:'auto', marginTop:'30px'}} text='black'> 
            <Card.Header style={{marginBottom:'0px' }}>
                <p style={{ marginBottom:'10px' ,fontSize: '25px', fontWeight: 'bold'}}>
                    사용자 목록
                </p>
            </Card.Header>

            {renderPeople}
        </Card>
        <Card style={{ width: '60rem', marginTop: '10px'}}>
            <Card.Body>
                <Card.Link onClick={() => history.push('/folio/me')}> My Page </Card.Link>
                <Card.Link onClick={() => history.push('/folio/me')}> Main </Card.Link>
            </Card.Body>
        </Card>
        <Footer/>
        </center>
        </>
    )
};

export default SearchPage;