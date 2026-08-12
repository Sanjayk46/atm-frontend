import Swal from "sweetalert2";

export const showErrorAlert = (
  title,
  message
) => {
  Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonColor: "#2563eb",
  });
};

export const showSuccessAlert = (
  title,
  message
) => {
  Swal.fire({
    icon: "success",
    title,
    text: message,
    confirmButtonColor: "#2563eb",
  });
};

export const showWarningAlert = (
  title,
  message
) => {
  Swal.fire({
    icon: "warning",
    title,
    text: message,
    confirmButtonColor: "#2563eb",
  });
};