import Base from "apps/flaskr/templates/base";
import PageHeader from "apps/flaskr/components/pageHeader";
import UserIsLoggedIn from "apps/flaskr/hooks/userIsLoggedIn";

const Edit = () => {
  const pageTitle = "Edit";

  return (
    <UserIsLoggedIn>
      <Base pageTitle={pageTitle}>
        {/* TODO: もろもろ実装 */}
        <PageHeader pageTitle={pageTitle}></PageHeader>
      </Base>
    </UserIsLoggedIn>
  );
};

export default Edit;
