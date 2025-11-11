// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../UseContext/useContext';

// const Dummy = () => {
//   const navigate = useNavigate();
//   const { setAccessToken, setSessionId } = useContext(UserContext);

//   const handleClick = () => {
//     const dummyToken = "dummy_token_5377";
//     const dummySession = "dummy_session_5377";

//     sessionStorage.setItem('access_token', dummyToken);
//     sessionStorage.setItem('session_id', dummySession);

//     setAccessToken(dummyToken);
//     setSessionId(dummySession);

  
//     navigate('/howitworks');
//   };

//   return (
//     <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
//       <button className="btn btn-primary btn-lg" onClick={handleClick}>
//        {loading ? 'Loading...' : 'Click Me'}
//       </button>
//     </div>
//   );
// };

// export default Dummy;



import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../UseContext/useContext";

const Dummy = () => {
  const navigate = useNavigate();
  const { setAccessToken, setSessionId } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    const dummyToken = "dummy_token_5377";
    const dummySession = "dummy_session_5377";

    // Store tokens in sessionStorage
    sessionStorage.setItem("access_token", dummyToken);
    sessionStorage.setItem("session_id", dummySession);

    // Update context safely
    setAccessToken?.(dummyToken);
    setSessionId?.(dummySession);

    // // Show success message
    // toast.success("Dummy session created successfully!", {
    //   position: "top-center",
    //   autoClose: 2000,
    // });

    // Redirect to next page
    setTimeout(() => {
      navigate("/howitworks");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <button
        className="btn btn-primary btn-lg px-5 py-2"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Please wait...
          </>
        ) : (
          "Click Me"
        )}
      </button>
    </div>
  );
};

export default Dummy;

