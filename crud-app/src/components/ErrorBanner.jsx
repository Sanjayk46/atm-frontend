import { useSelector } from "react-redux";

function ErrorBanner() {

  const error = useSelector(
    (state) => state.atm.error
  );

  if (!error) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "#ffebee",
        color: "#d32f2f",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #d32f2f"
      }}
    >
      {error}
    </div>
  );
}

export default ErrorBanner;