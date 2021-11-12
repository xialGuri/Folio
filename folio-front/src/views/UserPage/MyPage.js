import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from 'react-markdown';
import { BACK_ADDRESS } from "../../utils/BackAddress";

const MyPage = ({ history }) => {
    const [stacks, setStacks] = useState([]);
    const [intro, setIntro] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [workData, setWorkData] = useState([]);
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
                    }
                } else {
                    alert('내 포트폴리오 가져오기 실패');
                }
            });
    }, []);

    return (
        <>
            <div>마이페이지</div>
            <button onClick={() => history.push('/folio/writing')}>포트폴리오 작성</button>
            <h4>내 기술 / 스택</h4>
            <div>{stacks}</div>
            <h4>내 소개</h4>
            <ReactMarkdown children={intro} />
            <h4>내 깃허브 링크</h4>
            <div>{githubLink}</div>
        </>
    )
};

export default MyPage;