import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
import { Input, Button } from "antd";
import { CommentOutlined, UserOutlined, CodeOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { BACK_ADDRESS } from "./BackAddress";
import SignUpModal from '../modals/SignUpModal'
import SignInModal from '../modals/SignInModal'
import { Card } from 'react-bootstrap';

const { Search } = Input;

const Header = ({ history }) => {
    // 회원가입
    const [signUpModalOn, setSignUpModalOn] = useState(false);
    // 로그인
    const [signInModalOn, setSignInModalOn] = useState(false);
    const [searchText, setSearchText] = useState('');
    
    const { userData } = useSelector(state => state.user);

    const onChangeSearch = (e) => {
        setSearchText(e.target.value);
    };

    const onSearch = (e) => {
        const body = {
            searchText: searchText,
        };

        axios.post(BACK_ADDRESS + '/main/search', body)
            .then(res => {
                if (res.data.success) {
                    console.log('검색 성공');
                    console.log(res.data.userInfo);
                    history.push('/folio/search?name='+e)
                } else {
                    alert("검색 실패");
                }
            });
    };

    const messageButtonStyle = useMemo(() => ({
        marginTop: '20px',
        marginLeft: 'auto',
        backgroundColor: '#47555e',
        color: 'white',
    }), []);
    const mypageButtonStyle = useMemo(() => ({
        marginTop: '20px',
        marginRight: '10px',
        backgroundColor: '#47555e',
        color: 'white',
    }), []);
    const searchStyle = useMemo(() => ({
        width: '80%',
        flex: 1,
    }), []);
    const logoStyle = useMemo(() => ({
        marginRight: '10px',
        color: 'white',
        flex: 1,
    }), []);
    const LogStyle = useMemo(() => ({
        marginTop: '20px',
        marginLeft: 'auto',
        backgroundColor: '#47555e',
        color: 'white',
    }),[])

    return (
        <>
            {/* 로그인, 회원가입 */}
            <SignUpModal show = {signUpModalOn} onHide={()=>setSignUpModalOn(false)}/>
            <SignInModal show = {signInModalOn} onHide={()=>setSignInModalOn(false)}/>

            {/* 로그인, 로그아웃, 메시지, 마이페이지 버튼 */}
            {/* 로그인 기록이 있는 경우, 로그아웃 버튼 생성, 메시지와 마이페이지로 가는 버튼이 제대로 동작 */}
            {userData !== null &&
                <div style={{ float: 'right' }}>
                    <Card.Link href="/"><Button style={LogStyle}><LogoutOutlined /></Button></Card.Link>
                    <Link to="/message"><Button style={messageButtonStyle}><CommentOutlined /></Button></Link>
                    <Link to="/folio/me"><Button style={mypageButtonStyle}><UserOutlined /></Button></Link>
                </div>
            }

            {/* 로그인 기록이 없는 경우, 로그인 버튼 생성, 메시지와 마이페이지로 가는 버튼이 제대로 동작하지 않음 */}
            {userData === null &&
                <div style={{ float: 'right' }}>
                    <Button style={LogStyle} onClick = {() => setSignInModalOn(true)}><LoginOutlined /></Button>
                    <Button style={messageButtonStyle} onClick = {() => setSignInModalOn(true)}><CommentOutlined /></Button>
                    <Button style={mypageButtonStyle} onClick = {() => setSignInModalOn(true)}><UserOutlined /></Button>
                </div>
            }
            <br />
            <br />
            <center>
                {/* 로고 */}
                <Link to="/"><CodeOutlined style={logoStyle} /></Link>

                {/* 검색어 입력 */}
                <Search
                    value={searchText}
                    onChange={onChangeSearch}
                    placeholder="검색어를 입력하세요"
                    onSearch={onSearch}
                    style={searchStyle}
                    enterButton
                ></Search>
            </center>
        </>
    );
};

export default withRouter(Header);