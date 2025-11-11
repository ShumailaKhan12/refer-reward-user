// import React, { useContext, useState } from "react";
// import "../../App.scss";
// import { useParams } from "react-router-dom";
// import contract from "../../assets/Images/acknowledgement/contract.png";
// import X from "../../assets/Images/invite-modal/X.png";
// import AcknowledgmentSuccessModal from "./AcknowledgmentSuccessModal";
// import AcknowledgmentDeclineModal from "./AcknowledgmentDeclineModal";
// import { postData } from "../../services/api";
// import { UserContext } from "../../UseContext/useContext";
// // Toast Messages
// import { toastError } from "../../utils/toster";

// const AcknowlegmentModal = ({ onClose }) => {
//   // UseStates
//   // "ack" = main acknowledgement, "success" = accepted, "decline" = declined
//   const [step, setStep] = useState("ack");
//   const [loading, setLoading] = useState(false);
//   const [apiMessage, setApiMessage] = useState("");

//   // UseParams
//   // const { referrerId, mobile, name, date } = useParams();

//   // USeContext
//   const { userData, ContextHomeDataAPI } = useContext(UserContext);
//   const ref_id = ContextHomeDataAPI?.user_data?.Id;
//   const mobile_number = ContextHomeDataAPI?.user_data?.mobile_number;

//   // API Function

//   const handleAccept = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         acknowledgemenet_Status: "Accepted",
//       };
//       const response = await postData(
//         `/referral/acknowledge/${ref_id}/${mobile_number}`,
//         payload
//       );
//       console.log("Acknowledge Response:", response);
//       setApiMessage(response?.message || "Acknowledgement successful!");
//       setStep("success"); // move to success modal
//     } catch (error) {
//       console.error("Acknowledge Error:", error?.error);
//       toastError(error?.error || "Something went wrong");
//       // setApiMessage(error?.error || "Something went wrong");
//       // setStep("success"); // optional → show decline modal if API fails
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (step === "success") {
//     return (
//       <AcknowledgmentSuccessModal
//         onClose={onClose}
//         onContinue={onClose}
//         message={apiMessage}
//       />
//     );
//   }

//   if (step === "decline") {
//     return <AcknowledgmentDeclineModal onClose={onClose} />;
//   }

//   return (
//     <div
//       className="modal fade show overlay overflow-hidden"
//       tabIndex="-1"
//       role="dialog"
//       aria-hidden="true"
//       style={{ display: "block" }}
//     >
//       <div
//         className="modal-dialog overflow-auto badge modal-dialog-centered my-custom-dialog text-primary-color"
//         role="document"
//       >
//         <div className="modal-content custom-modal-content">
//           {/* Close */}
//           <button className="close-btn" onClick={onClose}>
//             <img src={X} alt="close" />
//           </button>

//           {/* Top image */}
//           <div className="text-center mt-3">
//             <img src={contract} alt="contract" />
//           </div>

//           {/* Header */}
//           <div className="modal-header justify-content-center border-0">
//             <h5 className="modal-title montserrat-semibold font-24 text-primary-color">
//               Acknowledgement
//             </h5>
//           </div>

//           {/* Body */}
//           <div className="modal-body text-start  montserrat text-primary-color">
//             {/* <p className="font-14"><strong>Referral ID -</strong> SAK123</p> */}
//             <p className="font-14">
//               <strong>Date -</strong> {date}
//             </p>

//             <p className="fw-bold mb-1 font-14">Details of Referrer -</p>
//             <p className="font-14 flex-wrap">
//               The invite has been sent by <strong>{name}</strong>, holding
//               mobile number{" "}
//               <strong>
//                 <a href="tel:9685492401">{mobile}</a>
//               </strong>{" "}
//               {/* and email ID{" "}
//               <strong><a href="mailto:sak123@gmail.com">sak123@gmail.com</a></strong>{" "}
//               with referral code <strong>WESAK11</strong>. */}
//             </p>

//             <p className="fw-bold font-14">Purpose of Invitation -</p>
//             <p className="mb-0 font-14">This invitation has been sent for:</p>
//             <p className="mb-0 font-14">
//               → Inviting the Referred Person to join
//             </p>
//             <p className="mb-0 font-14">→ Availing referral rewards</p>
//             <p className="font-14">→ Accessing offers and discounts.</p>

//             <label className="checkbox-label">
//               <input type="checkbox" name="permission" required />
//               <span className="montserrat-bold font-14 text-primary-color">
//                 I hereby acknowledge that I have joined/registered through the
//                 referral of the above individual.
//               </span>
//             </label>
//           </div>

//           {/* Footer */}
//           <div className="modal-footer justify-content-center border-0">
//             <button
//               type="button"
//               className="btn btn-decline btn-secondary me-2 "
//               onClick={() => setStep("decline")}
//             >
//               Decline
//             </button>
//             <button
//               type="button"
//               className="btn btn-primary bg-blue"
//               // onClick={() => setStep("success")}
//               onClick={handleAccept}
//             >
//               {loading ? "Processing..." : "Accept"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AcknowlegmentModal;

import React, { useContext, useState, useEffect } from "react";
import "../../App.scss";
import { useParams, useNavigate } from "react-router-dom";
import contract from "../../assets/Images/acknowledgement/contract.png";
import X from "../../assets/Images/invite-modal/X.png";
import AcknowledgmentSuccessModal from "./AcknowledgmentSuccessModal";
import AcknowledgmentDeclineModal from "./AcknowledgmentDeclineModal";
import { postData } from "../../services/api";
import { UserContext } from "../../UseContext/useContext";
import { toastError } from "../../utils/toster";
import dayjs from "dayjs";

const AcknowlegmentModal = ({ onClose }) => {
  const { data } = useParams(); // "5377_7224851684_MFD_PARTNER_24102025"
  const [referralData, setReferralData] = useState({
    referrerId: "",
    mobile: "",
    name: "",
    date: "",
  });

  useEffect(() => {
    if (data) {
      const parts = data.split("_");
      setReferralData({
        referrerId: parts[0],
        mobile: parts[1],
        name: parts[2],
        date: parts[4],
      });
    }
  }, [data]);

  const [step, setStep] = useState("ack");
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const { userData, ContextHomeDataAPI } = useContext(UserContext);
  const ref_id = ContextHomeDataAPI?.user_data?.Id;
  const mobile_number = ContextHomeDataAPI?.user_data?.mobile_number;

  console.log(mobile_number, "mobile_number");
  const navigate = useNavigate();

  const handleAccept = async () => {
    setLoading(true);
    try {
      const payload = {
        acknowledgemenet_Status: "Accepted",
      };
      const response = await postData(
        `/referral/acknowledge/${ref_id}/${referralData.mobile}`,
        payload
      );
      setApiMessage(response?.message || "Acknowledgement successful!");
      setStep("success");
    } catch (error) {
      console.error("Acknowledge Error:", error?.error);
      toastError(error?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <AcknowledgmentSuccessModal
        onClose={onClose}
        onContinue={onClose}
        message={apiMessage}
      />
    );
  }

  if (step === "decline") {
    return <AcknowledgmentDeclineModal onClose={onClose} />;
  }

  return (
    <div
      className="modal fade show overlay overflow-hidden"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <div
        className="modal-dialog overflow-auto badge modal-dialog-centered my-custom-dialog text-primary-color"
        role="document"
      >
        <div className="modal-content custom-modal-content">
          <button
            className="close-btn"
            onClick={() => {
              setStep("ack");
              onClose();
            }}
          >
            <img src={X} alt="close" />
          </button>

          <div className="text-center mt-3">
            <img src={contract} alt="contract" />
          </div>

          <div className="modal-header justify-content-center border-0">
            <h5 className="modal-title montserrat-semibold font-24 text-primary-color">
              Acknowledgement
            </h5>
          </div>

          <div className="modal-body text-start montserrat text-primary-color">
            {/* <p className="font-14">
              <strong>Date -</strong>{" "}
              {dayjs(referralData.date, "DDMMYYYY").format("DD/MM/YYYY")}
            </p> */}

            <p className="font-14">
              <strong>Date -</strong>
              {referralData.date
                ? `${referralData.date.slice(0, 2)}/${referralData.date.slice(
                    2,
                    4
                  )}/${referralData.date.slice(4)}`
                : ""}
            </p>

            <p className="fw-bold mb-1 font-14">Details of Referrer -</p>
            <p className="font-14 flex-wrap">
              The invite has been sent by <strong>{referralData.name}</strong>,
              holding mobile number{" "}
              <strong>
                <a href={`tel:${mobile_number}`}>{mobile_number}</a>
              </strong>
            </p>

            <p className="fw-bold font-14">Purpose of Invitation -</p>
            <p className="mb-0 font-14">This invitation has been sent for:</p>
            <p className="mb-0 font-14">
              → Inviting the Referred Person to join
            </p>
            <p className="mb-0 font-14">→ Availing referral rewards</p>
            <p className="font-14">→ Accessing offers and discounts.</p>

            <label className="checkbox-label">
              <input type="checkbox" name="permission" required />
              <span className="montserrat-bold font-14 text-primary-color">
                I hereby acknowledge that I have joined/registered through the
                referral of the above individual.
              </span>
            </label>
          </div>

          <div className="modal-footer justify-content-center border-0">
            <button
              type="button"
              className="btn btn-decline btn-secondary me-2"
              onClick={() => setStep("decline")}
            >
              Decline
            </button>
            <button
              type="button"
              className="btn btn-primary bg-blue"
              onClick={handleAccept}
            >
              {loading ? "Processing..." : "Accept"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcknowlegmentModal;
