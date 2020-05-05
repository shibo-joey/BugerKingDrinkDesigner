import axios from 'axios'

const instance = axios.create(
    {
        baseURL:'https://my-burgerking.firebaseio.com/'
    }
)

export default instance