const competitionTable = (dataHTML) => {
    return `
    <div class="card">
    <div class="card-content">
        <table class="highlight">
        <thead>
            <tr>
                <th>No</th>
                <th>Competition</th>
                <th>Area</th>
                <th class="hide-on-small-and-down">Starts</th>
                <th class="hide-on-small-and-down">Ends</th>
            </tr>
        </thead>
        <tbody>
            ${dataHTML}
        </tbody>
        </table>
    </div>
    </div>
    `;
}

const standingTable = (dataHTML) => {
    return `
    <div class="card">
    <div class="card-content">
        <table class="responsive-table highlight">
        <thead>
            <tr>
                <th class="center-align">Position</th>
                <th class="center-align" colspan="2">Club</th>
                <th class="center-align">M</th>
                <th class="center-align">W</th>
                <th class="center-align">L</th>
                <th class="center-align">D</th>
                <th class="center-align">P</th>
            </tr>
        </thead>
        <tbody>
            ${dataHTML}
        </tbody>
        </table>
    </div>
    </div>
    `;
}

const teamInfoTable = (data) => {
    return `
    <div class="card">
        <div class="card-content">
            <table>
            <tr>
                <th>Name</th>
                <td>${data.name}</td>
            </tr>
            <tr>
                <th>Area</th>
                <td>${data.area.name}</td>
            </tr>
            <tr>
                <th>Founded</th>
                <td>${data.founded}</td>
            </tr>
            <tr>
                <th>Uniform</th>
                <td>${data.clubColors}</td>
            </tr>
            <tr>
                <th>Stadium</th>
                <td>${data.venue}</td>
            </tr>
            <tr>
                <th>Address</th>
                <td>${data.address}</td>
            </tr>
            <tr>
                <th>Phone</th>
                <td>${data.phone}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td><a href="mailtp:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
                <th>Website</th>
                <td><a href="${data.website}" target="_blank">${data.website}</a></td>
            </tr>
            </table>
        </div>
    </div>

    `;
}

const squadCollapseable = (dataHTML) => {
    return `
        <ul class="collapsible">
            ${dataHTML}
        </ul>
    `;
}

export {
    competitionTable,
    standingTable,
    teamInfoTable,
    squadCollapseable
}