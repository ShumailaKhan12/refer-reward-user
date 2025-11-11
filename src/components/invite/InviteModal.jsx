// import React, { useState, useContext } from "react";
// import "../../App.scss";
// import X from "../../assets/Images/invite-modal/X.png";
// import Button from "../button";
// import InviteSuccessModal from "./InviteSuccessModal";
// import { UserContext } from "../../UseContext/useContext";
// import { toastError } from "../../utils/toster";
// import { useForm } from "react-hook-form";
// import dayjs from "dayjs";
// import { postData } from "../../services/api"; // Make sure this is imported

// const baseUrl = "https://siwtestpanel.com"; // Replace with your actual base URL

// const InviteModal = ({ isOpen, onClose }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const [successModalOpen, setSuccessModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [apiMessage, setApiMessage] = useState("");
//   const [messageApiHeading, setApiMessageHeading] = useState("");

//   const { ContextHomeDataAPI, accessToken, sessionId } =
//     useContext(UserContext);

//   // Generate WhatsApp link with complete message

//   const inviteLink = `${baseUrl}/referral`;

//   const generateWhatsAppLink = (inviteLink) => {
//     const message = `Hey! I’m using Wealth Elite and thought you’d love it too! Join using my invite and enjoy exclusive offers on their products.\n\nUse my invitation link: ${inviteLink}`;
//     const encodedMessage = encodeURIComponent(message);
//     return `https://wa.me/?text=${encodedMessage}`;
//   };

//   const whatsappLink = generateWhatsAppLink(inviteLink);

//   const onSubmit = async (formData) => {
//     setLoading(true);
//     try {
//       if (!ContextHomeDataAPI?.user_data?.Id) {
//         toastError("User data not found.");
//         return;
//       }

//       // Prepare payload for backend API
//       const payload = {
//         referrer_id: ContextHomeDataAPI.user_data.Id,
//         referee_name: formData.name,
//         arn: formData.arn,
//         mobile_number: formData.mobile,
//         product: formData.product || null,
//         permission: formData.permission,
//       };

//       const response = await postData(
//         `/referral_program/referral/send_invitation?token=${accessToken}&session_id=${sessionId}`,
//         payload
//       );

//       if (!response?.success) {
//         toastError(response?.message || "Something went wrong.");
//         return;
//       }

//       const referrerId = ContextHomeDataAPI.user_data.Id;
//       const mobile = formData.mobile;
//       const name = formData.name;

//       // Generate invite link
//       const safe = ContextHomeDataAPI.user_data.name;
//       const safeName = encodeURIComponent(safe.trim().replace(/\s+/g, "_"));
//       const date = dayjs().format("DD-MM-YYYY");
//       const inviteLink = `${baseUrl}/referral_acknowledgement/${referrerId}/${mobile}/${safeName}/${date}`;

//       // Generate WhatsApp link
//       const whatsappLink = generateWhatsAppLink(inviteLink);

//       // Open WhatsApp in new tab
//       window.open(whatsappLink, "_blank", "noopener,noreferrer");

//       setApiMessageHeading(true);
//       setApiMessage("Invitation sent successfully!");
//       setSuccessModalOpen(true);
//       reset();
//     } catch (error) {
//       console.error(error);
//       toastError(error?.message || "Failed to send invitation");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       {!successModalOpen && (
//         <div
//           className="modal fade show overlay modal-overlay"
//           style={{ display: "block" }}
//         >
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content custom-modal-content bg-gradient-color px-2">
//               <button className="close-btn" onClick={onClose}>
//                 <img src={X} alt="close" />
//               </button>

//               <div className="modal-header">
//                 <h2 className="modal-title font-30 montserrat-semibold text-primary-color">
//                   Invite a MFD
//                 </h2>
//               </div>

//               <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="modal-body">
//                   {/* Referee Name */}
//                   <div className="form-group mb-3">
//                     <label className="font-16 montserrat-medium text-primary-color">
//                       Referee Name
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       {...register("name", { required: "Name is required" })}
//                     />
//                     {errors.name && (
//                       <span className="text-danger">{errors.name.message}</span>
//                     )}
//                   </div>

//                   {/* <div>
//                     <a href={whatsappLink}>Hello</a>
//                   </div> */}

//                   {/* Referee Mobile */}
//                   <div className="form-group mb-3">
//                     <label className="font-16 montserrat-medium text-primary-color">
//                       Referee Mobile
//                     </label>
//                     <input
//                       type="text"
//                       maxLength={10}
//                       className="form-control"
//                       {...register("mobile", {
//                         required: "Mobile is required",
//                         pattern: {
//                           value: /^[6-9]\d{9}$/,
//                           message: "Invalid mobile number",
//                         },
//                       })}
//                     />
//                     {errors.mobile && (
//                       <span className="text-danger">
//                         {errors.mobile.message}
//                       </span>
//                     )}
//                   </div>

//                   {/* Referrer Firm / ARN */}
//                   <div className="form-group mb-3">
//                     <label className="font-16 montserrat-medium text-primary-color">
//                       Referrer Firm / ARN
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       {...register("arn", { required: "ARN is required" })}
//                     />
//                     {errors.arn && (
//                       <span className="text-danger">{errors.arn.message}</span>
//                     )}
//                   </div>

//                   {/* Product of Interest */}
//                   <div className="form-group mt-2 mb-1">
//                     <label className="font-16 montserrat-medium text-primary-color">
//                       Product of Interest (Optional)
//                     </label>
//                     <select className="form-select" {...register("product")}>
//                       <option value="">Select</option>
//                       <option value="product1">Product 1</option>
//                       <option value="product2">Product 2</option>
//                     </select>
//                   </div>

//                   {/* Permission Checkbox */}
//                   <label className="checkbox-label font-16 montserrat-medium text-primary-color">
//                     <input
//                       type="checkbox"
//                       {...register("permission", { required: true })}
//                     />
//                     I Confirm I Have Permission To Share Referee Details
//                   </label>
//                 </div>

//                 <div className="modal-footer">
//                   <Button
//                     label={!loading ? "Send Invite" : "Loading"}
//                     type="submit"
//                     className="btn-custom bg-blue text-white font-16 montserrat-semibold"
//                   />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {successModalOpen && (
//         <InviteSuccessModal
//           setSuccessModalOpen={setSuccessModalOpen}
//           onClose={onClose}
//           messageHeading={
//             messageApiHeading
//               ? "Invitation Sent Successfully!"
//               : "Invitation Failed!"
//           }
//           message={apiMessage}
//         />
//       )}
//     </>
//   );
// };

// export default InviteModal;

import React, { useState, useContext } from "react";
import "../../App.scss";
import X from "../../assets/Images/invite-modal/X.png";
import Button from "../button";
import InviteSuccessModal from "./InviteSuccessModal";
import { UserContext } from "../../UseContext/useContext";
import { toastError } from "../../utils/toster";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { postData } from "../../services/api";

const baseUrl = "https://siwtestpanel.com"; // Replace with your base URL

// const baseUrl = "https://localhost:5173";

const InviteModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [messageApiHeading, setApiMessageHeading] = useState("");

  const { ContextHomeDataAPI, accessToken, sessionId } =
    useContext(UserContext);

  // ✅ Generate WhatsApp link (decoded link, only text encoded)
  const generateWhatsAppLink = (
    baseUrl,
    referrerId,
    mobile,
    safeName,
    date
  ) => {
    const inviteLink = `${baseUrl}/referral_acknowledgement/${referrerId}_${mobile}_${safeName}_${date}`;

    const messageText = encodeURIComponent(
      `Hey! I’m using Wealth Elite and thought you’d love it too! Join using my invite and enjoy exclusive offers on their products.\n\nUse my invitation link: `
    );
    return `https://wa.me/?text=${messageText}${inviteLink}`;
  };

  // ✅ Detect mobile or desktop for proper WhatsApp opening
  const openWhatsApp = (link) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const finalLink = isMobile
      ? link.replace("https://wa.me/", "whatsapp://send?")
      : link;
    window.open(finalLink, "_blank", "noopener,noreferrer");
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      if (!ContextHomeDataAPI?.user_data?.Id) {
        toastError("User data not found.");
        return;
      }

      // Prepare payload for backend API
      const payload = {
        referrer_id: ContextHomeDataAPI.user_data.Id,
        referee_name: formData.name,
        arn: formData.arn,
        mobile_number: formData.mobile,
        product: formData.product || null,
        permission: formData.permission,
      };
      console.log(payload,"payload")

      const response = await postData(
        `/referral_program/referral/send_invitation?token=${accessToken}&session_id=${sessionId}`,
        payload
      );

      if (!response?.success) {
        toastError(response?.message || "Something went wrong.");
        return;
      }

      // Prepare WhatsApp link
      const referrerId = ContextHomeDataAPI.user_data.Id;
      const mobile = formData.mobile;
      const safeName = encodeURIComponent(
        ContextHomeDataAPI.user_data.name.trim().replace(/\s+/g, "_")
      );
      const date = dayjs().format("DD-MM-YYYY").replace(/-/g, "");

      const whatsappLink = generateWhatsAppLink(
        baseUrl,
        referrerId,
        mobile,
        safeName,
        date
      );


      // ✅ Open WhatsApp (  link visible)
      openWhatsApp(whatsappLink);

      setApiMessageHeading(true);
      setApiMessage("Invitation sent successfully!");
      setSuccessModalOpen(true);
      reset();
    } catch (error) {
      console.error(error);
      toastError(error?.message || "Failed to send invitation");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {!successModalOpen && (
        <div
          className="modal fade show overlay modal-overlay"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content custom-modal-content bg-gradient-color px-2">
              <button className="close-btn" onClick={onClose}>
                <img src={X} alt="close" />
              </button>

              <div className="modal-header">
                <h2 className="modal-title font-30 montserrat-semibold text-primary-color">
                  Invite a MFD
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-body">
                  {/* Referee Name */}
                  <div className="form-group mb-3">
                    <label className="font-16 montserrat-medium text-primary-color">
                      Referee Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <span className="text-danger">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Referee Mobile */}
                  <div className="form-group mb-3">
                    <label className="font-16 montserrat-medium text-primary-color">
                      Referee Mobile
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      className="form-control"
                      {...register("mobile", {
                        required: "Mobile is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Invalid mobile number",
                        },
                      })}
                    />
                    {errors.mobile && (
                      <span className="text-danger">
                        {errors.mobile.message}
                      </span>
                    )}
                  </div>

                  {/* Referrer Firm / ARN */}
                  <div className="form-group mb-3">
                    <label className="font-16 montserrat-medium text-primary-color">
                      Referrer Firm / ARN
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("arn", { required: "ARN is required" })}
                    />
                    {errors.arn && (
                      <span className="text-danger">{errors.arn.message}</span>
                    )}
                  </div>

                  {/* Product of Interest */}
                  <div className="form-group mt-2 mb-1">
                    <label className="font-16 montserrat-medium text-primary-color">
                      Product of Interest (Optional)
                    </label>
                    <select className="form-select" {...register("product")}>
                      <option value="">Select</option>
                      <option value="product1">Product 1</option>
                      <option value="product2">Product 2</option>
                    </select>
                  </div>

                  {/* Permission Checkbox */}
                  <label className="checkbox-label font-16 montserrat-medium text-primary-color">
                    <input
                      type="checkbox"
                      {...register("permission", { required: true })}
                    />
                    I Confirm I Have Permission To Share Referee Details
                  </label>
                </div>

                <div className="modal-footer">
                  <Button
                    label={!loading ? "Send Invite" : "Loading..."}
                    type="submit"
                    className="btn-custom bg-blue text-white font-16 montserrat-semibold"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {successModalOpen && (
        <InviteSuccessModal
          setSuccessModalOpen={setSuccessModalOpen}
          onClose={onClose}
          messageHeading={
            messageApiHeading
              ? "Invitation Sent Successfully!"
              : "Invitation Failed!"
          }
          message={apiMessage}
        />
      )}
    </>
  );
};

export default InviteModal;
