import "regenerator-runtime/runtime";
import "materialize-css/dist/css/materialize.min.css";
import "./styles/main.css";
import { getCompetitionById } from "./scripts/api.js";
import "./scripts/background.js";

document.addEventListener("DOMContentLoaded", function () {
    getCompetitionById();
});