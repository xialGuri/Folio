import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAction } from '../reducers/user'
import { Modal, Button, Form, Container } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login'
import HorizontalLine from '../components/HorizonLine'
import { BACK_ADDRESS } from '../utils/BackAddress'
import SignUpModal from '../modals/SignUpModal'

const SignInModal = ({ show, onHide, history }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // 회원가입(추가)
    const [signUpModalOn, setSignUpModalOn] = useState(false);

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onSubmitFunction = (e) => {
        e.preventDefault();

        if (!email) {
            return alert('이메일을 입력해주세요.');
        } else if (!password) {
            return alert('비밀번호를 입력해주세요.');
        }

        const body = {
            email: email,
            password: password,
        };
        //Back에서 만든 글쓰기 정보 가져오는 셋팅 필요
        axios.post(BACK_ADDRESS + '/user/login', body)
            .then (res => {
                if (res.data.success) {
                    // 리덕스에 사용자 로그인 정보 저장
                    dispatch(loginAction({ email, password }));
                    alert('로그인 성공')
                    // 모달 창 닫음
                    onHide();
                    
                } else {
                    alert('로그인 실패');
                }
            });
    };

    const onClickSignUpButton = () => {
        setSignUpModalOn(true);
    };

    return (
        <>
            <SignUpModal show = {signUpModalOn} onHide={()=>setSignUpModalOn(false)}/>

            <Modal
                show = {show}
                onHide = {onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Container>
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">로그인</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmitFunction}> 

                            <Form.Group className="my-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={onChangeEmail} />
                            </Form.Group>

                            <Form.Group className="my-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword} />
                            </Form.Group>

                            <Button type="submit" variant = "info" className="my-3" style = {{width: "100%"}}>
                                Sign In
                            </Button>
                            <Button onClick={onClickSignUpButton}>
                                Sign Up
                            </Button>
                            <HorizontalLine text={"OR"} /> 
                            <GoogleLogin  
                                render={(renderProps) => {
                                    return (
                                        <Button 
                                            onClick={renderProps.onClick} 
                                            disabled={renderProps.disabled}
                                            style = {{
                                                backgroundColor: "#176BEF", 
                                                borderColor: "#176BEF",
                                                width: '100%'
                                            }}>
                                            <i className="fab fa-google"></i>&nbsp; Sign In with Google
                                        </Button>
                                    );
                                }}
                            /> 
                        </Form>
                    </Modal.Body>
                </Container>
            </Modal>
        </>
    )
}

export default SignInModal
