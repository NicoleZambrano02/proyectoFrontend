import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `https://todomevn.herokuapp.com` // the url of our server
  })
}
