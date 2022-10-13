import { useNavigate } from "react-router-dom";

function AccessDenied() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ padding: "60px" }}>
        <div className="mx-5"></div>
        <div className="p-5 ">
          <h1 className="fw-bold mb-4">ACCESS DENIED</h1>
          <h6 className="mb-4">
            Please create an account if you wish to continue.
          </h6>
          <div className="d-flex flex-row">
            <button
              onClick={() => navigate("/register")}
              className="btn btn-primary me-2"
            >
              Create an Account
            </button>

            <button
              onClick={() => navigate("/")}
              className="btn btn-outline-dark"
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccessDenied;
