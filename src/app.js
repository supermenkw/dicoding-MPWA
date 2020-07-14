import "regenerator-runtime/runtime";
import "materialize-css/dist/css/materialize.min.css";
import "./styles/main.css";
import "materialize-css/dist/js/materialize.min.js";
import {loadNav, loadPage} from "./scripts/nav.js";
import "./scripts/background.js";

document.addEventListener("DOMContentLoaded", function () {
    const elems = document.querySelectorAll(".sidenav");
    let page = window.location.hash.substr(1);
    
    M.Sidenav.init(elems, {
        edge: "right",
    });

    if (page === "") {
        page = "home";
    }

    loadNav();
    loadPage(page);
});