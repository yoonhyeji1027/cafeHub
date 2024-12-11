import { Link } from "react-router-dom";
import React, { useState } from 'react';
import "../css/findId.css";
import Nav from './nav.js';
import { supabase } from '../../utils/SupabaseClient.ts';

export default function FindId() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
    });

    const [foundId, setFoundId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFindId = async () => {
        const { name, email } = userInfo;

        if (!name || !email) {
            alert("이름과 이메일을 입력해주세요.");
            return;
        }

        try {
            const { data, error } = await supabase
                .from('cafehub_user')
                .select('user_id')
                .eq('name', name)
                .eq('email', email)
                .single();

            if (error) throw error;

            if (data) {
                setFoundId(data.user_id);
                setErrorMessage(null);
            } else {
                setFoundId(null);
                setErrorMessage("사용자를 찾을 수 없습니다.");
            }
        } catch (error) {
            console.error('아이디 찾기 오류:', error.message);
            setFoundId(null);
            setErrorMessage('아이디 찾기 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div>
            <Nav />
            <div className="findId_header">
                <h1 id='findId_title'>ID 찾기</h1>
                <hr />
            </div>
            <div>
                <div className='findId_input'>
                    <input
                        type="text"
                        className='userName'
                        name="name"
                        placeholder='이름'
                        autoFocus
                        value={userInfo.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        className='userEmail'
                        name="email"
                        placeholder='이메일'
                        value={userInfo.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='findId_bt'>
                    <button id="findIdBt" onClick={handleFindId}>찾기</button>
                </div>
                {foundId && (
                    <div className="findId_result">
                        <p>당신의 아이디는 <strong>{foundId}</strong>입니다.</p>
                    </div>
                )}
                {errorMessage && (
                    <div className="findId_error">
                        <p>{errorMessage}</p>
                    </div>
                )}
                <div className='findId_menu'>
                    <Link to="/findPw.js">비밀번호 찾기</Link>
                </div>
            </div>
        </div>
    );
}
