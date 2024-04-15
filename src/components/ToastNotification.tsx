import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Color } from "@mui/material";

interface ToastNotificationProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  open,
  onClose,
  message,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
