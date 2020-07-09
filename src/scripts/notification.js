function favoritedSucess(data) {
    const title = "Pemberitahuan";
    const options = {
        "body": `${data.name} berhasil ditambahkan ke daftar tim favorit. Ingin cek daftar tim favorite?`,
        "actions": [
            {
                'action': 'yes-gotofav',
                'title': 'Ya',
            },
            {
                'action': 'no-gotofav',
                'title': 'Tidak',
            }
        ]
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}

function unfavoritedSucess(data) {
    const title = "Pemberitahuan";
    const options = {
        "body": `${data.name} berhasil dihapus dari daftar tim favorit`,
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}


export {
    favoritedSucess,
    unfavoritedSucess
}