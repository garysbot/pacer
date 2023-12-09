
export default function EventComments({ selectedEvent }){
  return (
    <>
      <div className="comments-container">
            <div className="comments-content">
              <div className="comments-header">
                <hr></hr>
                <h2>Comments</h2>
                <hr></hr>
              </div>

              <div className="comments-list">
                <div className="comment-container">
                  <div className="comment-content">
                    {/* Visual Content In here */}
                    <div className="comment-header">
                      {/* Picture */}
                      <p>Gary Jiang</p> 
                      {/* Profile URL */}
                    </div>
                    
                    <div className="comment-body">
                      <p>Hello lorem ipsum dolor Hello lorem ipsum dolor Hello lorem ipsum dolor Hello lorem ipsum dolor Hello lorem ipsum dolor Hello lorem ipsum dolor Hello lorem ipsum dolor Hello lorem ipsum dolor Hello lorem ipsum dolor Hello lorem ipsum dolor Hello lorem ipsum dolor Hello lorem ipsum dolor Hello lorem ipsum dolor Hello lorem ipsum dolor Hello lorem ipsum dolor Hello lorem ipsum dolor </p>
                    </div>

                    <div className="comment-footer">
                      <p>12:01 AM</p>
                      {/* Comment Time Stamp */}
                      <p className="button">Edit</p>
                      {/* Edit Comment Button */}
                      <p className="button">Delete</p>
                      {/* Delete Comment Button */}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  );
}