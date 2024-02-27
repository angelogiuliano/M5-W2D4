import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyFooter from "../MyFooter/MyFooter";
import MyNavbar from "../MyNav/MyNavbar";

export const NotFound = () => {
  const [count, setCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (!count) {
      navigate("/reactepibook");
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (
    <>
      <MyNavbar />
      <Container>
        <Row>
          <Col className="text-center m-5">
            <h2>Error</h2>
            <p>
              Content not available, you will be redirected to the homepage in{" "}
              {count} seconds.
            </p>
            <Button onClick={() => navigate("/reactepibook")}>Home</Button>
          </Col>
        </Row>
      </Container>
      <MyFooter />
    </>
  );
};
