import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import "./MyAlert.css";

function MyAlert({variant, message}) {
  const [count, setCount] = useState(10);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setCount((n) => {
          if (n === 1) {
            clearInterval(interval);
            setShow(false);
            setCount(0);
            return 0;
          } else {
            return n - 1;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [show]);

  return count && show && !variant ? (
    <Alert show={show} className="alert" variant="primary">
      <Alert.Heading className="text-center">Welcome to EpiBOOKS</Alert.Heading>
      <p className="text-center">
        Enjoy your time here, feel free to search and review any book you see!
        😊
      </p>
      <hr />
    </Alert>
  ) : ( variant && message ?
    <Alert show={true} className="alert w-75" variant={variant}>
      <p className="text-center">
        {message}
      </p>
    </Alert> : ""
  );
}

export default MyAlert;
