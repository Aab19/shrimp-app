import APICALL from '../../api'
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from '../../utils/dispatch'

export const GET_NEWS = 'GET_NEWS'

export const getNews = (page, type, reset = false) => {
  return async dispatch => {
    dispatchLoading(dispatch, GET_NEWS)

    let endpoint = ''
    if (type == 'news') {
      endpoint = `/posts?per_page=15&page=${page}&with=creator`
    } else {
      endpoint = `/diseases?per_page=15&page=${page}`
    }

    try {
      const response = await APICALL(endpoint, {
        method: 'GET',
      })
      if (response.status == 200) {
        let result = {
          res: response.data,
          type: type,
          reset: reset,
        }
        return dispatchSuccess(dispatch, GET_NEWS, result)
      }
    } catch (error) {
      return dispatchError(dispatch, GET_NEWS, error.message)
    }
  }
}
