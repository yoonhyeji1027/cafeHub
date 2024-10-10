import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "../css/login.css";
import Nav from './nav.js';
import { supabase } from '../../utils/SupabaseClient.ts';

export default function Login() {
    const navigate = useNavigate();
    
    const [loginInfo, setLoginInfo] = useState({
        user_id: '',
        password: '',
    });

    // 페이지 로드 시 세션 확인
    useEffect(() => {
        const savedSession = localStorage.getItem('session');
        if (savedSession) {
            navigate('/main.js'); // 로그인된 상태라면 메인 페이지로 이동
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        const { user_id, password } = loginInfo;

        if (!user_id || !password) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        try {
            // Supabase에서 id와 password 확인
            const { data, error } = await supabase
                .from('cafehub_user') // 사용자 테이블
                .select('*')
                .eq('user_id', user_id)
                .eq('password', password)
                .single();

            if (error) {
                throw error;
            }

            if (data) {
                localStorage.setItem('session', JSON.stringify(data)); // 로그인 성공 시 세션 저장
                navigate('/main.js'); // 메인 페이지로 이동
            } else {
                alert('아이디 또는 비밀번호가 잘못되었습니다.');
            }
        } catch (error) {
            console.error('로그인 오류:', error.message);
            alert('아이디 또는 비밀번호가 잘못되었습니다.');
        }
    };

    return (
        <div>
            <Nav />
            <div className="login_header">
                <h1 id='login_title'>로그인</h1>
                <p>로그인하시면 커뮤니티/ 맞춤 매칭 등의 정보서비스를 이용하실 수 있습니다.</p>
                <hr />
            </div>
            <div>
                <div className='login_input'>
                    <input
                        type="text"
                        className='userIdLogin'
                        name="user_id"
                        placeholder='아이디'
                        autoFocus
                        value={loginInfo.user_id}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        className='userPasswordLogin'
                        name="password"
                        placeholder='비밀번호'
                        value={loginInfo.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='login_bt'>
                    <button id="loginBt" onClick={handleLogin}>로그인</button>
                    <Link to="/signUp.js">
                        <button id="signUpBt">회원가입</button>
                    </Link>
                </div>
                <div className='login_menu'>
                    <Link to="/findId.js">아이디 찾기</Link>
                    <Link to="/findPw.js">비밀번호 찾기</Link>
                </div>
            </div>
        </div>
    );
}