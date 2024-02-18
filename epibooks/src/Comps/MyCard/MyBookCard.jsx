import React, { useState } from "react";
import { Card, Col, Button } from "react-bootstrap";
import "./MyBookCard.css";
import MyModal from "../MyModal/MyModal";

function MyBookCard({ title, price, imgSrc, category, asin, onClick }) {
  const [isSelected, setIsSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    if (onClick) {
      onClick();
    }
  };

  return (
    <Col sm={12} md={6} lg={3} className="mt-4">
      <Card className={`my-3`} onClick={handleClick}>
        <Card.Img
          className={isSelected ? "cardSelected card-img" : "card-img"}
          variant="top"
          src={imgSrc}
        />
        <Card.Body>
          <Card.Title className="text-truncate">{title}</Card.Title>
          <div className="list-group-flush">
            <p>
              <b>Category:</b> {category}
            </p>
            <p>
              <b>Price:</b> {price}$
            </p>
          </div>
        </Card.Body>
        {isSelected && (
          <Card.Body>
            <Button
              variant="primary"
              className="w-100"
              onClick={handleShowModal}
            >
              Add your review
            </Button>
          </Card.Body>
        )}
      </Card>
      <MyModal
        show={showModal}
        handleCloseModal={handleCloseModal}
        elementId={asin}
      />
    </Col>
  );
}

export default MyBookCard;
