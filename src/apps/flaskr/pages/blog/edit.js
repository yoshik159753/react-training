import { useState } from "react";

import axios from "axios";

import Base from "apps/flaskr/templates/base";
import PageHeader from "apps/flaskr/components/pageHeader";
import UserIsLoggedIn from "apps/flaskr/hooks/userIsLoggedIn";

// TODO: 動作確認用の実装のため要修正！！！

const Edit = () => {
  const pageTitle = "Edit";

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${process.env.REACT_APP_FLASKR_URL}/v1/blog/2`,
        {
          username,
        }
      );

      console.log(data);

      setLoading(false);
    } catch (err) {
      // TODO: エラー時のトースト表示
      // toast(err.response.data);

      setLoading(false);
    }
  };

  return (
    <UserIsLoggedIn>
      <Base pageTitle={pageTitle}>
        {/* TODO: もろもろ実装 */}
        <PageHeader pageTitle={pageTitle}></PageHeader>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit" disabled={!username || loading}>
            post
          </button>
        </form>
      </Base>
    </UserIsLoggedIn>
  );
};

export default Edit;
