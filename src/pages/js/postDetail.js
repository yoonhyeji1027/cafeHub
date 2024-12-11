import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../css/postDetail.css";
import Nav_login from './nav_login.js';
import { supabase } from '../../utils/SupabaseClient.ts';

export default function PostDetail() {
    const location = useLocation();
    const { title, picture, content, userId, createdAt, name, number } = location.state || {};
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('session'));
        if (session && session.user) {
            setCurrentUserName(session.user.name);
            setCurrentUserId(session.user.user_id);
        }
        fetchPostData();    // 게시글 정보 및 좋아요 상태 불러오기
        fetchComments();    // 댓글 가져오기
    }, [number]);

    // 게시글 정보와 좋아요 상태 불러오기
    const fetchPostData = async () => {
        try {
            // 게시글의 likes 필드를 가져옴
            const { data: postData, error: postError } = await supabase
                .from('posts')
                .select('likes')
                .eq('number', number)
                .single();

            if (postError) throw postError;

            setLikes(postData.likes);

            // 로컬 스토리지에서 유저가 이 게시글에 좋아요를 눌렀는지 확인
            const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
            if (likedPosts[number]) {
                setHasLiked(true); // 이미 좋아요를 눌렀다면 true로 설정
            } else {
                setHasLiked(false); // 좋아요를 누르지 않았으면 false로 설정
            }

        } catch (error) {
            console.error(error);
        }
    };

    // 댓글 가져오기 함수
    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_number', number);

        if (error) {
            console.error(error);
        } else {
            setComments(data);
        }
    };

    // 좋아요 클릭 핸들러
    const handleLike = async () => {
        try {
            const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};

            if (hasLiked) {
                // 좋아요 취소
                const newLikes = likes - 1;
                setLikes(newLikes);
                setHasLiked(false);
                delete likedPosts[number];  // 로컬 스토리지에서 삭제
                localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

                // posts 테이블의 좋아요 수 업데이트
                const { error: postError } = await supabase
                    .from('posts')
                    .update({ likes: newLikes })
                    .eq('number', number);

                if (postError) throw postError;

            } else {
                // 좋아요 추가
                const newLikes = likes + 1;
                setLikes(newLikes);
                setHasLiked(true);
                likedPosts[number] = true;  // 로컬 스토리지에 추가
                localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

                // posts 테이블의 좋아요 수 업데이트
                const { error: postError } = await supabase
                    .from('posts')
                    .update({ likes: newLikes })
                    .eq('number', number);

                if (postError) throw postError;
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 댓글 작성 핸들러
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const newCommentData = {
                name: currentUserName,
                content: newComment,
                date: new Date().toISOString(),
                post_number: number
            };
            setComments([...comments, newCommentData]);
            setNewComment('');

            const { error } = await supabase.from('comments').insert([newCommentData]);
            if (error) {
                console.error(error);
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
                </div>

                <div className="post_content">
                    <p>{content.replace(/\\n/g, '\n')}</p>
                    {picture && <img src={picture} alt="Post" className="post_image_detail" />}
                </div>

                <div className="post_interaction">
                    <button onClick={handleLike} className="like_button">
                        {hasLiked ? '좋아요 취소' : '좋아요'} {likes}
                    </button>
                </div>

                <div className="comments_section">
    <h3>댓글</h3>
    <ul>
        {comments.map((comment, index) => (
            <li key={index}>
                <div className="comment_header">
                    <span className="comment_username">{comment.name}</span>
                    <span className="comment_date">
                        {new Date(comment.date).toLocaleString('ko-KR', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false // 24시간제
                        })}
                    </span>
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
