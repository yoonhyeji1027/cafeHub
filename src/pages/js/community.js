import { useEffect, useState } from 'react';
import { supabase } from '../../utils/SupabaseClient.ts';
import { Link, useNavigate } from 'react-router-dom';
import Nav_login from './nav_login.js';
import "../css/community.css";

export default function Community() {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);
    const navigate = useNavigate();

    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setIsLoggedIn(true);
        } else {
            navigate('/login.js');
        }

        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        let { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false }); // 서버에서 최신순으로 정렬
        if (error) {
            console.error(error);
        } else {
            setPosts(posts);
        }
    };

    // 현재 페이지에 표시할 포스트 추출
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 변경 처리
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Nav_login />

            <div className='community_header'>
                <h1>Café Hub</h1>
                <p>in 강릉</p>
            </div>
            <div className='commu_bt'>
                <Link to="/myBoard.js">
                    <button className='myBoardBt'>내가 쓴 글</button>
                </Link>
                <Link to="/addBoard.js">
                    <button className='addBoardBt'>글 쓰기</button>
                </Link>
            </div>
            <div className="posts">
                {currentPosts.map((post) => (
                    <Link 
                        to="/postDetail.js"
                        state={{ 
                            postId: post.id, 
                            title: post.title, 
                            picture: post.picture, 
                            content: post.content, 
                            userId: post.user_id, 
                            createdAt: post.created_at, 
                            name: post.name, 
                            number: post.number
                        }}
                    >
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
                    </Link>
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
