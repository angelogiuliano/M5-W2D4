import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import './MyAlert.css'

function MyAlert() {
  const [show, setShow] = useState(true);
  const [countdown, setCountdown] =useState(7);

  useEffect(() => {
    if (show) { 
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {         
            clearInterval(interval);
            setShow(false);
            return 0;
          } else {  
            return prevCountdown - 1;
          }
        });
      }, 1000); 
      return () => clearInterval(interval);
    }
  }, [show]);

  return (
    <>
      <Alert show={show} className='alert' variant="primary">
        <Alert.Heading className='text-center'>Welcome to EpiBOOKS</Alert.Heading>
        <p>
          Enjoy your time here, feel free to search and review any book you see! 
          <br />
          <span>Alert will disappear in <b>{countdown}</b> seconds!</span>
        </p>
        <hr />
      </Alert>
    </>
  );
}

export default MyAlert;