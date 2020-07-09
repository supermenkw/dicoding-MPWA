const toHttps = (url) => {
    return url == null ? url = "svg/no-emblem.svg" : url = url.replace(/^http:\/\//i, 'https://');
}

const competitionData = (competition, index) => {
    return `
    <tr>
        <td>${index += 1}</td>
        <td>
            <a href="../competition.html?id=${competition.id}">
                ${competition.name}
            </a>
        </td>
        <td>${competition.area.name}</td>
        <td class="hide-on-small-and-down">${competition.currentSeason.startDate}</td>
        <td class="hide-on-small-and-down">${competition.currentSeason.endDate}</td>
    </tr>
    `;
}

const standingData = (team) => {
    return `
    <tr>
        <td class="center-align">${team.position}</td>
        <td>
        <img src="${toHttps(team.team.crestUrl)}" alt="emblem club ${team.team.name}" class="show-on-medium-and-up hide-on-small-and-down responsive-img" style="width:30px;height:30px; display:block; margin:auto;">
        </td>
        <td>
            <a href="../team.html?id=${team.team.id}">
                ${team.team.name}
            </a>
        </td>
        <td class="center-align">${team.playedGames}</td>
        <td class="center-align">${team.won}</td>
        <td class="center-align">${team.lost}</td>
        <td class="center-align">${team.draw}</td>
        <td class="center-align">${team.points}</td>
    </tr>
    `;
}

const emblemData = (data) => {
    return `<img class="item-center responsive-img" src="${toHttps(data.crestUrl)}" alt="emblem club ${data.name}">`;
}

const squadData = (player) => {
    return `
    <li>
        <div class="collapsible-header">
        <img src="../svg/person.svg" style="margin-right:1em;" class="responsive-img">${player.name}</div>
        <div class="collapsible-body">
            <table>
                <tr>
                    <th>Name</th>
                    <td>${player.name}</td>
                </tr>
                <tr>
                    <th>Position</th>
                    <td>${player.position}</td>
                </tr>
                <tr>
                    <th>Nationality</th>
                    <td>${player.nationality}</td>
                </tr>
                <tr>
                    <th>Birth</th>
                    <td>${player.dateOfBirth}</td>
                </tr>
                <tr>
                    <th>Shirt Number</th>
                    <td>${player.shirtNumber}</td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>${player.role}</td>
                </tr>
            </table>
        </div>
    </li>
    `;
}

const favData = (data) => {
    return `
    <div class="col s12 m4">
    <a href="../team.html?id=${data.id}">
        <div class="card small hoverable" style="padding:10px;">
            <div class="card-image center-align">
                <img src="${toHttps(data.crestUrl)}" alt="emblem club ${data.name}" class="responsive-img" style="max-width: 150px; max-height:150px; margin-left:auto; margin-right:auto;">
            </div>
            <div class="card-content">
                <span class="card-title flow-text" style="font-size: 1.4em;">${data.name}</span>
                <p class="black-text">${data.area.name} | ${data.venue}</p>
                <p class="black-text">${data.website}</p>
            </div>
        </div>
        </a>
    </div>
    `;
}

export {
    competitionData,
    standingData,
    emblemData,
    squadData,
    favData
}