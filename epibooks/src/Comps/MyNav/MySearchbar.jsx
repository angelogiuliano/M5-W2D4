import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function MySearchbar({ onChange }) {
  const handleChangeFunction = (value) => {
    if (value.length > 0) {
      return onChange(value);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search..."
            onChange={(e) => handleChangeFunction(e.target.value)}
          />
        </Col>
      </Row>
    </>
  );
}

export default MySearchbar;
