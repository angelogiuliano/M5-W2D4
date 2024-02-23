import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import "./MyCard.css";

function MyCard({ title, price, imgSrc, category, asin, onClick }) {
  const [isSelected, setIsSelected] = useState(false);

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
        </Card>
      </Col>
    </>
  );
}

export default MyCard;
