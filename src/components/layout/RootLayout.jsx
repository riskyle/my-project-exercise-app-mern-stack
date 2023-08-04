import { Link, Outlet } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const RootLayout = () => {
  const { logout } = useLogout();

  const { user } = useAuthContext();

  const handleClick = () => logout();

  return (
    <>
      <header>
        <div className="container">
          <Link className="header" to="/">
            <h1>Exercise Comrade`</h1>
          </Link>
          <nav>
            {user && (
              <>
                <span>{user.email}</span>
                <button onClick={handleClick}>Log out</button>
              </>
            )}
            {!user && (
              <>
                <Link to="login">Login</Link>
                <Link to="signup">Sign up</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <div className="pages">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
