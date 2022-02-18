import style from "apps/flaskr/components/pageHeader.module.css";

const PageHeader = ({ pageTitle, children }) => {
  return (
    <header className={style.pageHeader}>
      <h1 className={style.pageTitle}>{pageTitle}</h1>
      {children}
    </header>
  );
};

export default PageHeader;
