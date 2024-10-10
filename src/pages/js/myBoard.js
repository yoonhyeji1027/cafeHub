import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/SupabaseClient.ts';
import "../css/myBoard.css";
import { Link, useNavigate } from 'react-router-dom';
import Nav_login from './nav_login.js';

export default function MyBoard() {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
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

    const deletePost = async (postId) => {
        const confirmDelete = window.confirm("정말로 이 글을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId);

        if (error) {
            console.error("Error deleting post:", error);
        } else {
            // 삭제 후, 목록을 업데이트하여 삭제된 게시물이 보이지 않도록 함
            setPosts(posts.filter(post => post.id !== postId));
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
            <div className="posts">
                {currentPosts.map((post) => (
                    <div key={post.id} className="post_card">
                        <div className="post_header">
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
                            <button
                                className="delete_button"
                                onClick={() => deletePost(post.id)}
                            >
                                삭제
                            </button>
                        </div>
                        <div className="post_content">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
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

            <div className='commu_bt'>
            <Link to="/community.js">
                    <button className='myBoardBt'>커뮤니티</button>
                </Link>
                <Link to="/addBoard.js">
                    <button className='addBoardBt'>글 쓰기</button>
                </Link>
            </div>
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
