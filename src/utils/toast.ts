import { toast } from "react-hot-toast";
export const toastSuccess = (message: string) => {
  toast.success(message, {
    style: {
      border: "1px solid #008000",
      padding: "16px",
      color: "#FFFFFF",
      backgroundColor: "#008000",
    },
    iconTheme: {
      primary: "#FFFFFF",
      secondary: "#008000",
    },
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    style: {
      border: "1px solid #FF0000",
      padding: "16px",
      color: "#FFFFFF",
      backgroundColor: "#FF0000",
    },
    iconTheme: {
      primary: "#FFFFFF",
      secondary: "#FF0000",
    },
  });
};
