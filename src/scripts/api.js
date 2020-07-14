import { getAllFav } from "./db.js";
import {competitionResponse} from "./template/getCompetition";
import { competitionByIdResponse } from "./template/getCompetitionById";
import { teamByIdResponse } from "./template/getTeamById";
import { allFavTeamResponse }  from "./template/getAllFavTeam";

const API_TOKEN = "94a9a17bdec24c7c9d8ce9324d9a4ffc";
const base_url = "https://api.football-data.org/v2/";

const fetchData = (url) => {
    return fetch(url, {
        method: "GET",
        headers: {
            "X-Auth-Token": API_TOKEN,
        },
    });
};

const status = (response) => {
    if (response.status !== 200) {
        console.log(`Error : ${response.status}`);

        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
};

const json = (response) => {
    return response.json();
};

const error = (error) => {
    console.log(`Error ${error}`);
};

const getCompetitions = () => {
    if ("caches" in window) {
        caches
            .match(`${base_url}competitions?plan=TIER_ONE`)
            .then((response) => {
                if (response) {
                    response.json()
                }
            });
    } else {
        console.log("tidak ada cache");
    }

    fetchData(`${base_url}competitions?plan=TIER_ONE`)
        .then(status)
        .then(json)
        .then((data) => {
            competitionResponse(data);
        });
};

const getCompetitionById = () => {
    return new Promise((resolve, reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        if ("caches" in window) {
            caches
                .match(`${base_url}competitions/${idParam}/standings`)
                .then((response) => {
                    if (response) {
                        response.json().then((data) => {
                            competitionByIdResponse(data);
                        });
                    }
                })
        }
        fetchData(`${base_url}competitions/${idParam}/standings`)
            .then(status)
            .then(json)
            .then((data) => {
                competitionByIdResponse(data);
            });
    })
}

const getTeamById = () => {
    return new Promise((resolve, reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        if ("caches" in window) {
            caches
                .match(`${base_url}teams/${idParam}`)
                .then((response) => {
                    if (response) {
                        response.json().then((data) => {
                            teamByIdResponse(data);
                            resolve(data);
                        }).then(() => {
                            const list = document.querySelectorAll(".collapsible");
                            M.Collapsible.init(list);
                        });
                    }
                })
        }


        fetchData(`${base_url}teams/${idParam}`)
            .then(status)
            .then(json)
            .then((data) => {
                teamByIdResponse(data);
                resolve(data);
            }).then(() => {
                const list = document.querySelectorAll(".collapsible");
                M.Collapsible.init(list);
            });
    });
}

const getAllFavTeam = () => {

    getAllFav().then((fav_teams) => {
        allFavTeamResponse(fav_teams);
    })
}


export {
    getCompetitions,
    getCompetitionById,
    getTeamById,
    getAllFavTeam,
}