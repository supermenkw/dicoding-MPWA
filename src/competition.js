import "materialize-css/dist/css/materialize.css";
import "./styles/main.css";
import "materialize-css/dist/js/materialize.js";
import { getCompetitionById } from "./scripts/api.js";
import "./scripts/background.js";

document.addEventListener("DOMContentLoaded", function () {
    getCompetitionById();
});