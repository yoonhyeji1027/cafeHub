import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import "../css/findPw.css";
import Nav from './nav.js';
import { supabase } from '../../utils/SupabaseClient.ts';

export default function FindPw() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        phone_number: '',
        id: '',
    });

    const [password, setPassword] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const { name, phone_number, id } = userInfo;

        if (!name || !phone_number || !id) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        try {
            const { data, error } = await supabase
                .from('cafehub_user')
                .select('password')
                .eq('name', name)
                .eq('phone_number', phone_number)
                .eq('id', id);

            if (error) throw error;

            if (data.length === 0) {
                alert("사용자를 찾을 수 없습니다.");
            } else {
                setPassword(data[0].password);
            }
        } catch (error) {
            console.error('비밀번호 찾기 오류:', error.message);
            alert('비밀번호 찾기 중 오류가 발생했습니다. 다시 시도해주세요.');
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
                        type="text"
                        className='userPhone'
                        name="phone_number"
                        placeholder='전화번호'
                        value={userInfo.phone_number}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className='userIdLogin'
                        name="id"
                        placeholder='아이디'
                        value={userInfo.id}
                        onChange={handleChange}
                    />
                </div>
                <div className='findPw_bt'>
                    <button id="findPwBt" onClick={handleSubmit}>찾기</button>
                </div>
                <div className='findPw_result'>
                    {password && <p>비밀번호: {password}</p>}
                </div>
                <div className='findPw_menu'>
                    <Link to="/findId.js">아이디 찾기</Link>
                </div>
            </div>
        </div>
    );
}
