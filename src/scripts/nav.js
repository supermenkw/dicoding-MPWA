import {
    getCompetitions,
    getAllFavTeam
} from "./api";

// Load page content
let page = window.location.hash.substr(1);
let path = window.location.pathname;

if (path === "index.html" || path === "") {
    page = "home"
}

if (page === "") {
    page = "home";
}



const loadNav = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status != 200) return;
            // Muat daftar tautan menu
            document
                .querySelectorAll(".topnav, .sidenav")
                .forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

            // Daftarkan event listener untuk setiap tautan menu
            document
                .querySelectorAll(".sidenav a, .topnav a")
                .forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        // Tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        const page = event.target
                            .getAttribute("href")
                            .substr(1);
                        loadPage(page);
                    });
                });
        }
    };
    xhttp.open("GET", "../components/nav.html", true);
    xhttp.send();
}

const loadPage = (page) => {
    // fetch('pages/' + page + '.html')
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const content = document.querySelector("#body-content");

            if (page === "home") {
                getCompetitions();
            } else if ( page === "favorite") {
                getAllFavTeam();
            }

            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status == 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", `../pages/${page}.html`, true);
    xhttp.send();
}

export {
    loadNav,
    loadPage
}