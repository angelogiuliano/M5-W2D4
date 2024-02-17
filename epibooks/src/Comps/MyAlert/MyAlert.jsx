import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import "./MyAlert.css";

function MyAlert({ message }) {
  const [show, setShow] = useState(true);
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setCountdown((n) => {
          if (n === 1) {
            clearInterval(interval);
            setShow(false);
            return 0;
          } else {
            return n - 1;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [show]);

  if (message === undefined) {
    return (
      <Alert show={show} className="alert" variant="primary">
        <Alert.Heading className="text-center">
          Welcome to EpiBOOKS
        </Alert.Heading>
        <p className="text-center">
          Enjoy your time here, feel free to search and review any book you see!
          😊
        </p>
        <hr />
      </Alert>
    );
  } else {
    setShow(true)
    return (
      <Alert show={show} className="alert" variant="primary">
        <Alert.Heading className="text-center">{message}</Alert.Heading>
      </Alert>
    );
  }
}

export default MyAlert;
