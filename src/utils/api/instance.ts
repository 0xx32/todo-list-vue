import axios from 'axios'
import { API_URL } from '../constants/todos'

export const api = axios.create({ baseURL: API_URL })
