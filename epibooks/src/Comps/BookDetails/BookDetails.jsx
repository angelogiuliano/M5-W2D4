import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyCommentArea from "../MyCommentArea/MyCommentArea";
const url = "https://striveschool-api.herokuapp.com/books/";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNmNjA2NzA0NTcyZjAwMTk0OTM5NDIiLCJpYXQiOjE3MDgwODk0NDcsImV4cCI6MTcwOTI5OTA0N30.4kLfeBI7P4IfRFuz6GSWjcR0NNWLy3Z83VDASt-3j1k";

export const BookDetails = () => {
  const [bookDetails, setBookDetails] = useState({});

  const { asin } = useParams();
  const getBookDetails = async (id) => {
    try {
      const response = await axios.get(url + id, {
        headers: { Authorization: `Bearer ${key}` },
      });
      setBookDetails(response.data);
      return await response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  useEffect(() => {
    getBookDetails(asin);
  }, [asin]);

  return (
    <div className="m-3">
      <h1>{bookDetails.title}</h1>
      <div className="book-details d-flex align-items-center justify-content-evenly">
        <div className="d-flex align-items-center gap-5">
          <img className="w-25" src={bookDetails.img} alt="" />
          <div className="book-details-text">
            <h3>Category: {bookDetails.category}</h3>
            <h3>Price: {bookDetails.price}$</h3>
          </div>
        </div>
        <MyCommentArea className="w-50" elementId={asin} />
      </div>
    </div>
  );
};
