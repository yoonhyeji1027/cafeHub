import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import "../css/findPw.css";
import Nav from './nav.js';
import { supabase } from '../../utils/SupabaseClient.ts';

export default function FindPw() {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        user_id: '',
    });

    const [newPassword, setNewPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false); // 사용자 확인 상태
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleVerify = async () => {
        const { name, email, user_id } = userInfo;

        if (!name || !email || !user_id) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        try {
            const { data, error } = await supabase
                .from('cafehub_user')
                .select('*')
                .eq('name', name)
                .eq('email', email)
                .eq('user_id', user_id);

            if (error) throw error;

            if (data.length === 0) {
                setIsVerified(false);
                setErrorMessage('사용자를 찾을 수 없습니다.');
            } else {
                setIsVerified(true); // 사용자 확인 성공
                setErrorMessage('');
            }
        } catch (error) {
            console.error('사용자 확인 오류:', error.message);
            setErrorMessage('사용자 확인 중 오류가 발생했습니다.');
        }
    };

    const handleResetPassword = async () => {
        if (!newPassword) {
            alert('새 비밀번호를 입력해주세요.');
            return;
        }

        try {
            const { name, email, user_id } = userInfo;
            const { error } = await supabase
                .from('cafehub_user')
                .update({ password: newPassword }) // 비밀번호 업데이트
                .eq('name', name)
                .eq('email', email)
                .eq('user_id', user_id);

            if (error) throw error;

            alert('비밀번호가 성공적으로 변경되었습니다.');
            navigate('/login.js'); // 로그인 페이지로 이동
        } catch (error) {
            console.error('비밀번호 재설정 오류:', error.message);
            alert('비밀번호 재설정 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <Nav />
            <div className="findPw_header">
                <h1 id='findPw_title'>P/W 찾기</h1>
                <hr />
            </div>
            <div>
                <div className='findPw_input'>
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
                    <input
                        type="text"
                        className='userIdLogin'
                        name="user_id"
                        placeholder='아이디'
                        value={userInfo.user_id}
                        onChange={handleChange}
                    />
                </div>
                <div className='findPw_bt'>
                    <button id="findPwBt" onClick={handleVerify}>확인</button>
                </div>
                {isVerified && (
                    <div className='resetPw_section'>
                        <input
                            type="password"
                            className='newPassword'
                            placeholder='새 비밀번호'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button id="resetPwBt" onClick={handleResetPassword}>비밀번호 재설정</button>
                    </div>
                )}
                {errorMessage && (
                    <div className='error_message'>
                        <p>{errorMessage}</p>
                    </div>
                )}
                <div className='findPw_menu'>
                    <Link to="/findId.js">아이디 찾기</Link>
                </div>
            </div>
        </div>
    );
}
