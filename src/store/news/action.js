import axios from 'axios'
import {API_HEADERS_TOKEN, API_TIMEOUT, URL_API} from '../../utils'
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from '../../utils/dispatch'

export const GET_NEWS = 'GET_NEWS'

export const getNews = (page, type, reset = false) => {
  return dispatch => {
    dispatchLoading(dispatch, GET_NEWS)

    let endpoint = ''
    if (type == 'news') {
      endpoint = `/posts?per_page=15&page=${page}&with=creator`
    } else {
      endpoint = `/diseases?per_page=15&page=${page}`
    }

    axios
      .get(
        URL_API + endpoint,
        {headers: API_HEADERS_TOKEN},
        {timeout: API_TIMEOUT},
      )
      .then(response => {
        if (response.status == 200) {
          let result = {
            res: response.data,
            type: type,
            reset: reset,
          }
          dispatchSuccess(dispatch, GET_NEWS, result)
        }
      })
      .catch(error => {
        dispatchError(dispatch, GET_NEWS, error.message)
      })
  }
}
