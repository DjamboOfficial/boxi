import "./header.css";

export const Header = () => {
  return (
    <>
      <div className="header-container">
        <button>Edo</button>
        <button>boxi</button>
        <button>
          <a href="/login">User Log In</a>
        </button>
        <button>
          <a href="/signup">User Sign Up</a>
        </button>
        <button>
          <a href="/artisanLogin">Artisan Login</a>
        </button>
        <button>
          <a href="/artisanSignup">Artisan Sign up</a>
        </button>
        <button>
          <a href="/signup">Cart</a>
        </button>
      </div>
    </>
  );
};
