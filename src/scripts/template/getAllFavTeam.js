import { favData } from "./data";

const allFavTeamResponse = (fav_teams) => {
    let dataHTML = "";
        const empty = document.getElementById("empty-favteam")
        if (fav_teams.length !== 0) {
            fav_teams.forEach((data) => {
                dataHTML += favData(data);
            })
            document.getElementById("fav-teams").innerHTML = dataHTML;
            empty.classList.add("hide");
        } else {
            empty.classList.remove("hide");
        }
}

export { allFavTeamResponse }