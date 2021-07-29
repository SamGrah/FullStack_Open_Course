import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = async () => {
  const res = await axios.get(baseURL)
  return res.data
}

const update = async (person) => {
  const res = await axios.post(baseURL, person)
  return res.data
}

const remove = async (id) => {
  return await axios.delete(`${baseURL}/${id}`)
}

const modify = async (person) => {
  const res = await axios.put(`${baseURL}/${person.id}`, person)
  return res.data
}

const contactService = {
  getAll,
  update,
  remove,
  modify
}
export default contactService

