import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/notes`

// Axios nao e servidor, ele e apenas um facilitador de requisições REST ----------------------

const getAll = () => {
  const request = axios.get(baseUrl) // Axios faz a requisicao para o server
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject) // Axios faz a requisicao para o server
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject) // Axios faz a requisicao para o server
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  update
}
