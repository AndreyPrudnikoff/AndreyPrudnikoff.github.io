import Api from './Api';

// const token = JSON.stringify({"accessToken": sessionStorage.getItem('token')});
export const User = {
    register(form) {
        return Api().post('/register', form);
    },
    login(form) {
        return Api().post('/login', form);
    },
    code(code) {
        return Api().post('/user/code', JSON.stringify(code));
    },
    forgotPassword(email) {
        return Api().post('/forgotPassword', JSON.stringify(email));
    },
    updatePassword(user) {
        return Api().post('/user/updatePassword', JSON.stringify(user));
    },
    rate() {
        return Api().post('/rates', JSON.stringify({"accessToken": sessionStorage.getItem('token')}));
    },
    userdata() {
        return Api().post('/getUser', JSON.stringify({"accessToken": sessionStorage.getItem('token')}));
    },
    predictUp(value) {
        return Api().post('/predictUp', JSON.stringify(({...{"accessToken": sessionStorage.getItem('token')}, ...value})));
    },
    predictDown(value) {
        return Api().post('/predictDown', JSON.stringify(({...{"accessToken": sessionStorage.getItem('token')}, ...value})));
    },
    changeWallet() {
        return Api().post('/changeDemo', JSON.stringify({"accessToken": sessionStorage.getItem('token')}));
    },
    sendDeposit(file) {
        return Api().post('/user/sendDeposit', JSON.stringify({...{"accessToken": sessionStorage.getItem('token')}, ...file}));
    },
    withdraw(wallet) {
        return Api().post('/user/withdraw', JSON.stringify({...{"accessToken": sessionStorage.getItem('token')}, ...wallet}));
    },
};
