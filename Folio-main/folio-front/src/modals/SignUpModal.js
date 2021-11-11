import axios from 'axios'
import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col, Container } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login'
import HorizontalLine from '../components/HorizonLine'
import { BACK_ADDRESS } from '../utils/BackAddress'

const SignUpModal = ({ show, onHide }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [date, setDate] = useState({
        year: '',
        month: '',
        day: '',
    });

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const onChangeDate = (e) => {
        const { id, value } = e.target;
        
        if (id === 'year') {
            setDate({
                ...date,
                year: value,
            });
        } else if (id === 'month') {
            setDate({
                ...date,
                month: value,
            });
        } else if (id === 'day') {
            setDate({
                ...date,
                day: value,
            });
        }
    };

    const onSubmitFunction = (e) => {
        e.preventDefault();
        
        if (!email) {
            return alert('이메일을 입력해주세요.');
        } else if (!password) {
            return alert('비밀번호를 입력해주세요.');
        } else if (!name) {
            return alert('이름을 입력해주세요.');
        } else if (!confirmPassword) {
            return alert('비밀번호를 한 번 더 입력해주세요.');
        } else if (!date) {
            return alert('생년월일을 입력해주세요.');
        }

        if (password !== confirmPassword) {
            return alert('비밀번호를 알맞게 입력해주세요.');
        }

        const birth = new Date();
        birth.setFullYear(date.year);
        birth.setMonth(date.month - 1);
        birth.setDate(date.day);

        const body = {
            name: name,
            email: email,
            password: password,
            birth: birth,
        };

        axios.post(BACK_ADDRESS + '/user/signup', body)
            .then (res => {
                if (res.data.success) {
                    alert('회원가입 성공')
                    // 모달 창 닫음
                    onHide();

                } else {
                    alert('회원가입 실패');
                }
            });
    }

    return (
        <Modal
            show = {show}
            onHide = {onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Container>
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">회원가입</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmitFunction}> 
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control id="name" placeholder="Enter your name" value={name} onChange={onChangeName} />
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control id="email" placeholder="Enter email" value={email} onChange={onChangeEmail} />
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword} />
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={onChangeConfirmPassword} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Date of Birth</Form.Label>
                            <Row>
                                <Col>
                                <Form.Control placeholder="Year 1997" id="year" value={date.year} onChange={onChangeDate} />
                                </Col>
                                <Col>
                                <Form.Control placeholder="Month 06" id="month" value={date.month} onChange={onChangeDate} />
                                </Col>
                                <Col>
                                <Form.Control placeholder="Day 15" id="day" value={date.day} onChange={onChangeDate} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Button type="submit" variant = "info" id="button" className="my-3" style = {{width: "100%"}}>
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
                                        }}
                                    >
                                        <i className="fab fa-google"></i>&nbsp; Sign Up with Google
                                    </Button>
                                );
                            }}
                        /> 
                    </Form>
                </Modal.Body>
            </Container>
        </Modal>
    )
}

export default SignUpModal
