import axios from 'axios';
const api = axios.create({
	baseURL: 'https://648867740e2469c038fda6cc.mockapi.io/api/v1',
});

export default api;
