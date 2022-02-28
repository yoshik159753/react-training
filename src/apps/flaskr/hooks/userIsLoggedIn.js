import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import DefaultSpinner from "components/spinners/defaultSpinner";

const UserIsLoggedIn = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_FLASKR_URL}/v1/session`);
      setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);
      navigate("/flaskr/login");
    }
  };

  useEffect(() => {
    fetchUser();
  });

  if (!isLoggedIn) {
    return <DefaultSpinner />;
  }

  return <>{children}</>;
};

export default UserIsLoggedIn;
