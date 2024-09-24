import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import "../css/signUp.css";
import Nav from './nav.js';
import { supabase } from '../../utils/SupabaseClient.ts';

export default function SignUp() {

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: '',
        id: '',
        password: '',
        phone_number: '',
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

    const checkIdDuplicate = async (id: string) => {
        try {
            const { data, error } = await supabase
                .from('cafehub_user')
                .select('id')
                .eq('id', id);

            if (error) throw error;

            return data.length > 0;
        } catch (error) {
            console.error('ID 중복 확인 오류:', error.message);
            return false;
        }
    };

    const handleIdCheck = async () => {
        const { id } = userInfo;

        if (!id) {
            alert("아이디를 입력해주세요.");
            return;
        }

        const isDuplicate = await checkIdDuplicate(id);

        if (isDuplicate) {
            alert("이미 사용 중인 아이디입니다.");
        } else {
            alert("사용 가능한 아이디입니다.");
        }
    };

    const checkPhoneNumberDuplicate = async (phone_number: string) => {
        try {
            const { data, error } = await supabase
                .from('cafehub_user')
                .select('phone_number')
                .eq('phone_number', phone_number);

            if (error) throw error;

            return data.length > 0;
        } catch (error) {
            console.error('전화번호 중복 확인 오류:', error.message);
            return false;
        }
    };

    const validateInput = () => {
        const { name, id, password, phone_number } = userInfo;

        if (name.length < 2 || /\s/.test(name)) {
            alert("이름은 공백 없이 2자 이상이어야 합니다.");
            return false;
        }
        if (phone_number.length < 9 || /\s/.test(phone_number)) {
            alert("전화번호는 공백 없이 9자 이상이어야 합니다.");
            return false;
        }
        if (id.length < 3 || /\s/.test(id)) {
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
        const { name, id, password, phone_number } = userInfo;

        if (!validateInput()) {
            return;
        }

        const isPhoneNumberDuplicate = await checkPhoneNumberDuplicate(phone_number);

        if (isPhoneNumberDuplicate) {
            alert("이미 가입된 전화번호입니다.");
            return;
        }

        try {
            const { data, error } = await supabase
                .from('cafehub_user')
                .insert([{ name, id, password, phone_number }]);

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
                        type="text"
                        className='userPhone'
                        name="phone_number"
                        placeholder='전화번호'
                        value={userInfo.phone_number}
                        onChange={handleChange}
                    />
                    <div className="idCheck">
                        <input
                            type="text"
                            className='userId'
                            name="id"
                            placeholder='아이디'
                            value={userInfo.id}
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
