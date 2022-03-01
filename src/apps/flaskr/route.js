import { Routes, Route } from "react-router-dom";

import Index from "apps/flaskr/pages/index";
import Login from "apps/flaskr/pages/login";
import Edit from "apps/flaskr/pages/blog/edit";

const Flaskr = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Edit />} />
    </Routes>
  );
};

export default Flaskr;
