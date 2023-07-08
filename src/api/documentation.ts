import axios from 'axios'
import { DOCIFIER_API_URL } from './settings'

export const getDocumentationsRequest = async ({ accessToken }) => {
  try {
    const request = await axios.post(
      `${DOCIFIER_API_URL}/Documentation/getDocumentations`,
      {},
      {
        headers: {
          _token: accessToken,
        },
      },
    )

    return { success: true, data: request.data }
  } catch (error: any) {
    return { success: false, error: error.response.data }
  }
}

export const createDocumentationRequest = async ({ alias, accessToken }) => {
  try {
    const request = await axios.post(
      `${DOCIFIER_API_URL}/Documentation/createDocumentation`,
      {
        alias
      },
      {
        headers: {
          _token: accessToken,
        },
      },
    )

    return { success: true, data: request.data }
  } catch (error: any) {
    return { success: false, error: error.response.data }
  }
}

export const deleteDocumentationRequest = async ({ documentationId, accessToken }) => {
  try {
    const request = await axios.post(
      `${DOCIFIER_API_URL}/Documentation/deleteDocumentation`,
      {
        documentationId
      },
      {
        headers: {
          _token: accessToken,
        },
      },
    )

    return { success: true, data: request.data }
  } catch (error: any) {
    return { success: false, error: error.response.data }
  }
}