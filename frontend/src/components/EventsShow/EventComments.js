import { fetchComments } from "../../store/comments"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function EventComments({ selectedEvent }){

const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchComments());
}, [dispatch]);

const comments = useSelector((state) => state.comments?.all);
const selectedComments = Object.values(comments).filter(comment => comment.event === selectedEvent?._id);
const currentUser = useSelector((state) => state.session.user)

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

return (
  <>
    <div className="comments-container">
      <div className="comments-content">
        <div className="comments-header">
          <hr />
          <div className="comments-button-container">
            <h2>Comments</h2>
            <button>Add Comment</button>
          </div>
          <hr />
        </div>

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
                    <p className="button">Delete</p>
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