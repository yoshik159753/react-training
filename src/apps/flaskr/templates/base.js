import { Link } from "react-router-dom";

import style from "apps/flaskr/templates/base.module.css";

const Base = ({ pageTitle, children }) => {
  document.title = `${pageTitle} - Flaskr`;

  return (
    <div className={style.background}>
      <div className={`container ${style.body}`}>
        <nav className={style.nav}>
          <h1>Flaskr</h1>
          <ul>
            {/* {% if g.user %}
      <li><span>{{ g.user['username'] }}</span>
      <li><a href="{{ url_for('auth.logout') }}">Log Out</a>
    {% else %}
      <li><a href="{{ url_for('auth.register') }}">Register</a>
      <li><a href="{{ url_for('auth.login') }}">Log In</a>
    {% endif %} */}
            <li>
              <Link to="#">Register</Link>
            </li>
            <li>
              <Link to="#">Log In</Link>
            </li>
          </ul>
        </nav>
        <section className="content">{children}</section>
      </div>
    </div>
  );
};

export default Base;
