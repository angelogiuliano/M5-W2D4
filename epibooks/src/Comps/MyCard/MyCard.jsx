import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import "./MyCard.css";
import { useNavigate } from "react-router-dom";

function MyCard({ title, price, imgSrc, category, asin, onClick }) {
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate()

  const handleClick = () => {
    setIsSelected(!isSelected);
    if (onClick) {
      if (!isSelected === true) {
        onClick(asin);
      } else onClick();
    }
  };

  return (
    <>
      <Col sm={12} md={6} lg={3} className="mt-4">
        <Card className={`my-3`}>
          <Card.Img
            onClick={handleClick}
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
              <button onClick={() => navigate(`/book/${asin}`)} className="btn btn-primary">Details</button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default MyCard;
