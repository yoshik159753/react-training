import { Link, useNavigate } from "react-router-dom";

import style from "apps/flaskr/templates/base.module.css";
import { useContext } from "react";
import { GlobalContext } from "context";
import axios from "axios";

const Base = ({ pageTitle, children }) => {
  document.title = `${pageTitle} - Flaskr`;

  const { state, dispatch } = useContext(GlobalContext);
  const { user } = state;

  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    await axios.delete(`${process.env.REACT_APP_FLASKR_URL}/v1/session`);
    // TODO: あとで
    // toast(data.message);
    navigate("/flaskr");
  };

  return (
    <div className={style.background}>
      <div className={`container ${style.body}`}>
        <nav className={style.nav}>
          <h1>Flaskr</h1>
          {user === null && (
            <ul>
              <li>
                <Link to="#">Register</Link>
              </li>
              <li>
                <Link to="/flaskr/login">Log In</Link>
              </li>
            </ul>
          )}
          {user !== null && (
            <ul>
              <li>
                <span>{user["username"]}</span>
              </li>
              <li>
                <span className={style.link} onClick={handleLogout}>
                  Log Out
                </span>
              </li>
            </ul>
          )}
        </nav>
        <section className="content">{children}</section>
      </div>
    </div>
  );
};

export default Base;
