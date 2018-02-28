import * as AuthServices from './authToken';

let loggedIn = false;

async function getUsers() {
    let users = await fetch({ url: 'https://fsccgixvyx.localtunnel.me/api/users' });
    return users.JSON();
}

function isLoggedIn() {
    return loggedIn;
}

function checkLogin() {
    if (loggedIn) {
        return Promise.resolve(true);
    } else {
        AuthServices.populateAuthToken();
    }
}

function login(email, password) {
    fetch('https://fsccgixvyx.localtunnel.me/api/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((res) => {
        if (res.ok) {
            return res.JSON()
                .then((res) => {
                    AuthServices.setAuthToken(res.token);
                    loggedIn = true;
                })
        } else if (res.status === 401) {
            return res.JSON()
                .then((res) => {
                    throw res;
                });
        }
    });
}

function logout() {
    AuthServices.clearAuthToken();
    loggedIn = false;
}

function signup(name, email, password, usertype) {
    fetch('https://wncorfirlx.localtunnel.me/api/users/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            password,
            usertype
        })
    }).then((res) => {
        //this.login(email, password);
    }).catch((err) => {
        throw err;
    })
}

export { isLoggedIn, checkLogin, login, logout, signup, getUsers };
