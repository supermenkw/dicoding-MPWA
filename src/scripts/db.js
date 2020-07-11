import idb from "./idb";

const databaseName = "Gilabola-app";
const storeName = "fav_teams";

const dbPromised = idb.open(databaseName, 1, function (upgradeDb) {
    let favTeams = upgradeDb.createObjectStore(storeName, {
        keyPath: "id"
    });
    favTeams.createIndex("name", "name", {
        unique: false
    });
});

function checkData(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                const tx = db.transaction(storeName, "readonly");
                const store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                if (data !== undefined) {
                    resolve("data favorit");
                } else {
                    reject("bukan data favorit");
                }
            });
    });
}

const insertTeam = (data) => {
    dbPromised.then((db) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        store.put(data);

        return tx.complete;
    }).then((data) => {
        M.toast({
            html: 'Favorited!',
            displayLength: 2000
        })
    });
}

const deleteTeam = (data) => {
    dbPromised.then((db) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        store.delete(data);

        return tx.complete;
    }).then((data) => {
        M.toast({
            html: 'Unfavorited!',
            displayLength: 2000
        })
    });
}

const getAllFav = () => {
    return new Promise((resolve, reject) => {
        dbPromised.then((db) => {
                const tx = db.transaction(storeName, "readonly");
                const store = tx.objectStore(storeName);
                return store.getAll();
            })
            .then(function (fav_teams) {
                resolve(fav_teams);
            });
    });
}

export {
    checkData,
    insertTeam,
    deleteTeam,
    getAllFav,
}