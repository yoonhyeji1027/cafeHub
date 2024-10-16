import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../utils/SupabaseClient.ts';
import "../css/postDetail.css";

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('user_id', id)
            .single();
    
        if (error) {
            console.error('Error fetching post:', error);
            alert('게시글을 불러오는 중 오류가 발생했습니다.');
        } else {
            setPost(data);
        }
    };
    

    if (!post) return <p>Loading...</p>;

    return (
        <div className="post_detail">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.picture && (
                <img src={post.picture} alt="Post" className="post_image" />
            )}
            <span className="post_user">{post.name || "익명"}</span>
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
    );
}
