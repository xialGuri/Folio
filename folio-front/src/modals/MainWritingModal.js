import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Button, Form, Container, FloatingLabel } from 'react-bootstrap'
import { BACK_ADDRESS } from '../utils/BackAddress'
import { VscAccount } from 'react-icons/vsc'


const MainWritingModal = ({ show, onHide }) => {
    const { userData } = useSelector(state => state.user);
    const [text, setText] = useState("");
    
    const onChangeText = (e) => {
        setText(e.target.value);
    };

    const onSubmitFunction = (e) => {
        e.preventDefault();
        
        if (!text) {
            return alert('글을 작성 해주세요.');
        } 
        
        const body = {
            email: userData.email,
            text: text,
            date: new Date(),
        };

        axios.post(BACK_ADDRESS + '/writing/new', body)
            .then (res => {
                if (res.data.success) {
                    alert('글쓰기 성공')
                    // 성공 시 모달 창 닫음
                    onHide();  
                } else {
                    alert('글쓰기 실패');
                }
            });
    };

    return (
        <>
            <Modal
                show = {show}
                onHide = {onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Container>
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">글쓰기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* 유저 아이콘 & 유저 이름 */}
                        {userData &&
                            <div>
                                <VscAccount size="40" style={{marginBottom:'10px'}}/>
                                <span>{userData.name}</span>
                            </div>
                        }
                        <Form onSubmit={onSubmitFunction}>
                             {/* 글 작성 칸 */}
                            <FloatingLabel controlId="floatingTextarea2" label="나누고 싶은 생각을 적어주세요">
                            <Form.Control
                            as="textarea"
                            placeholder="작성해주세요"
                            style={{ height: '250px' }}
                            onChange={onChangeText}
                            value={text}
                            />
                            </FloatingLabel>
                            {/* 글 올리기 버튼 */}
                            <Button type="submit" variant = "info" className="my-3" style = {{width: "300px", margin: "auto", display: "block"}}>
                                올리기
                            </Button>
                        </Form>
                    </Modal.Body>
                </Container>
            </Modal>
        </>
    )
}
export default MainWritingModal