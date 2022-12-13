import axios from 'axios'
import {API_HEADERS_TOKEN, API_TIMEOUT, URL_API} from '../../utils/constant'
import {
  dispatchError,
  dispatchSuccess,
  dispatchLoading,
} from '../../utils/dispatch'

export const GET_SHRIMP_PRICE = 'GET_SHRIMP_PRICE'
export const GET_LOCATION = 'GET_LOCATION'
export const GET_SEARCH_LOCATION = 'GET_SEARCH_LOCATION'
export const RESET_SEARCH_LOCATION = 'RESET_SEARCH_LOCATION'

export const getShrimpPrice = (page, id, filter = false) => {
  return dispatch => {
    dispatchLoading(dispatch, GET_SHRIMP_PRICE)

    axios
      .get(
        URL_API +
          `/shrimp_prices?per_page=15&page=${page}&with=region,creator&region_id=${id}`,
        {headers: API_HEADERS_TOKEN},
        {timeout: API_TIMEOUT},
      )
      .then(response => {
        if (response.status == 200) {
          let result = {
            res: response.data,
            filter: filter,
          }
          dispatchSuccess(dispatch, GET_SHRIMP_PRICE, result)
        }
      })
      .catch(error => {
        dispatchError(dispatch, GET_SHRIMP_PRICE, error.message)
      })
  }
}

export const getLocation = (page, load = false) => {
  return dispatch => {
    dispatchLoading(dispatch, GET_LOCATION)

    axios
      .get(
        URL_API + `/regions?per_page=15&page=${page}&has=shrimp_prices&search=`,
        {headers: API_HEADERS_TOKEN},
        {timeout: API_TIMEOUT},
      )
      .then(response => {
        if ((response.status = 200)) {
          let result = {
            res: response.data,
            load: load,
          }
          dispatchSuccess(dispatch, GET_LOCATION, result)
        }
      })
      .catch(error => {
        dispatchError(dispatch, GET_LOCATION, error.message)
      })
  }
}

export const getSearchLocation = search => {
  return dispatch => {
    dispatchLoading(dispatch, GET_SEARCH_LOCATION)

    axios
      .get(
        URL_API +
          `/regions?&has=shrimp_prices&search=${search == '' ? null : search}`,
        {headers: API_HEADERS_TOKEN},
        {timeout: API_TIMEOUT},
      )
      .then(response => {
        if ((response.status = 200)) {
          dispatchSuccess(dispatch, GET_SEARCH_LOCATION, response.data)
        }
      })
      .catch(error => {
        dispatchError(dispatch, GET_SEARCH_LOCATION, error.message)
      })
  }
}

export const resetSearchLocation = () => {
  return dispatch => {
    dispatchSuccess(dispatch, RESET_SEARCH_LOCATION, {data: []})
  }
}
