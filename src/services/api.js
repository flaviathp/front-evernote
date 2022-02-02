import axios from 'axios';

// configura o axios para rodar na porta 3001, na porta 3000 temos o front end rodando
const Api = axios.create({ baseURL: "http://localhost:3001"});

export default Api;