import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Header from "../../utils/Header";
import { Input, Button, Table, Popconfirm, Modal } from "antd";
import { BACK_ADDRESS } from "../../utils/BackAddress";
import Footer from "../../utils/Footer";
const FolioWritingPage = ({ history }) => {
    const [stacks, setStacks] = useState([]);
    const [intro, setIntro] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [workData, setWorkData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // tmp data
    const [stackTmp, setStackTmp] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [workType, setWorkType] = useState("");
    const [workingDate, setWorkingDate] = useState("");
    
    const { userData } = useSelector(state => state.user);
    const editorRef = React.createRef();

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
                        // editorRef.current.getInstance().setMarkdown(folio.intro);
                    }
                }
            });
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        const data = {
            key: workData.length,
            No: workData.length + 1,
            회사명: companyName,
            직무: workType,
            기간: workingDate,
        };

        setWorkData([...workData, data]);
        setCompanyName("");
        setWorkType("");
        setWorkingDate("");
        setIsModalVisible(false);
    };

    const handleCancle = () => {
        setCompanyName("");
        setWorkType("");
        setWorkingDate("");
        setIsModalVisible(false);
    };

    const stackEnterPressedFunction = () => {
        if (stacks.includes(stackTmp)) {
            return alert('이미 추가 되어 있는 기술 스택입니다.');
        }
        setStacks([...stacks, stackTmp]);
        setStackTmp("");
    };

    const removeStack = (e) => {
        let newStacks = [];
        for (let i = 0; i < stacks.length; i++) {
            if (stacks[i] !== e.target.id) {
                newStacks.push(stacks[i]);
            }
        }
        setStacks(newStacks);
    };

    const renderStacks = stacks.map((stack, idx) => {
        return (
            <Button key={idx} style={{ height: '40px' }}>{stack}<a id={stack} onClick={removeStack}>X</a></Button>
        );
    });

    const updateWorkData = (key) => {
        let newWorkData = [];
        for (let i = 0; i < workData.length; i++) {
            if (workData[i].key !== key) {
                newWorkData.push({
                    key: newWorkData.length,
                    No: newWorkData.length + 1,
                    회사명: workData[i].회사명,
                    직무: workData[i].직무,
                    기간: workData[i].기간,
                });
            }
        }
        setWorkData(newWorkData);
    };

    const onChangeStackTmpFunction = (e) => {
        setStackTmp(e.target.value);
    };

    const onChangeIntroFunction = () => {
        setIntro(editorRef.current.getInstance().getMarkdown());
    };

    const onChangeGithubLinkFunction = (e) => {
        setGithubLink(e.target.value);
    };

    const onChangeCompanyName = (e) => {
        setCompanyName(e.target.value);
    };

    const onChangeWorkType = (e) => {
        setWorkType(e.target.value);
    };

    const onChangeWorkingDate = (e) => {
        setWorkingDate(e.target.value);
    };

    const onClickResetButton = () => {
        setStacks([]);
        setStackTmp("");
        setIntro("");
        setGithubLink("");
        setWorkData([]);
        editorRef.current.getInstance().setMarkdown("");
    };

    const onSubmitForm = (e) => {
        e.preventDefault();

        const body = {
            email: userData.email,
            stacks: stacks,
            workData: workData,
            intro: intro,
            githubLink: githubLink,
        };

        axios.post(BACK_ADDRESS + '/folio/writing', body)
            .then(res => {
                if (res.data.success) {
                    console.log('포트폴리오 등록 성공');
                    history.push('/');
                } else {
                    alert('등록에 실패하였습니다. 다시 시도해주세요.');
                }
            });
    };

    return (
        <div className="background">
            <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
            <script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
            {/* 고정 바 */}
            <Header style={{ margin: 'auto', width: '100%' }}></Header>
            <form style={{ backgroundColor: 'white', margin: '30px', color: 'black' }}>
                <br />
                <div style={{ margin: '10px' }}>
                    <h4>보유 기술 / 스택</h4>
                    <Input value={stackTmp} onChange={onChangeStackTmpFunction} placeholder="입력 후 Enter를 누르시면 자동으로 추가됩니다" onPressEnter={stackEnterPressedFunction} />
                    {/* 엔터 입력 시 추가되는 부분 */}
                    {renderStacks}
                </div>
                <br />
                <div style={{ margin: '10px' }}>
                    <h4>경력 사항</h4>
                    {/* 경력 테이블 */}
                    <Button onClick={showModal} type="primary">추가</Button>
                    <Modal title="추가" visible={isModalVisible} onOk={handleOk} onCancel={handleCancle}>
                        <div>
                            <label>회사명</label>
                            <Input value={companyName} onChange={onChangeCompanyName} />
                        </div>
                        <div>
                            <label>직무</label>
                            <Input value={workType} onChange={onChangeWorkType} />
                        </div>
                        <div>
                            <label>기간</label>
                            <Input value={workingDate} onChange={onChangeWorkingDate} />
                        </div>
                    </Modal>
                    <Table columns={columns} dataSource={workData} />
                </div>
                <div style={{ margin: '10px' }}>
                    <h4>Introduce Yourself!</h4>
                    <Editor 
                        previewStyle="vertical"
                        initialEditType="markdown"
                        onChange={onChangeIntroFunction}
                        ref={editorRef}
                    />
                </div>
                <br />
                <div style={{ margin: '10px' }}>
                    <h4>Github Link</h4>
                    <Input value={githubLink} onChange={onChangeGithubLinkFunction} placeholder="개인 깃허브 주소가 있다면 입력해주세요" />
                </div>
                <br />
                <center style={{ margin: '10px' }}>
                    <Button onClick={onSubmitForm}>등록</Button>
                    <Button onClick={onClickResetButton}>초기화</Button>
                </center>
                <br />
                <Footer></Footer>
            </form>
        </div>
    );
};

export default FolioWritingPage;