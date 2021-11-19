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

const UserPage = ({ history }) => {
    const { userData } = useSelector(state => state.user);
    const [workData, setWorkData] = useState([]);

    useEffect(() => {
        const body = {
            email: userData.email,
        };
        axios.post(BACK_ADDRESS + '/folio', body)
            .then(res => {
                if (res.data.success) {
                    if (res.data.folio) {
                        console.log('내 포트폴리오 가져오기 성공');
                        const folio = res.data.folio;
                        setWorkData(folio.workData);
                    }
                } else {
                    alert('내 포트폴리오 가져오기 실패');
                }
            });
    }, []);

    const columns = [
        {
            title: 'No.',
            dataIndex: 'No',
            key: 'No',
        },
        {
            title: '회사명',
            dataIndex: '회사명',
            key: '회사명',
        },
        {
            title: '직무',
            dataIndex: '직무',
            key: '직무',
        },
        {
            title: '기간',
            dataIndex: '기간',
            key: '기간',
        }
    ];
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
                <Card.Title style={{fontWeight:'bold'}}>아현님의 소개</Card.Title>
                <Card.Text>
                    안녕하세요!
                </Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Title style={{fontWeight:'bold'}}>기술/스택</Card.Title>
                <Card.Text>
                    Node.js, Android Studio, React, Java, Python
                </Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Title style={{fontWeight:'bold'}}>경력사항</Card.Title>
                <Table columns={columns} dataSource={workData} style={{width: '40rem'}} />
            </Card.Body>
            <Card.Body>
                <Card.Title style={{fontWeight:'bold'}}>깃 허브</Card.Title>
                <a target="_blank" href='https://github.com/LAH1203'>Go to GitHub</a>
                <Link to = 'https://github.com/LAH1203'/>
                <br/>
                <br/>
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