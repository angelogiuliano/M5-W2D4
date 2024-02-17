import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function MySearchbar({ onChange }) {
  const [value, setValue] = useState("");
  const [hasBeenActive, setHasBeenActive] = useState(false);

  const handleChange = ({ target: { value } }) => {
    setValue(value);
    if (value.length > 0) setHasBeenActive(true);
    onChange(value);
  };

  return (
    <>
      <Row className="mt-4">
        <Col>
          <Form.Control
            type="text"
            placeholder="Search..."
            onChange={handleChange}
          />
        </Col>
      </Row>
    </>
  );
}

export default MySearchbar;
