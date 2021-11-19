import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";

import { BACK_ADDRESS } from "../../utils/BackAddress";
import Header from "../../utils/Header";
import Footer from "../../utils/Footer";
import styled from 'styled-components';
import { Card, Button, Input} from 'antd';
import { EditOutlined } from '@ant-design/icons';
// 추가
import MainWritingModal from '../../modals/MainWritingModal'
import MainModWritingModal from '../../modals/MainModWritingModal'

const MainPage = ({ history }) => {
    const [followWriting, setFollowWriting] = useState([]);
    const [recommendPeople, setRecommendPeople] = useState([]);
    const { userData } = useSelector(state => state.user);
    // 추가
    const [MainWritingModalOn, setMainWritingModalOn] = useState(false);
    const [MainModWritingModalOn, setMainModWritingModalOn] = useState(false);

    useEffect(() => {
        // 로그인 기록이 있는 경우, 팔로우한 사람들의 게시글 요청
        if (userData) {
            const body = {
                email: userData.email,
            };
            
            // 1. 팔로우 목록의 글 불러오기
            axios.post(BACK_ADDRESS + '/main/writing', body)
                .then(res => {
                    if (res.data.success) {
                        console.log(res.data.writings);
                        setFollowWriting(res.data.writings);
                    } else {
                        alert('글 불러오기 실패');
                    }
                });

            // 2. 내 기술스택과 같은 기술스택을 보유한 사람 추천
            axios.post(BACK_ADDRESS + '/main/recommend', body)
                .then(res => {
                    if (res.data.success) {
                        console.log(res.data.people);
                        setRecommendPeople(res.data.people);
                    } else {
                        alert('추천인 불러오기 실패');
                    }
                });
            
        }
    }, []);

    const renderPeople = recommendPeople.map((human, idx) => {
        return (
            <Card style={{ width: '80%', marginTop: 16, borderRadius: '0.5rem' }} key={idx} title={human.name} size="small" onClick={() => history.push('/folio/user?email='+human.email)}>
                <div>{human.email}</div>
            </Card>
        );
    });

    const renderWriting = followWriting.map((writing, idx) => {
        return (
            <div style={{ marginBottom: '20px', backgroundColor: 'white', borderRadius: '0.5rem' }} key={idx}>
                <div style={{ margin: '0 10px 0 10px' }}>
                    <div style={{ float: 'left' }}>{writing.email}</div>
                    <div style={{ float: 'right' }}>
                        {/* 내가 쓴 글일 때만 수정 버튼 나타남 */}
                        {userData.email === writing.email &&
                            <Button
                                style={{ marginTop: '5px', marginLeft: '9px' }}
                                type='dashed'
                                shape='round'
                                size='middle'
                                onClick={() => setMainModWritingModalOn(true)}
                            >수정</Button>
                        }
                    </div>
                </div>
                <br />
                <br />
                <div style={{ display:'inline-block' }}>{writing.text}</div>
                <br />
                <div style={{ float: 'right' }}>{writing.date}</div>
                <br />
            </div>
        )
    });

    const onClickNewWriting = () => {
        if (userData) {
            setMainWritingModalOn(true);
        } else {
            alert('로그인해주세요!');
        }
    };

    const RecommendPeopleArea = styled.div`
        width: 20%;
        float: left;
        align-items: center;
        background-color: lightgray;
        color: black;
        margin: 50px 0 0 50px;
        border-radius: 15px;
    `;

    const RecommendPeopleBox = styled.div`
        margin: 0 0 50px 0;
    `;

    const WritingArea = styled.div`
        width: 70%;
        float: left;
        align-items: center;
        background-color: lightgray;
        color: black;
        margin: 50px 0 0 30px;
        border-radius: 10px;
    `;

    const WritingAreaNoLogin = styled.div`
        width: 90%;
        align-items: center;
        background-color: lightgray;
        color: black;
        margin: 50px 0 0 50px;
        border-radius: 10px;
    `;

    const WritingBox = styled.div`
        width: 90%;
        margin: 50px 0 50px 0;
    `;

    return (
        <center className="background">
            {/* 글쓰기, 수정 모달 추가 */}
            <MainWritingModal show={MainWritingModalOn} onHide={() => setMainWritingModalOn(false)} />
            <MainModWritingModal show={MainModWritingModalOn} onHide={() => setMainModWritingModalOn(false)} />

            {/* 고정 바 */}
            <Header style={{ margin: 'auto', width: '100%' }}></Header>

            {/* 수정 -> 로그인 여부에 따른 추천 화면 보여짐 */} 
            {/* 로그인 기록이 있는 경우: 
            왼쪽: 회원님을 위한 추천 보여짐 */}
            {/* 수정 -> WritingArea style 추가 */} 
            {/* 오른쪽 : 글 관련 부분 */}
            {userData &&
                <div>
                    <RecommendPeopleArea>
                        <div style={{ marginTop: '30px' }}>회원님을 위한 추천</div>
                        <RecommendPeopleBox>
                            {renderPeople}
                        </RecommendPeopleBox>
                    </RecommendPeopleArea>
                    <WritingArea>
                        <WritingBox>
                            {/* 위 : 글 올리기 부분 */}
                            {/* 추가 -> 클릭 시 모달 실행, 로그인 여부에 따른 모달창 */}
                            <Input size="large" placeholder="새로운 글 작성" prefix={<EditOutlined />} style={{ marginBottom: '50px' }} onClick={onClickNewWriting}/>
                            
                            {/* 밑 : 내가 팔로우한 사람의 글과 댓글 작성 부분 */}
                            {renderWriting}
                        </WritingBox>
                    </WritingArea>
                </div>
            }
            
            {!userData &&
                <WritingAreaNoLogin>
                    <br />
                    <WritingBox style={{ marginTop: '30px', marginBottom: '30px' }}>
                        {/* 위 : 글 올리기 부분 */}
                        {/* 추가 -> 클릭 시 모달 실행, 로그인 여부에 따른 모달창 */}
                        <Input size="large" placeholder="새로운 글 작성" prefix={<EditOutlined />} style={{ marginBottom: '50px' }} onClick={onClickNewWriting}/>
                        
                        {/* 밑 : 내가 팔로우한 사람의 글과 댓글 작성 부분 */}
                        {renderWriting}
                    </WritingBox>
                    <br />
                </WritingAreaNoLogin>
            }
            <Footer/>
        </center>
    );
};

export default MainPage;