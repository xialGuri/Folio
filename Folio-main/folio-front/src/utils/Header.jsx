import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Input, Button } from "antd";
import { CommentOutlined, UserOutlined, CodeOutlined } from '@ant-design/icons';
import { BACK_ADDRESS } from "./BackAddress";
import SignUpModal from '../modals/SignUpModal'
import SignInModal from '../modals/SignInModal'

const { Search } = Input;

const Header = () => {
    // 회원가입(추가)
    const [signUpModalOn, setSignUpModalOn] = useState(false);
    // 로그인(추가)
    const [signInModalOn, setSignInModalOn] = useState(false);
    const [searchText, setSearchText] = useState('');
    
    const { userData } = useSelector(state => state.user);

    const onChangeSearch = (e) => {
        setSearchText(e.target.value);
    };

    const onSearch = () => {
        const body = {
            searchText: searchText,
        };

        axios.post(BACK_ADDRESS + '/search', body)
            .then(res => {
                if (res.data.success) {
                    console.log('검색 성공');
                } else {
                    console.log('검색 실패');
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

    return (
        <>
            {/* sign up, in 부분(추가) */}
            <SignUpModal show = {signUpModalOn} onHide={()=>setSignUpModalOn(false)}/>
            <SignInModal show = {signInModalOn} onHide={()=>setSignInModalOn(false)}/>

            {/* 메시지, 마이페이지 버튼 */}

            {/* 로그인 기록이 있는 경우, 메시지와 마이페이지로 가는 버튼이 제대로 동작 */}
            {userData !== null &&
                <div style={{ float: 'right' }}>
                    <Link to="/message"><Button style={messageButtonStyle}><CommentOutlined /></Button></Link>
                    <Link to="/folio/me"><Button style={mypageButtonStyle}><UserOutlined /></Button></Link>
                </div>
            }

            {/* 로그인 기록이 없는 경우, 메시지와 마이페이지로 가는 버튼이 제대로 동작하지 않음 */}
            {userData === null &&
                <div style={{ float: 'right' }}>
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

export default Header;