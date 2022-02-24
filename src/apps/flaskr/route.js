import { Routes, Route } from "react-router-dom";

import Index from "apps/flaskr/pages/index";
import Login from "apps/flaskr/pages/login";

const Flaskr = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Flaskr;
