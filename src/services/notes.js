import Api from './api.js';

const NotesService = {
    //método chama a API por meio do método GET e passa para ele o header com token salvo no local storage
    index: () => Api.get('/notes', {
        headers: { 'x-access-token': localStorage.getItem('token')}
    }),
}

export default NotesService;