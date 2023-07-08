import axios from 'axios'
import { DOCIFIER_API_URL } from './settings'

export const getDocumentationSheetReq = async ({ docId, sheetId, accessToken }) => {
    try {
      const request = await axios.post(
        `${DOCIFIER_API_URL}/Documentation/getDocumentationSheet`,
        {
            docId,
            sheetId
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

export const saveDocumentationSheetReq = async ({ docId, sheetId, data, accessToken }) => {
    try {
      const request = await axios.post(
        `${DOCIFIER_API_URL}/Documentation/saveDocumentationSheet`,
        {
            docId,
            sheetId,
            data
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