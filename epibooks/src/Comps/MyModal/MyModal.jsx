import { useState, useEffect } from "react";
import { Modal, Button, Form, ListGroup } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import axios from "axios";

function MyModal({ show, handleClose, elementId }) {
  const key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQwOWQ1MmE3NzE2ODAwMTk3NzViYTkiLCJpYXQiOjE3MDgxNzA1NzgsImV4cCI6MTcwOTM4MDE3OH0.K7DUpJkqtq3ER_Fw2xCPolSmOyybJ_2Je_DmJ6PnZCQ";
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [ratingKey, setRatingKey] = useState(0);
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    show && fetchComments();
  }, [show]);

  const fetchComments = async () => {
    const url = `https://striveschool-api.herokuapp.com/api/books/${elementId}/comments/`;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${key}` },
      });
      const first2Comments = response.data.slice(0, 2);
      setComments(first2Comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSave = async () => {
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
        alert("Edited Correctly!");
      } else {
        url = "https://striveschool-api.herokuapp.com/api/comments/";
        givenComment.elementId = elementId;
        await axios.post(url, givenComment, {
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
        });
        alert("Comment and Rate Added Correctly!");
      }
      setComment("");
      setEditingCommentId(null);
      setRatingKey((prevKey) => prevKey + 1);
      fetchComments();
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
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
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const startEdit = (comment) => {
    setComment(comment.comment);
    setRating(comment.rate);
    setEditingCommentId(comment._id);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comment And Rate:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <h5>Comments from Users:</h5>
          <ListGroup>
            {comments.slice(0, 5).map((comment, i) => (
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
                  onClick={() => startEdit(comment)}
                >
                  Edit Rating
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(comment._id)}
                >
                  Delete Rating
                </Button>
              </ListGroup.Item>
            ))}
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
              <strong>Rate:</strong>
            </Form.Label>
            <Rating
              key={ratingKey}
              count={5}
              onChange={setRating}
              size={20}
              activeColor="#ffbf00"
              value={rating}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
