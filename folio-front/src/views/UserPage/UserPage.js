import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { useSelector } from "react-redux";
import { BACK_ADDRESS } from "../../utils/BackAddress";
import Header from "../../utils/Header";
import Footer from "../../utils/Footer";
import { Card, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'
import { VscAccount } from 'react-icons/vsc';
import { Table } from "antd";

const UserPage = ({ history, match }) => {
    const userEmail = match.params.userEmail;
    const [userInfo, setUserInfo] = useState({});
    const [stacks, setStacks] = useState([]);
    const [intro, setIntro] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [workData, setWorkData] = useState([]);
    const { userData } = useSelector(state => state.user);

    useEffect(() => {
        const body = {
            email: userEmail,
        };

        // 해당 사용자 프로필 검색
        axios.post(BACK_ADDRESS + '/user/info', body)
            .then(res => {
                if (res.data.success) {
                    console.log('사용자 정보 가져오기 성공');
                    console.log(res.data.user);
                    setUserInfo(res.data.user);
                    // 해당 사용자 포트폴리오 검색
                    axios.post(BACK_ADDRESS + '/folio', body)
                        .then(res => {
                            if (res.data.success) {
                                if (res.data.success) {
                                    console.log('사용자 포트폴리오 가져오기 성공');
                                    const folio = res.data.folio;
                                    console.log(folio);
                                    setStacks(folio.stacks);
                                    setIntro(folio.intro);
                                    setGithubLink(folio.githubLink);
                                    setWorkData(folio.workData);
                                }
                            } else {
                                alert('사용자 포트폴리오 가져오기 실패');
                            }
                        });
                } else {
                    alert('사용자 정보 가져오기 실패');
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

    const renderStacks = stacks.map((stack, idx) => {
        return (
            <span key={idx}> {stack}</span>
        );
    });

    return (
        <>
         <center className="background">
         <Header style={{ margin: 'auto', width: '100%' }}></Header>
         <Card style={{ width: '70rem', margin:'auto', marginTop:'30px'}} text='black'>
            
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#first">
                <Nav.Item>
                    <Nav.Link href="#first" onClick={() => history.push('/folio/user' + userEmail)}>포트폴리오</Nav.Link>
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
                <Card.Title style={{fontWeight:'bold'}}>{userInfo.name}님의 소개</Card.Title>
                <Card.Text>
                    <ReactMarkdown children={intro} />
                </Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Title style={{fontWeight:'bold'}}>기술/스택</Card.Title>
                <Card.Text>
                    {renderStacks}
                </Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Title style={{fontWeight:'bold'}}>경력사항</Card.Title>
                <Table columns={columns} dataSource={workData} style={{width: '40rem'}} />
            </Card.Body>
            <Card.Body>
                <Card.Title style={{fontWeight:'bold'}}>깃 허브</Card.Title>
                <a target="_blank" href={githubLink}>Go to GitHub</a>
                <Link to = {githubLink}/>
                <br/>
                <br/>
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