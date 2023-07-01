import axios from 'axios'
const baseUrl = "https://fitaibackend-1-m9779176.deta.app/"

async function get (path) {
    const request = axios.get(baseUrl + path)
    const response = await request
    return response.data
  }

async function post (path, newObject) {
    const request = axios.post(baseUrl + path, newObject)
    const response = await request
    return response.data
}


export default {get, post}
  