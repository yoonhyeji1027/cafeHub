import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/SupabaseClient.ts';
import "../css/myBoard.css";
import { useNavigate } from 'react-router-dom';
import Nav_login from './nav_login.js';

export default function MyBoard() {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [selectedPosts, setSelectedPosts] = useState({}); // 선택된 게시글 ID를 객체로 관리
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setIsLoggedIn(true);
            fetchPosts();
        } else {
            navigate('/login.js');
        }
    }, []);

    const fetchPosts = async () => {
        if (!userId) return;

        let { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching posts:", error);
        } else {
            setPosts(posts);
        }
    };

    const handleCheckboxChange = (postId) => {
        setSelectedPosts((prevSelectedPosts) => {
            const updatedSelection = { ...prevSelectedPosts };
            if (updatedSelection[postId]) {
                delete updatedSelection[postId]; // 체크 해제 시 삭제
            } else {
                updatedSelection[postId] = true; // 체크 시 추가
            }
            return updatedSelection;
        });
    };

    const deleteSelectedPosts = async () => {
        const confirmDelete = window.confirm("정말로 선택한 글들을 삭제하시겠습니까?");
        if (!confirmDelete) return;
    
        const postIdsToDelete = Object.keys(selectedPosts).filter(postId => selectedPosts[postId]);
        const { error } = await supabase
            .from('posts')
            .delete()
            .in('number', postIdsToDelete);
    
        if (error) {
            console.error("Error deleting posts:", error);
        } else {
            // 삭제 후 선택된 게시글 제거
            setPosts(posts.filter(post => !postIdsToDelete.includes(post.number)));
            setSelectedPosts({}); // 선택 상태 초기화
            
            // 페이지 새로고침
            window.location.reload();
        }
    };
    

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (
        <div>
            <Nav_login />

            <div className='community_header'>
                <h1>Café Hub</h1>
                <p>in 강릉</p>
            </div>
            <div className='commu_bt'>
                <button onClick={() => navigate("/community.js")} className='myBoardBt'>커뮤니티</button>
                <button onClick={() => navigate("/addBoard.js")} className='addBoardBt'>글 쓰기</button>
            </div>
            
            <button
                className='myBoard_delete_button'
                onClick={deleteSelectedPosts}
            >
                선택한 글 삭제
            </button>
            
            <div className="posts">
                {currentPosts.map((post) => (
                    <div 
                        key={post.number} 
                        className="post_card"
                        onClick={() => navigate("/postDetail.js", {
                            state: { 
                                postId: post.number, 
                                title: post.title, 
                                picture: post.picture, 
                                content: post.content, 
                                userId: post.user_id, 
                                createdAt: post.created_at, 
                                name: post.name, 
                                number: post.number
                            }
                        })}
                    >
                        <div className="post_header">
                            <input
                                type="checkbox"
                                checked={!!selectedPosts[post.number]} // 선택된 상태는 객체로 관리
                                onClick={(event) => event.stopPropagation()} // 클릭 시 부모 클릭 이벤트 전파 방지
                                onChange={() => handleCheckboxChange(post.number)} // 해당 체크박스만 반전
                            />
                            <div className="post_user_info">
                                <span className="username">{post.name || "익명"}</span>
                                <span className="post_date">
                                    {new Date(post.created_at).toLocaleString('ko-KR', {
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
                            <h3>{post.title}</h3>
                            <p>{post.content.replace(/\\n/g, '\n')}</p>
                            {post.picture && (
                                <img
                                    src={post.picture}
                                    alt="Post"
                                    className="post_image"
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
}

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }



    return (
        <nav>
            <ul className='pagination'>
                <li>
                    <button
                        onClick={() => paginate(1)}
                        disabled={currentPage === 1}
                    >
                        {'<<'}
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        {'<'}
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number} className={currentPage === number ? 'active' : ''}>
                        <button onClick={() => paginate(number)}>
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        {'>'}
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => paginate(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        {'>>'}
                    </button>
                </li>
            </ul>
        </nav>
    );
}
