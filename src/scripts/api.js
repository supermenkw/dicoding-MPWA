import {
    competitionTable,
    standingTable,
    teamInfoTable,
    squadCollapseable
} from "./template/wrapper";
import {
    competitionData,
    standingData,
    emblemData,
    squadData,
    favData
} from "./template/data";

import {
    getAllFav,
} from "./db.js";

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
        console.log("Error : " + response.status);

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
                    response.json().then((data) => {
                        let dataHTML = "";
                        let tableHTML = "";
                        data.competitions.forEach((competition, index) => {
                            dataHTML += competitionData(competition, index);
                        });
                        tableHTML += competitionTable(dataHTML);
                        document.getElementById("competitions", ).innerHTML = tableHTML;
                    });
                }
            });
    } else {
        console.log("tidak ada cache");

    }

    fetchData(`${base_url}competitions?plan=TIER_ONE`)
        .then(status)
        .then(json)
        .then((data) => {
            let dataHTML = "";
            let tableHTML = "";
            data.competitions.forEach((competition, index) => {
                dataHTML += competitionData(competition, index);
            });
            tableHTML += competitionTable(dataHTML);
            document.getElementById("competitions").innerHTML = tableHTML;
        })
        .catch(error);
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
                            let dataHTML = "";
                            let tableHTML = "";
                            data.standings.forEach((standing) => {
                                standing.table.forEach((team) => {
                                    dataHTML += standingData(team);
                                })
                                tableHTML = standingTable(dataHTML);
                            });

                            document.getElementById("body-content").innerHTML = tableHTML;

                        });
                    }
                })
        }
        fetchData(`${base_url}competitions/${idParam}/standings`)
            .then(status)
            .then(json)
            .then((data) => {
                let dataHTML = "";
                let tableHTML = "";
                data.standings.forEach((standing) => {
                    standing.table.forEach((team) => {
                        dataHTML += standingData(team);
                    })
                    tableHTML = standingTable(dataHTML);
                });

                document.getElementById("body-content").innerHTML = tableHTML;
            })
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

                            let emblem = "";
                            let infoTable = "";
                            let dataHTML = "";
                            let dataTable = "";

                            data.squad.forEach((player) => {
                                dataHTML += squadData(player);
                            })

                            emblem += emblemData(data);
                            infoTable += teamInfoTable(data);
                            dataTable += squadCollapseable(dataHTML);

                            document.getElementById("emblem-team").innerHTML = emblem;
                            document.getElementById("information").innerHTML = infoTable;
                            document.getElementById("squad").innerHTML = dataTable;

                            resolve(data);
                        }).then(() => {
                            const list = document.querySelectorAll(".collapsible");

                            M.Collapsible.init(list);

                        }).catch(() => {
                            console.log("Tidak ada akses internet.");

                        });;
                    }
                })
        }

        fetchData(`${base_url}teams/${idParam}`)
            .then(status)
            .then(json)
            .then((data) => {
                let emblem = "";
                let infoTable = "";
                let dataHTML = "";
                let dataTable = "";

                data.squad.forEach((player) => {
                    dataHTML += squadData(player);
                })

                emblem += emblemData(data);
                infoTable += teamInfoTable(data);
                dataTable += squadCollapseable(dataHTML);

                document.getElementById("emblem-team").innerHTML = emblem;
                document.getElementById("information").innerHTML = infoTable;
                document.getElementById("squad").innerHTML = dataTable;

                resolve(data);
            }).then(() => {
                const list = document.querySelectorAll(".collapsible");
                M.Collapsible.init(list);
            }).catch(() => {
                console.log("Tidak ada akses internet.");

            });



    });
}

const getAllFavTeam = () => {


    getAllFav().then((fav_teams) => {
        let dataHTML = "";
        fav_teams.forEach((data) => {
    
            dataHTML += favData(data);
        })
        document.getElementById("fav-teams").innerHTML = dataHTML;  
    })
}


export {
    getCompetitions,
    getCompetitionById,
    getTeamById,
    getAllFavTeam,
}