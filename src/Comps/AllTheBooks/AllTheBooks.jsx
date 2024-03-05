// AllTheBooks.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import MyCard from "../MyCard/MyCard";
import Row from "react-bootstrap/Row";
import Welcome from "../Welcome/Welcome";
import {
  allBooks,
  getBooks,
  isAllBooksError,
  isAllBooksLoading,
} from "../../reducers/books/booksSlice";
import { Circles } from "react-loader-spinner";
import "./AllTheBooks.css";
import MyCommentArea from "../MyCommentArea/MyCommentArea";

const AllTheBooks = () => {
  const [selectedAsin, setSelectedAsin] = useState(null);
  const [selected, setSelected] = useState(null);
  const books = useSelector(allBooks);
  const isLoading = useSelector(isAllBooksLoading);
  const isError = useSelector(isAllBooksError);
  const dispatch = useDispatch();

  const handleCardClick = (asin) => {
    setSelectedAsin(asin);
    setSelected(asin);
  };

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const displayFilteredBooks = (bookCards) =>
    bookCards.map((book) => (
      <MyCard
        key={book.asin}
        title={book.title}
        price={book.price}
        imgSrc={book.img}
        category={book.category}
        asin={book.asin}
        onClick={handleCardClick}
        isSelected={selected === book.asin}
      />
    ));

  return (
    <div>
      {isLoading && (
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
      )}
      {isError && (
        <Welcome
          message="Error, please try again later"
          show={false}
          variant="danger"
        />
      )}
      {!isLoading && !isError && (
        <div
          data-testid="container-test"
          className="d-flex justify-content-center"
        >
          <Container className="w-50 border-r">
            <Row>
              {books.length > 0 ? (
                displayFilteredBooks(books)
              ) : (
                <p className="my-3">No books found, try something else!</p>
              )}
            </Row>
          </Container>
          <Container className="w-50 align-items-center border-l">
            <MyCommentArea elementId={selectedAsin} />
          </Container>
        </div>
      )}
    </div>
  );
};

export default AllTheBooks;
