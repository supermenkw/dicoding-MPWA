import {squadData, emblemData} from "./data"
import {squadCollapseable, teamInfoTable} from "./wrapper"

const teamByIdResponse = (data) => {
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
}

export { teamByIdResponse }