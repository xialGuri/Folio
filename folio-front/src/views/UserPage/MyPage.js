import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactMarkdown from 'react-markdown';
import { BACK_ADDRESS } from "../../utils/BackAddress";
import styled from 'styled-components';
import Header from "../../utils/Header";
import Footer from "../../utils/Footer";
import { Button, Card } from 'react-bootstrap';
import { VscAccount } from 'react-icons/vsc';
import profileBackground from '../../images/ProfileBackground.jpg';
import { Table } from "antd";

const MyPage = ({ history }) => {
    const [stacks, setStacks] = useState([]);
    const [intro, setIntro] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [workData, setWorkData] = useState([]);
    const [followPeople, setFollowPeople] = useState([]);
    const { userData } = useSelector(state => state.user);

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
                        setStacks(folio.stacks);
                        setWorkData(folio.workData);
                        setIntro(folio.intro);
                        setGithubLink(folio.githubLink);
                        // 내 팔로우 목록 가져오기
                        axios.post(BACK_ADDRESS + '/user/follower', body)
                            .then(res => {
                                if (res.data.success) {
                                    console.log('팔로워 목록 가져오기 성공');
                                    console.log(res.data.people);
                                    setFollowPeople(res.data.people);
                                } else {
                                    alert('팔로우 목록 가져오기 실패');
                                }
                            });
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

    const renderFollowers = followPeople.map((human, idx) => {
        return (
            <div>
                <Card.Title style={{fontWeight:'bold', margin:'auto'}} key={idx}>
                    <p style={{ marginBottom:'10px' ,fontSize: '20px', fontWeight: 'bold'}}>
                        <VscAccount size='20'/> <Link to={'/folio/user/' + human.email}>{human.name}</Link>
                    </p>
                    <Card.Subtitle style = {{fontSize:'15px'}}className="mb-2 text-muted">
                        ({human.email})
                    </Card.Subtitle>
                </Card.Title>
                {idx !== followPeople.length - 1 && <br />}
            </div>
        );
    });

    const renderStacks = stacks.map((stack, idx) => {
        return (
            <span key={idx}> {stack}</span>
        );
    });

    return (
        <>
        <center className="background">
            <Header style={{ margin: 'auto', width: '100%' }}></Header>
            <div>
            
            </div>   
            <div>
                <div>
                    <Card style={{ width: '15rem', marginTop: '30px',float:'left', marginLeft:'20px',marginRight:'31px' }} text='black'>
                        <Card.Header style={{marginBottom:'0px', fontSize:'25px' }}>
                            팔로워 목록
                        </Card.Header>
                        <Card.Body>
                            {renderFollowers}
                        </Card.Body>
                    </Card>
                </div>
                <Button 
                    style={{marginTop:'30px', marginBottom: '30px', width:'50rem'}} 
                    variant='outline-light'
                    size='lg'
                    onClick={() => history.push('/folio/writing')}
                >
                    포트폴리오 작성하기
                </Button> 
                <div>
                    <Card style={{ width: '50rem', marginTop: '0px' }} text='black'>
                        <Card.Img variant="top" src={profileBackground} />
                        <Card.Header style={{marginBottom:'0px' }}>
                            <p style={{ marginBottom:'10px' ,fontSize: '25px', fontWeight: 'bold'}}>
                            <VscAccount size='30'/> {userData.name}</p>
                            <Card.Subtitle style = {{fontSize:'20px'}} className="mb-2 text-muted">({userData.email})</Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title style={{fontWeight:'bold', marginRight:'880px'}}>내 소개</Card.Title>
                            <br/>
                            <Card.Text style={{float:'left'}}>
                            <ReactMarkdown children={intro} />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <div style={{ width: '15rem', marginTop: '30px',float:'left', marginLeft:'20px',marginRight:'31px' }}></div>
                    <Card style={{ width: '50rem', marginTop: '10px' }} text='black'>
                        <Card.Body>
                            <Card.Title style={{fontWeight:'bold', marginRight:'800px'}}>내 기술 / 스택</Card.Title>
                            <br/>
                            <Card.Text style={{float: 'left'}}>
                            {renderStacks}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <div style={{ width: '15rem', marginTop: '30px',float:'left', marginLeft:'20px',marginRight:'31px' }}></div>
                    <Card style={{ width: '50rem', marginTop: '10px' }} text='black'>
                        <Card.Body>
                            <Card.Title style={{fontWeight:'bold', marginRight:'850px'}}>경력 사항</Card.Title>
                            <br/>
                            <Table columns={columns} dataSource={workData} />
                        </Card.Body>
                    </Card>
                    <div style={{ width: '15rem', marginTop: '30px',float:'left', marginLeft:'20px',marginRight:'31px' }}></div>
                    <Card style={{ width: '50rem', marginTop: '10px' }} text='black'>
                        <Card.Body>
                            <Card.Title style={{fontWeight:'bold', marginRight:'840px'}}>내 깃 허브</Card.Title>
                            <br/>
                            <Card.Text style={{float:'left'}}>
                            <a target="_blank" href={githubLink}>Go to my GitHub</a>
                            <Link to = {githubLink} />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <div style={{ width: '15rem', marginTop: '30px',float:'left', marginLeft:'20px',marginRight:'31px' }}></div>
                    <Card style={{ width: '50rem', marginTop: '10px' }} text='black'>
                        <Card.Body>
                            <Card.Link href="/">Logout</Card.Link>
                            <Link to="/" style={{marginLeft:'10px'}}>Main</Link>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <Footer/>
        </center>
        </>
    )
};

export default MyPage;