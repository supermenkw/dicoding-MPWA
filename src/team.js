import "materialize-css/dist/css/materialize.css";
import "./styles/main.css";
import "materialize-css/dist/js/materialize.js";
import {
    getTeamById
} from "./scripts/api.js";
import "./scripts/background.js";
import {
    checkData,
    insertTeam,
    deleteTeam
} from "./scripts/db.js";
import {favoritedSucess, unfavoritedSucess} from "./scripts/notification.js";



document.addEventListener("DOMContentLoaded", function () {
    const unfav = document.querySelector("#unfav");
    const fav = document.querySelector("#fav");
    const tab = document.querySelector(".tabs");
    const favBtn = document.querySelector(".favorite");
    let urlParams = new URLSearchParams(window.location.search);
    let id = Number(urlParams.get("id"));
    let isFav = false;
    const item = getTeamById();
    

    checkData(id).then(() => {
        fav.classList.remove("hide");
        unfav.classList.add("hide");
        isFav = true;
        
    }).catch(() => {
        fav.classList.add("hide");
        unfav.classList.remove("hide");
        isFav = false;    
    })
    

    favBtn.addEventListener("click", () => {
        item.then((data) => {
            if (isFav == true) {
                fav.classList.add("hide");
                unfav.classList.remove("hide");
                isFav = false;
                deleteTeam(data.id);
                unfavoritedSucess(data);
            } else {
                fav.classList.remove("hide");
                unfav.classList.add("hide");
                isFav = true;
                insertTeam(data);
                favoritedSucess(data);
            }
        })
    });

    M.Tabs.init(tab);
});