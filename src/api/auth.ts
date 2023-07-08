import axios from 'axios'
import { DOCIFIER_API_URL } from './settings'

export const signInRequest = async ({ email, password }) => {
  try {
    const request = await axios.post(`${DOCIFIER_API_URL}/User/signIn`, {
      email,
      password,
    })

    return { success: true, data: request.data }
  } catch (error: any) {
    return { success: false, error: error.response.data }
  }
}

export const signUpRequest = async ({ name, surname, email, password, confirmPassword }) => {
  try {
    const request = await axios.post(`${DOCIFIER_API_URL}/User/signUp`, {
      name,
      surname,
      email,
      password,
      confirmPassword,
      userType: 'enduser',
    })

    return { success: true, data: request.data }
  } catch (error: any) {
    return { success: false, error: error.response.data }
  }
}

