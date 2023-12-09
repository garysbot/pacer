
export default function EventComments({ selectedEvent }){
  return (
    <>
      <div className="comments-container">
            <div className="comments-content">
              <div className="comments-header">
                <h2>Comments</h2>
              </div>

              <div className="comments-list">
                <div className="comment-container">
                  <div className="comment-content">
                    {/* Visual Content In here */}
                    <div className="comment-header">
                      {/* Picture */}
                      <p>Gary Jiang</p> 
                      {/* Profile URL */}
                      <p>11:51 AM</p>
                    </div>
                    
                    <div className="comment-body">
                      <p>Hello lorem ipsum dolor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  );
}