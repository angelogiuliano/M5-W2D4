import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function MySearchbar({ onChange }) {
  const [value, setValue] = useState("");

  const handleChange = (value) => {
    setValue(value);
    if (value.length > 0) {
      onChange(value);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search..."
            onChange={(e) => handleChange(e.target.value)}
          />
        </Col>
      </Row>
    </>
  );
}

export default MySearchbar;
