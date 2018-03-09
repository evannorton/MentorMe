import * as AuthServices from './authToken';
import * as RestServices from './rest';

async function isLoggedIn() {
    return checkLogin();
}

async function checkLogin() {
    await AuthServices.getAuthToken();

    try {
        const user = await me();

        if (!user) {
            return false;
        }

        return true;
    } catch (e) {
        return false;
    }
}

async function login(email, password, usertype) {
    await logout();
    const response = await RestServices.post('/api/auth/login', {
        email,
        password,
        usertype
    });
    await AuthServices.setAuthToken(response.token);
}

async function logout() {
    await AuthServices.clearAuthToken();
}

async function signup(name, email, password, usertype) {
    await RestServices.post('/api/users', {
        name,
        email,
        password,
        usertype
    });
}

async function getMe() {
    return RestServices.get('/api/users/me');
}

async function updateMe(id, row) {
    return RestServices.put(`/api/users/${id}`, row);
}

export { isLoggedIn, checkLogin, login, logout, signup, getMe, updateMe };
