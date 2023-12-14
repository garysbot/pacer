import { fetchComments } from "../../store/comments";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import LoginForm from '../SessionForms/LoginForm';
import { composeComment } from "../../store/comments";
import Modal from '../../context/Modal';
import { deleteCommentThunk } from "../../store/comments";

export default function EventComments({ selectedEvent }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const comments = useSelector((state) => state.comments?.all);
  const selectedComments = Object.values(comments).filter(comment => comment.event === selectedEvent?._id);
  const currentUser = useSelector((state) => state.session.user);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (inputTime) => {
    const time = new Date(inputTime);
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}${ampm}`;
    return formattedTime;
  };

  const [newComment, setNewComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSignInSuccess = () => {
    closeModal();
  };

  const handleSubmit = async () => {
    if (newComment.trim() !== '') {
      await dispatch(composeComment({ event: selectedEvent._id, body: newComment, owner: currentUser }));
      setNewComment('');
      setShowCommentInput(false);
      dispatch(fetchComments());
    }
  };  

  const handleDelete = async (commentId) => {
    await dispatch(deleteCommentThunk(commentId));
    dispatch(fetchComments());
  }

  return (
    <>
      <Modal isOpen={showModal} onClose={closeModal}>
        <LoginForm onSuccess={handleSignInSuccess} />
      </Modal>

      <div className="comments-container">
        <div className="comments-content">
          <div className="comments-header">
            <hr />
            <div className="comments-button-container">
              <h2>Comments</h2>
              {!currentUser && (
                <button onClick={openModal}>Add Comment</button>
              )}
              {currentUser && (
                <button onClick={() => setShowCommentInput(true)}>Add Comment</button>
              )}
            </div>
            <hr />
          </div>

          {showCommentInput && (
            <div className="add-comment">
              <textarea
                rows="4"
                cols="50"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          )}

    <div className="comments-list">
        {selectedComments.map(comment => (
          <div key={comment?._id} className="comment-container">
            <div className="comment-content">
              <div className="comment-header">
                <Link className="commentee-circle" to={`/users/${comment?.owner?._id}`}>
                  <img src={comment?.owner?.profilePhotoUrl} />
                </Link>
                <p>{comment?.owner?.firstName} {comment?.owner?.lastName}</p>
              </div>

            <div className="comment-body">
              <p>{comment?.body}</p>
            </div>

              <div className="comment-footer">
              {comment?.owner?._id === currentUser?._id && (
                <div className="events-edit-delete">
                  <p className="button">Edit</p>
                  <p className="button" onClick={() => handleDelete(comment?._id)}>Delete</p>
                </div>
                )}
                <div className="comment-info">
                  <p>{formatDate(comment.createdAt)}</p>
                  <p>{formatTime(comment.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  </>
  )}