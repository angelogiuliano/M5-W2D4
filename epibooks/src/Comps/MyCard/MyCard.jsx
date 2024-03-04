import React from "react";
import { Card, Col } from "react-bootstrap";
import "./MyCard.css";
import { useNavigate } from "react-router-dom";

function MyCard({ title, price, imgSrc, category, asin, onClick, isSelected }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      if (isSelected) {
        onClick(null);
      } else {
        onClick(asin);
      }
    }
  };

  return (
    <Col sm={12} md={6} lg={3} className="mt-4">
      <Card className={"my-3"} onClick={handleClick}>
        <Card.Img
          data-testid="my-card-id"
          className={isSelected ? "card-img cardSelected" : "card-img"}
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
            <button
              onClick={() => navigate(`/book/${asin}`)}
              className="btn btn-primary"
            >
              Details
            </button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MyCard;
