import { standingTable } from "./wrapper";
import { standingData } from "./data";

const competitionByIdResponse = (data) => {
    let dataHTML = "";
    let tableHTML = "";
    data.standings.forEach((standing) => {
        standing.table.forEach((team) => {
            dataHTML += standingData(team);
        })
        tableHTML = standingTable(dataHTML);
    });

    document.getElementById("body-content").innerHTML = tableHTML;
}

export {competitionByIdResponse}