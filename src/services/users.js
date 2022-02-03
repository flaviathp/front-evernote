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
    }
}

export default UsersService;