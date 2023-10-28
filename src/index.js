import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
// import $ from "jquery";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../src/components/comman/fonts.googleapis.com/css52c6.css?family=Roboto:400,700&amp;subset=latin,cyrillic-ext";
import "../src/components/comman/fonts.googleapis.com/icone91f.css?family=Material+Icons";
import "../src/components/comman/plugins/bootstrap/css/bootstrap.css";
// import "../src/components/comman/plugins/jquery/jquery.min.js";

import "../src/components/comman/plugins/node-waves/waves.css";
import "../src/components/comman/plugins/morrisjs/morris.css";
import "../src/components/comman/plugins/animate-css/animate.css";
import "../src/components/comman/plugins/light-gallery/css/lightgallery.css";
import "../src/components/comman/css/style.css";
import "../src/components/comman/css/themes/all-themes.css";

// import "../src/components/comman/plugins/bootstrap/js/bootstrap.js";
// import "../src/components/comman/plugins/bootstrap-select/js/bootstrap-select.js";
// import "../src/components/comman/plugins/jquery-slimscroll/jquery.slimscroll.js";
// import "../src/components/comman/plugins/node-waves/waves.js";
// import "../src/components/comman/plugins/light-gallery/js/lightgallery-all.js";

// import "../src/components/comman/js/pages/medias/image-gallery.js";
import "../src/components/comman/js/admin.js";

// import "../src/components/comman/js/demo.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
