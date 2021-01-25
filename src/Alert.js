import React, { useEffect } from "react";

const Alert = ({ alert, closeAlert }) => {
  const { status, message } = alert;

  useEffect(() => {
    setTimeout(() => closeAlert(), 3000);
    return clearTimeout(() => closeAlert());
  });

  return (
    <>
      <p className={`alert alert-${status}`}>{message}</p>
    </>
  );
};

export default Alert;
