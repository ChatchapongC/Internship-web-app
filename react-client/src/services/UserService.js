import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from '../constants/index.js';

class UserService{
    getjobbyid(jobid){
        return axios.get(API_BASE_URL+'/'+jobid)
    }
}
export default UserService;