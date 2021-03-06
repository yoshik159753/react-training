import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

import Base from "apps/flaskr/templates/base";
import style from "apps/flaskr/pages/index.module.css";
import PageHeader from "apps/flaskr/components/pageHeader";
import DefaultSpinner from "components/spinners/defaultSpinner";
import { Link } from "react-router-dom";
import { GlobalContext } from "context";

const Index = () => {
  const pageTitle = "Posts";

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const { state } = useContext(GlobalContext);
  const { user } = state;

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_FLASKR_URL}/v1/blog`
      );
      console.log(data);
      setBlogs(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const newLink = () => {
    // TODO: ログイン中状態でnewボタンの出し分け処理
    // {% if g.user %}
    //   <a class="action" href="{{ url_for('blog.create') }}">New</a>
    // {% endif %}

    return <></>;
  };

  const render = (children) => {
    return (
      <Base pageTitle={pageTitle}>
        <PageHeader pageTitle={pageTitle}>{newLink()}</PageHeader>
        {children}
      </Base>
    );
  };

  // ロード中
  if (loading) {
    return render(<DefaultSpinner />);
  }

  // データがない場合
  if (blogs.length === 0) {
    // TODO: style
    return render("Empty!!!");
  }

  const editLink = (blog) => {
    if (user == null || user.user_id !== blog.author_id) {
      return;
    }
    return (
      <Link className={style.action} to={`/flaskr/${blog.id}`}>
        Edit
      </Link>
    );
  };

  // TODO: エラーメッセージはあとで検討
  // {% for message in get_flashed_messages() %}
  //   <div class="flash">{{ message }}</div>
  // {% endfor %}

  return render(
    blogs.map((blog, index) => (
      <div key={blog.id}>
        <article className="post">
          <header className={style.header}>
            <div>
              <h1 className={style.title}>{blog.title}</h1>
              <div className={style.about}>
                by {blog.username} on {dayjs(blog.created).format("YYYY-MM-DD")}
              </div>
            </div>
            {editLink(blog)}
          </header>
          <p className={style.body}>{blog.body}</p>
        </article>
        {blogs.length - 1 === index ? "" : <hr />}
      </div>
    ))
  );
};

export default Index;
