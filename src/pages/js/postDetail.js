import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../css/postDetail.css";
import Nav_login from './nav_login.js';
import { supabase } from '../../utils/SupabaseClient.ts';

export default function PostDetail() {
    const location = useLocation();
    const { title, picture, content, userId, createdAt, name, number } = location.state || {}; 
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [currentUserName, setCurrentUserName] = useState('');
    
    useEffect(() => {
        // 로그인된 유저의 이름을 로컬 스토리지 또는 세션에서 불러옴
        const session = JSON.parse(localStorage.getItem('session'));
        if (session && session.user) {
            setCurrentUserName(session.user.name); // 세션에서 유저 이름 추출
        }
        fetchComments(); // 댓글 가져오기
    }, [number]);

    // 댓글 가져오기 함수
    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments') // comments 테이블에서 댓글 가져오기
            .select('*')
            .eq('post_number', number); // 게시물 번호로 필터링

        if (error) {
            console.error(error);
        } else {
            setComments(data);
        }
    };


    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const newCommentData = {
                name: currentUserName,
                content: newComment,
                date: new Date().toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }), post_number: number
            };
            setComments([...comments, newCommentData]); // 댓글 리스트 업데이트
            setNewComment(''); // 댓글 입력란 초기화

            // Supabase에 댓글 추가
            const { error } = await supabase.from('comments').insert([newCommentData]);
            if (error) {
                console.error(error);
            } else {
                setComments([...comments, newCommentData]); // 댓글 리스트 업데이트
                setNewComment(''); // 댓글 입력란 초기화
            }
        }
    };

    return (
        <div>
            <Nav_login />
            <div className="post_detail_container">
                <div className="post_detail_header">
                    <h2>{title}</h2>
                    <div className="post_user_info">
                        <span className="username">{name || "익명"}</span>
                        <span className="post_date">
                            {new Date(createdAt).toLocaleString('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            })}
                        </span>
                    </div>
                    <div className="post_actions">
                        <button className="edit_button">수정</button>
                        <button className="delete_button">삭제</button>
                    </div>
                </div>

                <div className="post_content">
                    <p>{content.replace(/\\n/g, '\n')}</p>
                    {picture && <img src={picture} alt="Post" className="post_image_detail" />}
                </div>

                <div className="post_interaction">
                    <button onClick={handleLike} className="like_button">
                        좋아요 {likes}
                    </button>
                </div>

                <div className="comments_section">
                    <h3>댓글</h3>
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index}>
                                <div className="comment_header">
                                    <span className="comment_username">{comment.name}</span>
                                    <span className="comment_date">{comment.date}</span>
                                </div>
                                <p className="comment_content">{comment.content}</p>
                            </li>
                        ))}
                    </ul>

                    <form onSubmit={handleCommentSubmit} className="comment_form">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="댓글을 입력하세요"
                            className="comment_input"
                        />
                        <button type="submit" className="submit_comment_button">
                            댓글 작성
                        </button>
                    </form>
                </div>

                <div className="back_to_community">
                    <Link to="/community.js">
                        <button className="back_button">커뮤니티로 돌아가기</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
