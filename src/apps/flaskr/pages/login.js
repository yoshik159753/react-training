import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Base from "apps/flaskr/templates/base";
import PageHeader from "apps/flaskr/components/pageHeader";

import style from "apps/flaskr/pages/login.module.css";
import axios from "axios";
import { GlobalContext } from "context";

const Login = () => {
  const pageTitle = "Login";

  const { state, dispatch } = useContext(GlobalContext);
  const { user } = state;

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ログイン済みの場合のリダイレクト
    if (user !== null) navigate("/flaskr");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_FLASKR_URL}/v1/session`,
        {
          username,
          password,
        }
      );

      dispatch({ type: "LOGIN", payload: data });

      // ログインユーザーの情報をローカルストレージへ格納(リロード復帰対応)
      window.localStorage.setItem("user", JSON.stringify(data));

      navigate("/flaskr");
    } catch (err) {
      // TODO: エラー時のトースト表示
      // toast(err.response.data);

      setLoading(false);
    }
  };

  return (
    <Base pageTitle={pageTitle}>
      <PageHeader pageTitle={pageTitle} />
      <form className={style.form} method="post" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={!username || !password || loading}>
          {/* TODO: スピナー対応 */}
          {loading ? "loading..." : "Log In"}
        </button>
      </form>
    </Base>
  );
};

export default Login;
