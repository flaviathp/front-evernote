import Api from './api.js';

const UsersService = {
    // método que recebe parâmetros e chama a Api com o método post
    register: (params) => Api.post('/users/register', params),
    login: async (params) => {
        const response = await Api.post('/users/login', params);
        // salva um objeto no local storage e transforma em string
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
    },
    logout: () => {
        // remove os dados salvos no local storage
        localStorage.removeItem('user', null);
        localStorage.removeItem('token', null);
    },
    update: async (params) => {
        const response = await Api.put("/users", params, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        })
        localStorage.setItem('user', JSON.stringify(response.data));
    },
    updatePassword: async (params) => {
        await Api.put("/users/password", params, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        })
    },
    delete: async () => {
        await Api.delete("/users", {
            headers: { 'x-access-token': localStorage.getItem('token') }
        })
        localStorage.removeItem('user', null);
        localStorage.removeItem('token', null);
    }
};

export default UsersService;