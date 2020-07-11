import { competitionTable } from "./wrapper";
import { competitionData } from "./data";

const competitionResponse = (data) => {
    let dataHTML = "";
    let tableHTML = "";
    data.competitions.forEach((competition, index) => {
        dataHTML += competitionData(competition, index);
    });
    tableHTML += competitionTable(dataHTML);
    document.getElementById("competitions").innerHTML = tableHTML;
}

export {
    competitionResponse
}