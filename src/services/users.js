import Api from './api.js';

const UsersService = {
    // método que recebe parâmetros e chama a Api com o método post
    register: (params) => Api.post('/users/register', params)
}

export default UsersService;