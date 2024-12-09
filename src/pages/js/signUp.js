import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import "../css/signUp.css";
import Nav from './nav.js';
import { supabase } from '../../utils/SupabaseClient.ts';

export default function SignUp() {

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: '',
        user_id: '',
        password: '',
        email: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const checkIdDuplicate = async (user_id: string) => {
        try {
            const { data, error } = await supabase
                .from('cafehub_user')
                .select('user_id')
                .eq('user_id', user_id);

            if (error) throw error;

            return data.length > 0;
        } catch (error) {
            console.error('ID 중복 확인 오류:', error.message);
            return false;
        }
    };

    const handleIdCheck = async () => {
        const { user_id } = userInfo;

        if (!user_id) {
            alert("아이디를 입력해주세요.");
            return;
        }

        const isDuplicate = await checkIdDuplicate(user_id);

        if (isDuplicate) {
            alert("이미 사용 중인 아이디입니다.");
        } else {
            alert("사용 가능한 아이디입니다.");
        }
    };

    const checkEmailDuplicate = async (email: string) => {
        try {
            const { data, error } = await supabase
                .from('cafehub_user')
                .select('email')
                .eq('email', email);

            if (error) throw error;

            return data.length > 0;
        } catch (error) {
            console.error('이메일 중복 확인 오류:', error.message);
            return false;
        }
    };

    const validateInput = () => {
        const { name, user_id, password, email } = userInfo;

        if (name.length < 2 || /\s/.test(name)) {
            alert("이름은 공백 없이 2자 이상이어야 합니다.");
            return false;
        }
        if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/.test(email)) {
            alert("유효한 이메일 주소를 입력해주세요.");
            return false;
        }
        if (user_id.length < 3 || /\s/.test(user_id)) {
            alert("아이디는 공백 없이 3자 이상이어야 합니다.");
            return false;
        }
        if (password.length < 6 || /\s/.test(password)) {
            alert("비밀번호는 공백 없이 6자 이상이어야 합니다.");
            return false;
        }
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        const { name, user_id, password, email } = userInfo;

        if (!validateInput()) {
            return;
        }

        const isEmailDuplicate = await checkEmailDuplicate(email);

        if (isEmailDuplicate) {
            alert("이미 가입된 이메일입니다.");
            return;
        }

        try {
            const { data, error } = await supabase
                .from('cafehub_user')
                .insert([{ name, user_id, password, email }]);

            if (error) throw error;

            alert('회원가입이 완료되었습니다.');
            navigate('/login.js');
        } catch (error) {
            console.error('회원가입 오류:', error.message);
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div>
            <Nav />
            <div className="signUp_header">
                <h1 id='signUp_title'>회원가입</h1>
                <hr />
            </div>
            <div>
                <div className='signUp_input'>
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
                    <div className="idCheck">
                        <input
                            type="text"
                            className='userId'
                            name="user_id"
                            placeholder='아이디'
                            value={userInfo.user_id}
                            onChange={handleChange}
                        />
                        <button id="idCheck_bt" onClick={handleIdCheck}>확인</button>
                    </div>
                    <input
                        type="password"
                        className='userPassword'
                        name="password"
                        placeholder='비밀번호'
                        value={userInfo.password}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        className='userPassword_re'
                        placeholder='비밀번호 확인'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                <div className='signUp_bt'>
                    <button id="joinBt" onClick={handleSubmit}>가입</button>
                </div>
                <div className='signUp_menu'>
                    <Link to="/findId.js">아이디 찾기</Link>
                    <Link to="/findPw.js">비밀번호 찾기</Link>
                </div>
            </div>
        </div>
    );
}