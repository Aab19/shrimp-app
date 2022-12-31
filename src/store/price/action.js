import APICALL from '../../api'
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
  return async dispatch => {
    dispatchLoading(dispatch, GET_SHRIMP_PRICE)

    try {
      const response = await APICALL(
        `/shrimp_prices?per_page=15&page=${page}&with=region,creator&region_id=${id}`,
        {
          method: 'GET',
        },
      )
      if (response.status == 200) {
        let result = {
          res: response.data,
          filter: filter,
        }
        return dispatchSuccess(dispatch, GET_SHRIMP_PRICE, result)
      }
    } catch (error) {
      return dispatchError(dispatch, GET_SHRIMP_PRICE, error.message)
    }
  }
}

export const getLocation = (page, load = false) => {
  return async dispatch => {
    dispatchLoading(dispatch, GET_LOCATION)

    try {
      const response = await APICALL(
        `/regions?per_page=15&page=${page}&has=shrimp_prices&search=`,
        {
          method: 'GET',
        },
      )
      if ((response.status = 200)) {
        let result = {
          res: response.data,
          load: load,
        }
        return dispatchSuccess(dispatch, GET_LOCATION, result)
      }
    } catch (error) {
      return dispatchError(dispatch, GET_LOCATION, error.message)
    }
  }
}

export const getSearchLocation = search => {
  return async dispatch => {
    dispatchLoading(dispatch, GET_SEARCH_LOCATION)

    try {
      const response = await APICALL(
        `/regions?&has=shrimp_prices&search=${search == '' ? null : search}`,
        {
          method: 'GET',
        },
      )
      if ((response.status = 200)) {
        return dispatchSuccess(dispatch, GET_SEARCH_LOCATION, response.data)
      }
    } catch (error) {
      return dispatchError(dispatch, GET_SEARCH_LOCATION, error.message)
    }
  }
}

export const resetSearchLocation = () => {
  return dispatch => {
    dispatchSuccess(dispatch, RESET_SEARCH_LOCATION, {data: []})
  }
}
