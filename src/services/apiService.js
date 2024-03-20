import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

const getUsers = () => axios.get(`${BASE_URL}/users`)
const getUserDetails = userId => axios.get(`${BASE_URL}/users/${userId}`)
const getUserAlbums = userId => axios.get(`${BASE_URL}/users/${userId}/albums`)
const getAlbumPhotos = albumId =>
  axios.get(`${BASE_URL}/albums/${albumId}/photos`)
const getUserTodos = userId => axios.get(`${BASE_URL}/users/${userId}/todos`)

export { getUsers, getUserDetails, getUserAlbums, getAlbumPhotos, getUserTodos }
