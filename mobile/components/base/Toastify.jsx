import React from "react";
import Toast, { BaseToast } from "react-native-toast-message";

export const Toastify = () => {
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "#07bc0c", backgroundColor: "#07bc0c" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text2Style={{
          fontSize: 14,
          color: "white",
        }}
      />
    ),
    error: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "#e74c3c", backgroundColor: "#e74c3c" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text2Style={{
          fontSize: 14,
          color: "white",
        }}
      />
    ),
    info: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "#f1c40f", backgroundColor: "#f1c40f" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text2Style={{
          fontSize: 14,
          color: "white",
        }}
      />
    ),
  };

  return <Toast config={toastConfig} visibilityTime={2000} autoHide />;
};
