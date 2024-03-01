import axios from "axios";
import { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";
import { Button, Form, ListGroup } from "react-bootstrap";

const MyCommentArea = ({ elementId }) => {
  const key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQwOWQ1MmE3NzE2ODAwMTk3NzViYTkiLCJpYXQiOjE3MDgxNzA1NzgsImV4cCI6MTcwOTM4MDE3OH0.K7DUpJkqtq3ER_Fw2xCPolSmOyybJ_2Je_DmJ6PnZCQ";
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [placeHolder, setPlaceHolder] = useState("1 - 5");
  const [error, setError] = useState("");

  useEffect(() => {
    elementId && fetchComments();
  }, [elementId]);

  useEffect(() => {
    error && alert(error);
  }, [error]);

  const fetchComments = async () => {
    const url = `https://striveschool-api.herokuapp.com/api/books/${elementId}/comments/`;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${key}` },
      });
      const first2Comments = response.data.reverse().slice(0, 5);
      setComments(first2Comments);
      setError("");
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError(err.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let url = `https://striveschool-api.herokuapp.com/api/comments/`;
    const givenComment = {
      comment: comment,
      rate: rating,
    };

    try {
      if (editingCommentId) {
        url += editingCommentId;
        await axios.put(url, givenComment, {
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
        });
      } else {
        url = "https://striveschool-api.herokuapp.com/api/comments/";
        givenComment.elementId = elementId;
        await axios.post(url, givenComment, {
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
        });
      }
      setComment("");
      setEditingCommentId(null);
      setRating(0);
      alert("Sent correctly!");
      setError("");
      fetchComments();
    } catch (err) {
      console.error("Error saving comment:", err.message);
      setError(err.message);
    }
  };

  const handleDelete = async (e, commentId) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!isConfirmed) {
      return;
    }
    const deleteUrl = `https://striveschool-api.herokuapp.com/api/comments/${commentId}`;

    try {
      await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });

      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      setComments(updatedComments);
      fetchComments();
      alert("Deleted correctly");
      setError("");
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError(err.message);
    }
  };

  const handleEdit = (e, comment) => {
    console.log(comment);
    setComment(comment.comment);
    setRating(comment.rate);
    setEditingCommentId(comment._id);
    // alert("Edited correctly");
    setError("");
  };

  return elementId ? (
    <Form>
      <h5>Comments from other users:</h5>
      <ListGroup>
        {comments.length > 0 ? (
          comments.slice(0, 5).map((comment, i) => (
            <ListGroup.Item key={i}>
              <div>
                <b>Author:</b> {comment.author}
              </div>
              <div>
                <b>Rating: {comment.rate}/5 </b>
              </div>
              <div>
                <b>Comment:</b> {comment.comment}
              </div>
              <Button
                variant="primary"
                className="my-2"
                size="sm"
                onClick={(e) => handleEdit(e, comment)}
              >
                Edit Rating
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => handleDelete(e, comment._id)}
              >
                Delete Rating
              </Button>
            </ListGroup.Item>
          ))
        ) : (
          <div>
            <div className="d-flex justify-content-center my-5">
              <Circles
                height="50"
                width="50"
                color="#000"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
            <p>No comments found, try again later</p>
          </div>
        )}
      </ListGroup>
      <Form.Group className="my-2" controlId="commentTextArea">
        <Form.Label>
          <strong>Add Comment:</strong>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-1">
        <Form.Label>
          <strong>Rate:</strong> ({placeHolder})
          <br />
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={1}
          placeholder="1 - 5"
          onChange={(e) => {
            if (
              (e.target.value > 0 && e.target.value < 6) ||
              e.target.value === ""
            ) {
              setPlaceHolder("1 - 5");
              setRating(e.target.value);
              setError("");
            } else {
              setPlaceHolder("Please insert a number between 1 and 5");
              setError("Please insert a number between 1 and 5");
            }
          }}
          value={rating ? rating : ""}
        />
      </Form.Group>
      <Form.Group>
        <Button variant="primary" onClick={(e) => handleSave(e)}>
          Save
        </Button>
      </Form.Group>
    </Form>
  ) : (
    <div className="mt-5 d-flex text-center">
      <h3 className="w-100">Please select a card 😊</h3>
    </div>
  );
};

export default MyCommentArea;
