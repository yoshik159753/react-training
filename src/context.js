import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const GlobalContext = createContext();

const intialGlobalState = {
  user: null,
};

const globalContextReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalContextReducer, intialGlobalState);

  useEffect(() => {
    // リロード復帰対応
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  axios.interceptors.request.use(
    (config) => {
      if (typeof config.params === "undefined") {
        config.params = {};
      }
      if (typeof config.params === "object") {
        // URL クエリパラメタにタイムスタンプを追加する(IE11対応)
        // ref. https://s8a.jp/no-cache-using-ajax-with-ie11
        if (
          typeof URLSearchParams === "function" &&
          config.params instanceof URLSearchParams
        ) {
          config.params.append("_", Date.now());
        } else {
          // IE11 では URLSearchParams が未対応(らしい)
          config.params._ = Date.now();
        }
      }
      // cookie を使うため withCredentials を有効化
      // TODO: 可能であれば、毎回設定ではなく１回初期化で対応したい(インスタンス化？)
      config.withCredentials = true;
      return config;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      // any status code that lie within the range of 2XX cause this function
      // to trigger
      return response;
    },
    (error) => {
      // any status codes that falls outside the range of 2xx cause this function
      // to trigger
      console.error(error);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_FLASKR_URL}/v1/csrf-token`
      );
      axios.defaults.headers["X-CSRF-TOKEN"] = data["csrf-token"];
    };
    getCsrfToken();
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
