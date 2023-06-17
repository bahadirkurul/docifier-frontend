import axios from 'axios'
import { EXAM_API_URL } from './settings'
import Rio from '@retter/sdk'
import { ProjectClassEnums } from './constants'

export const getDocsRequest = async ({ accessToken }) => {
  try {
    const request = await axios.post(
      `${EXAM_API_URL}/Documentation/getDocumentations`,
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

export const createDocumentation = async (sdk: Rio, { alias }) => {
  try {
    const request = await sdk.getCloudObject({
      classId: ProjectClassEnums.Documentation,
      body: {
        alias,
      },
    })
    
    if (request.isNewInstance !== true) {
      throw new Error('Failed to create documentation')
    }
  } catch (error: any) {
    return { success: false, error: error.response.data }
  }
}

export const deleteDocumentation = async ({ docId, accessToken }) => {
  try {
    const request = await axios.post(
      `${EXAM_API_URL}/Documentation/deleteDocumentation`,
      {
        docId
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