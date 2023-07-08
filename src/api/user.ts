import { DOCIFIER_API_URL } from './settings'
import axios from 'axios'

export const changePasswordRequest = async ({ oldPassword, newPassword, newPasswordConfirm, accessToken }) => {
  try {
    const request = await axios.post(
      `${DOCIFIER_API_URL}/User/changePassword`,
      {
        oldPassword,
        newPassword,
        newPasswordConfirm,
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
