import "./header.css";

export const Header = () => {
  return (
    <>
      <div className="header-container">
        <button>Edo</button>
        <button>boxi</button>
        <button>
          <a href="/signup">Log In</a>
        </button>
        <button>
          <a href="/signup">Sign Up</a>
        </button>
      </div>
    </>
  );
};
