import { toast, ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Configure toast defaults (optional)
const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Export the configured ToastContainer component
export const AppToastContainer = () => <ReactToastContainer {...toastConfig} />;

// Export toast functions
export const showToast = {
  success: (message) =>
    toast.success(message, {
      ...toastConfig,
      className: "toast-success",
      icon: "✅",
    }),
  error: (message) =>
    toast.error(message, {
      ...toastConfig,
      className: "toast-error",
      icon: "❌",
    }),
  info: (message) =>
    toast.info(message, {
      ...toastConfig,
      className: "toast-info",
      icon: "ℹ️",
    }),
  warning: (message) =>
    toast.warning(message, {
      ...toastConfig,
      className: "toast-warning",
      icon: "⚠️",
    }),
};
