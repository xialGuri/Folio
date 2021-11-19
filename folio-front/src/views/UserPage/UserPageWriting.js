import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BACK_ADDRESS } from "../../utils/BackAddress";
import Header from "../../utils/Header";
import Footer from "../../utils/Footer";
import { Card, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'
import { VscAccount } from 'react-icons/vsc';

const UserPage = ({ history, match }) => {
    const userEmail = match.params.userEmail;
    const [userInfo, setUserInfo] = useState({});
    const [writings, setWritings] = useState([]);
    const { userData } = useSelector(state => state.user);

    useEffect(() => {
        const body = {
            email: userEmail,
        };

        // 해당 사용자 검색
        axios.post(BACK_ADDRESS + '/user/info', body)
            .then(res => {
                if (res.data.success) {
                    console.log('사용자 정보 가져오기 성공');
                    console.log(res.data.user);
                    setUserInfo(res.data.user);
                    // 해당 사용자 게시글 검색
                    axios.post(BACK_ADDRESS + '/main/writing/user', body)
                        .then(res => {
                            if (res.data.success) {
                                console.log('사용자 게시글 가져오기 성공');
                                console.log(res.data.writings);
                                setWritings(res.data.writings);
                            } else {
                                alert('사용자 게시글 가져오기 실패');
                            }
                        });
                } else {
                    alert('사용자 정보 가져오기 실패');
                }
            });
    }, []);

    const onClickFollowButton = () => {
        if (!userData) {
            return alert('로그인부터 해주세요.');
        }

        const body = {
            myEmail: userData.email,
            userEmail: userEmail,
        };

        axios.post(BACK_ADDRESS + '/user/follow', body)
            .then(res => {
                if (res.data.success) {
                    // 팔로우를 할 경우
                    if (res.data.new) {
                        alert('팔로우');
                    }
                    // 팔로우 취소를 할 경우
                    else {
                        alert('팔로우 취소');
                    }
                } else {
                    alert('팔로우 실패');
                }
            });
    };
    
    const renderWriting = writings.map((writing, idx) => {
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
                    <Nav.Link href="#first" onClick={() => history.push('/folio/user/' + userEmail)}>포트폴리오</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#second" onClick={() => history.push('/folio/user/writing/' + userEmail)}>게시글</Nav.Link>
                </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Header style={{marginBottom:'0px' }}>
                <p style={{ marginBottom:'10px' ,fontSize: '25px', fontWeight: 'bold'}}>
                    <VscAccount size='30'/> {userInfo.name}
                </p>
                <Card.Subtitle style = {{fontSize:'20px'}}className="mb-2 text-muted">
                    ({userEmail})
                </Card.Subtitle>
                <Button onClick={onClickFollowButton}>Follow</Button>
            </Card.Header>
            <Card.Body>
                <Card.Title style={{fontWeight:'bold'}}>{userInfo.name}님의 게시글</Card.Title>
                <Card.Text>
                {renderWriting}
                </Card.Text>
            </Card.Body>
            </Card>
            <Card style={{ width: '70rem', marginTop: '10px'}}>
                <Card.Body>
                    <Card.Link onClick={() => history.push('/folio/me')}> My Page </Card.Link>
                    <Card.Link onClick={() => history.push('/')}> Main </Card.Link>
                </Card.Body>
            </Card>
            <Footer/>
        </center>
        </>
    )
};

export default UserPage;