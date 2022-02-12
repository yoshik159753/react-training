import { useState } from "react";
import axios from "axios";
import logo from "logo.svg";
import "App.css";

function App() {
  const [readDatetime, setReadDatetime] = useState("-");
  const [writeDatetime, setWriteDatetime] = useState("-");

  const handleHealthCheck = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_FLASKR_URL}/v1/healthcheck`
      );
      setReadDatetime(data.read_datetime);
      setWriteDatetime(data.write_datetime);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleHealthCheck}
          >
            health check!
          </button>

          <table className="table table-light table-sm mt-3">
            <thead>
              <tr>
                <th scope="col">Read Datetime</th>
                <th scope="col">Write Datetime</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{readDatetime}</td>
                <td>{writeDatetime}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
