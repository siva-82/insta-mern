import React, { useState } from "react";

const Comments = (post) => {
    const [showComment, setShowComment] = useState(false);

    return (
    <div >
      <div className="comments">
       {showComment&& <div
          className="d-flex justify-content-start align-items-center"
          style={{ height: "50px" }}
        >
          Comments
        </div>}

        {showComment&& post?.comments
          ?.map((c) => {
            return (
              <>
                <div
                  className="d-flex justify-content-start align-items-center"
                  style={{ height: "50px" }}
                >
                  <div style={{ height: "50px" }} className="mx-2">
                    {c.name} :
                  </div>
                  <div style={{ height: "50px" }}>{c.comment}</div>
                </div>
              </>
            );
          })
          .reverse()}
      </div>
      {post?.comments?.length == 0 && 
        <div
          style={{
            height: "50px",
            marginTop:'10px'
          }}
        >
          No Comments yet..
        </div>
      }
      {post?.comments?.length > 0 && (
              <div
                style={{ height: "50px", cursor: "pointer" }}
                onClick={() => setShowComment((prev) => !prev)}
              >
                {!showComment ? "Show Comments" : "Hide Comments"}
              </div>
            )}
    </div>
  );
};

export default Comments;
