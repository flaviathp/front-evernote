import Api from './api.js';

const NotesService = {
    //método chama a API por meio do método GET e passa para ele o header com token salvo no local storage
    index: () => Api.get('/notes', {
        headers: { 'x-access-token': localStorage.getItem('token')}
    }),
    // permite ao usuário criar novas notas
    create: () => Api.post('/notes', { 'title': 'Nova nota', 'body': 'Nova nota...' }, {
        headers: { 'x-access-token': localStorage.getItem('token')}
    }),
    delete: (id) => Api.delete(`/notes/${id}`, {
        headers: { 'x-access-token': localStorage.getItem('token')}
    }),
    update: (id, params) => Api.put(`/notes/${id}`, params, {
        headers: { 'x-access-token': localStorage.getItem('token')}
    }),
    search: (query) => Api.get(`/notes/search?query=${query}`, {
        headers: { 'x-access-token': localStorage.getItem('token')}
    })
}

export default NotesService;