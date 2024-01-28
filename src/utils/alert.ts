import Swal from "sweetalert2";
import { AlertParameter } from "./type";

export const showSuccessAlert = (alertParameter?: AlertParameter) => {
  Swal.fire({
    icon: "success",
    title: alertParameter?.title || "Success",
    text: alertParameter?.text || "Operation successful.",
  });
};

export const showErrorAlert = (alertParameter?: AlertParameter) => {
  Swal.fire({
    icon: "error",
    title: alertParameter?.title || "Error!",
    text: alertParameter?.text || "Operation failed. Please try again.",
  });
};

export const showWarningAlert = (alertParameter?: AlertParameter) => {
  Swal.fire({
    icon: "warning",
    title: alertParameter?.title || "Warning!",
    text: alertParameter?.text || "Please try again.",
  });
};
