import { Routes, Route } from "react-router-dom";

import Index from "apps/flaskr/pages/index";

const Flaskr = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  );
};

export default Flaskr;
