import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";

import { BACK_ADDRESS } from "../../utils/BackAddress";
import Header from "../../utils/Header";

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
    //추가
    const [MainWritingModalOn, setMainWritingModalOn] = useState(false);
    const [MainModWritingModalOn, setMainModWritingModalOn] = useState(false);

    // 추천 사람 임시 데이터
    const people = [
        {
            name: '이아현',
            stack: 'React, Node.js',
        },
        {
            name: '나동현',
            stack: 'React',
        },
    ];

    // 게시글 임시 데이터
    const writings = [
        {
            title: '게시글 1',
            author: 'OOO',
            content: '게시글 1의 내용',
        },
        {
            title: '게시글 2',
            author: 'XXX',
            content: '게시글 2의 내용',
        },
    ]

    useEffect(() => {
        // 로그인 기록이 있는 경우, 팔로우한 사람들의 게시글 요청
        if (userData !== null) {
            // 1. 팔로우 목록의 글 불러오기
            const body = {
                email: userData.email,
            };

            axios.post(BACK_ADDRESS + '/main/writing', body)
                .then(res => {
                    if (res.data.success) {
                        console.log(res.data.writing);
                        setFollowWriting(res.data.writing);
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

    const renderPeople = people.map((human, idx) => {
        return (
            <Card style={{ width: '80%', marginTop: 16, borderRadius: '0.5rem' }} key={idx} title={human.name} size="small">
                <div style={{ marginBottom: '10px' }}>{human.stack}</div>
                <Button>Follow</Button>
            </Card>
        )
    });
    // 수정 버튼 추가
    const renderWriting = writings.map((writing, idx) => {
        return (
            <div style={{ marginBottom: '20px', backgroundColor: 'white', borderRadius: '0.5rem' }} key={idx}>
                <div style={{ margin: '0 10px 0 10px' }}>
                    <div style={{ fontSize: '30px', float: 'left' }}>{writing.title}</div>
                    <div style = {{float:'right'}}>
                        {userData !== null &&
                        <Button style = {{marginTop:'5px',marginLeft:'9px'}} type='dashed' shape = 'round' size='middle' onClick = {() => setMainModWritingModalOn(true)}>수정</Button>
                        }
                    </div>
                    <div style={{ float: 'right', marginTop:'8px' }}>작성자: {writing.author}</div>
                </div>
                <br />
                <br />
                <div style = {{display:'inline-block'}} > {writing.content} </div>
            </div>
        )
    })

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

    const WritingBox = styled.div`
        width: 90%;
        margin: 50px 0 50px 0;
    `;

    return (
        <center className="background">
            {/* 글쓰기, 수정 모달 추가 */}
            <MainWritingModal show = {MainWritingModalOn} onHide={()=>setMainWritingModalOn(false)}/>
            <MainModWritingModal show = {MainModWritingModalOn} onHide={()=>setMainModWritingModalOn(false)}/>

            {/* 고정 바 */}
            <Header style={{ margin: 'auto', width: '100%' }}></Header>

            {/* 수정 -> 로그인 여부에 따른 추천 화면 보여짐 */} 
            {/* 로그인 기록이 있는 경우: 
            왼쪽: 회원님을 위한 추천 보여짐 */}           
            {userData !== null &&
                <RecommendPeopleArea>
                <div style={{ marginTop: '30px' }}>회원님을 위한 추천</div>
                <RecommendPeopleBox>
                    {renderPeople}
                </RecommendPeopleBox>
            </RecommendPeopleArea>
            }

            {/* 수정 -> 로그인 여부에 따른 추천 화면 보여짐 */} 
            {/* 로그인 기록이 없는 경우: 
            왼쪽: 회원님을 위한 추천 사라짐 or 화면 바뀜  */}           
            {userData == null &&
                <RecommendPeopleArea>
                <div style={{ marginTop: '30px' }}>회원님을 위한 추천</div>
                <RecommendPeopleBox>
                    {renderPeople}
                </RecommendPeopleBox>
            </RecommendPeopleArea>
            }

            {/* 수정 -> WritingArea style 추가 */} 
            {/* 오른쪽 : 글 관련 부분 */}
            <WritingArea>
                <WritingBox>
                    {/* 위 : 글 올리기 부분 */}
                    {/* 추가 -> 클릭 시 모달 실행, 로그인 여부에 따른 모달창 */}

                    {userData == null &&
                    <Input size="large" placeholder="새로운 글 작성" prefix={<EditOutlined />} style={{ marginBottom: '50px' }} onClick = {() => alert('로그인 해주세요.')}/>
                    }

                    {userData !== null &&
                    <Input size="large" placeholder="새로운 글 작성" prefix={<EditOutlined />} style={{ marginBottom: '50px' }} onClick = {() => setMainWritingModalOn(true)}/>
                    }
                    
                    {/* 밑 : 내가 팔로우한 사람의 글과 댓글 작성 부분 */}
                    {renderWriting}
                </WritingBox>
            </WritingArea>
        </center>
    );
};

export default MainPage;