import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ padding: "60px" }}>
        <div className="mx-5"></div>
        <div className="p-5 ">
          <h1 className="fw-bold mb-4">
            404 <span className="text-primary">Page Not Found</span>
          </h1>
          <h6 className="mb-4">
            The link you clicked may be broken or the page may have been
            removed. <br />
            Visit the Homepage or Contact us about the problem
          </h6>

          <button onClick={() => navigate("/")} className="btn btn-primary">
            Back to Homepage
          </button>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
