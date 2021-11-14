import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Button, Form, Container, FloatingLabel } from 'react-bootstrap'
import { BACK_ADDRESS } from '../utils/BackAddress'
import { VscAccount } from 'react-icons/vsc'

const MainModWritingModal = ({ show, onHide }) => {
    const { userData } = useSelector(state => state.user);
    const [text, setText] = useState("");
    
    const onChangeText = (e) => {
        setText(e.target.value);
    };

    const onSubmitFunction = (e) => {
        e.preventDefault();

        if (!text) {
            return alert('글을 수정 해주세요.');
        } 
        
        const body = {
            text: text,
        };
        
        axios.post(BACK_ADDRESS + '', body)
            .then (res => {
                if (res.data.success) {
                    // 리덕스에 사용자 글쓰기 정보 저장
                    // dispatch(Action({ }));
                    alert('글 수정 성공')
                    // 성공 시 모달 창 닫음
                    onHide();  
                } else {
                    alert('글 수정 실패');
                }
            });
    };
    
    // 글 삭제 버튼 클릭시 동작 함수
    // 저장된 데이터를 Back에서 제거하는 코드 필요
    const onDeleteButton = (e) => {
        e.preventDefault();
        const tf = window.confirm("삭제하시겠습니까?")
        if(tf){
            alert('삭제되었습니다.')
            setText('')
            onHide()
        }
    }

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
                    <Modal.Title id="contained-modal-title-vcenter">수정하기</Modal.Title>
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
                            {/* 글 삭제 버튼 */}
                            <Button variant="info" className="my-3" style = {{width: "100px", float: "right"}} onClick={onDeleteButton}>
                                글 삭제
                            </Button>
                            {/* 글 저장 버튼 */}
                            <Button type="submit" variant="info" className="my-3" style = {{width: "100px", float: 'right', marginRight:'10px'}}>
                                저장
                            </Button>
                        </Form>
                    </Modal.Body>
                </Container>
            </Modal>
        </>
    )
}
export default MainModWritingModal