import axios from "axios";

// global context
const GlobalContext = ({ children }) => {
  axios.interceptors.request.use(
    (config) => {
      if (typeof config.params === "undefined") {
        config.params = {};
      }
      if (typeof config.params === "object") {
        // URL クエリパラメタにタイムスタンプを追加する(IE11対応)
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

  return <>{children}</>;
};

export { GlobalContext };
