import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BACK_ADDRESS } from "../../utils/BackAddress";
import Header from "../../utils/Header";
import Footer from "../../utils/Footer";
import { Card } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'
import { VscAccount } from 'react-icons/vsc';

const UserPage = ({ history }) => {
    const { userData } = useSelector(state => state.user);
    const [followWriting, setFollowWriting] = useState([]);

    useEffect(() => {
        const body = {
            email: userData.email,
        };

        axios.post(BACK_ADDRESS + '/main/writing', body)
        .then(res => {
            if (res.data.success) {
                console.log(res.data.writings);
                setFollowWriting(res.data.writings);
            } else {
                alert('글 불러오기 실패');
            }
        });
    }, []);
    
    const renderWriting = followWriting.map((writing, idx) => {
        return (
            <div style={{ marginBottom: '20px', backgroundColor: 'white', borderRadius: '0.5rem' }} key={idx}>
                <br />
                <br />
                <div style={{ display:'inline-block' }}>{writing.text}</div>
                <br />
                <div style={{ float: 'auto' }}>{writing.date}</div>
                <br />
            </div>
        )
    });

    return (
        <>
         <center className="background">
         <Header style={{ margin: 'auto', width: '100%' }}></Header>
         <Card style={{ width: '70rem', margin:'auto', marginTop:'30px'}} text='black'> 
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#first">
                <Nav.Item>
                    <Nav.Link href="#first" onClick={() => history.push('/folio/user')}>포트폴리오</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#second" onClick={() => history.push('/folio/user/writing')}>게시글</Nav.Link>
                </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Header style={{marginBottom:'0px' }}>
                <p style={{ marginBottom:'10px' ,fontSize: '25px', fontWeight: 'bold'}}>
                    <VscAccount size='30'/> 이아현
                </p>
                <Card.Subtitle style = {{fontSize:'20px'}}className="mb-2 text-muted">
                    (LAH@naver.com)
                </Card.Subtitle>
            </Card.Header>
            <Card.Body>
                <Card.Title style={{fontWeight:'bold'}}>아현님의 게시글</Card.Title>
                <Card.Text>
                {renderWriting}
                </Card.Text>
            </Card.Body>
            </Card>
            <Card style={{ width: '70rem', marginTop: '10px'}}>
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

export default UserPage;