import axios from "axios";

const USERS_API_BASE_URL = "http://localhost:8080/api/v1/users";

class UserService {

    getUsers(){
        return axios.get(USERS_API_BASE_URL);
    }

}

export default new UserService()