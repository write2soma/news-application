import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
// import "./NewsDetails.css";

const CategoryDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch post details
    axios
      .get(`https://soma.rkmvivekatirtha.org/wp-json/wp/v2/posts/${id}?_embed`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setError("Failed to load the post.");
        setLoading(false);
      });

    // Fetch comments for the post
    
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  if (!post) return null;

  const featuredMedia =
    post._embedded &&
    post._embedded["wp:featuredmedia"] &&
    post._embedded["wp:featuredmedia"][0];
  const imageUrl = featuredMedia?.source_url;

  return (
    <div className="details-container">
      <article className="details-card">
        {imageUrl && (
          <img className="details-image" src={imageUrl} alt={post.title.rendered} />
        )}
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <div
          className="details-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>

      <section className="comments-section">
        <h2>Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p className="comment-author">
                <strong>{comment.author_name}</strong> says:
              </p>
              <div
                className="comment-content"
                dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
              />
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </section>

    </div>
  );
};

export default CategoryDetails;