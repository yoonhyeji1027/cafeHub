import React, { useEffect, useState } from 'react';
import "../css/addBoard.css";
import { supabase } from '../../utils/SupabaseClient.ts';
import { useNavigate } from 'react-router-dom';
import Nav_login from './nav_login.js';

export default function AddBoard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(''); // 게시글 내용
    const [userName, setUserName] = useState(''); // 사용자의 이름을 저장할 상태
    const [isPostCreated, setIsPostCreated] = useState(false); // 게시물 등록 완료 상태
    const navigate = useNavigate();

    // 페이지 로드 시 세션 확인
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('session'));
        if (session) {
            setIsLoggedIn(true); // 세션이 존재하면 로그인 상태로 설정
            fetchUserName(session.user_id); // 사용자 이름 가져오기
        }
    }, []);

    // 오류 처리 함수
    const handleError = (error) => {
        if (error instanceof Event) {
            console.error("An event error occurred:", error);
            alert(`Error: An unexpected error occurred.`);
        } else {
            console.error(error);
            alert(`Error: ${error.message}`); // 사용자에게 에러 메시지 표시
        }
    };

    // 사용자 이름 가져오기 함수
    const fetchUserName = async (user_id) => {
        try {
            const { data, error } = await supabase
                .from('cafehub_user')
                .select('name')
                .eq('user_id', user_id)
                .single(); // 단일 사용자 정보 가져오기

            if (error) throw new Error(`Error fetching user name: ${error.message}`);
            if (!data) {
                console.log('No user found with this user_id:', user_id);
                return;
            }

            setUserName(data.name); // 사용자 이름 설정
        } catch (err) {
            handleError(err); // 오류 처리 함수 호출
        }
    };

    // 글 발행 함수
    const handleAddPost = async (e) => {
        e.preventDefault();
        const session = JSON.parse(localStorage.getItem('session'));
        const user_id = session ? session.user_id : null;

        if (!user_id) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const { error } = await supabase.from('posts').insert([
                { title, content: content.replace(/\n/g, '\\n'), user_id, name: userName } // 줄바꿈 포함
            ]);

            if (error) throw new Error(error.message);

            setIsPostCreated(true); // 게시물 등록 완료
            setTimeout(() => {
                navigate('/community.js'); // 일정 시간 후 커뮤니티 페이지로 이동
            }, 2000); // 2초 후에 커뮤니티 페이지로 이동
        } catch (err) {
            handleError(err); // 오류 처리 함수 호출
        }
    };

    return (
        <div>
            <Nav_login />

            <div className="addBoard_header">
                <h1 id='addBoard_title'>글 쓰기</h1>
                <hr />
            </div>
            <form onSubmit={handleAddPost}>
                <div className='addBoard_form'>
                    <div className='addBoard_menu'>
                        <h4>제    목</h4> <p>|</p>
                        <div className='addBoard_input'>
                            <input
                                type="text"
                                className='addBoardTitle'
                                placeholder='제목'
                                autoFocus
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='addBoard_menu'>
                        <h4>내    용</h4> <p>|</p>
                        <div className='addBoard_input'>
                            <textarea
                                className='addBoardDetail'
                                placeholder='내용'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className='addBoard_bt'>
                    <button type="submit" className='addBoardAddBt'>발행하기</button>
                </div>
            </form>

            {isPostCreated && (
                <div className="success-message">
                    <p>등록 완료되었습니다! 잠시 후 커뮤니티 페이지로 이동합니다.</p>
                </div>
            )}
        </div>
    );
}
