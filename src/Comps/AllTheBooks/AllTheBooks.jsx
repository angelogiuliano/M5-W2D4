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
    // logic needed to apply the cardSelected className in the MyCard component
    setSelectedAsin(asin);
    setSelected(asin);
  };

  useEffect(() => {
    // books in their initial "state"
    dispatch(getBooks());
  }, [dispatch]);

  const displayFilteredBooks = (bookCards) =>
  // function needed to map the books returning a MyCard component for each book in the returned data array
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
      {/* if books are loading, a loading Circle will appear */}
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
      {/* in case of any error, this message will be displayed */}
      {isError && (
        <Welcome
          message="Error, please try again later"
          show={false}
          variant="danger"
        />
      )}
      {/* if there's no loading, and no errors, we can return the data inside of this Row using the displayFilteredBooks function */}
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
