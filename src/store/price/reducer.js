import {
  GET_LOCATION,
  GET_SEARCH_LOCATION,
  GET_SHRIMP_PRICE,
  RESET_SEARCH_LOCATION,
} from './action'

const initialState = {
  loadingShrimpPrice: false,
  dataShrimpPrice: false,
  listLocation: false,
  searchedLocation: false,
  errorShrimpPrice: false,
  doneLoadContent: false,
  doneLoadContentFilter: false,
  doneLoadLocation: false,
  doneLoadSearchLocation: false,
}

const shrimpPriceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHRIMP_PRICE:
      if (action.payload && action.payload.data) {
        if (action.payload.data.filter) {
          state['dataShrimpPrice'] = false
        }

        if (
          !state['dataShrimpPrice'] ||
          state['dataShrimpPrice'] == undefined
        ) {
          state['dataShrimpPrice'] = action.payload.data.res
        } else {
          state['dataShrimpPrice'].data = [
            ...state['dataShrimpPrice'].data,
            ...action.payload.data.res.data,
          ]
          state['dataShrimpPrice'].links = action.payload.data.res.links
          state['dataShrimpPrice'].meta = action.payload.data.res.meta
        }
        state['doneLoadContent'] = true
      } else {
        state['doneLoadContent'] = false
      }

      return {
        ...state,
        loadingShrimpPrice: action.payload.loading,
        dataShrimpPrice: state['dataShrimpPrice'],
        errorShrimpPrice: action.payload.error,
      }
    case GET_LOCATION:
      if (action.payload && action.payload.data) {
        if (!action.payload.data.load) {
          state['listLocation'] = false
        }
        if (!state['listLocation'] || state['listLocation'] == undefined) {
          state['listLocation'] = action.payload.data.res
        } else {
          state['listLocation'].data = [
            ...state['listLocation'].data,
            ...action.payload.data.res.data,
          ]
          state['listLocation'].links = action.payload.data.res.links
          state['listLocation'].meta = action.payload.data.res.meta
        }
        state['doneLoadLocation'] = true
      } else {
        state['doneLoadLocation'] = false
      }

      return {
        ...state,
        loading: action.payload.loading,
        listLocation: state['listLocation'],
        error: action.payload.error,
      }

    case GET_SEARCH_LOCATION:
      if (action.payload && action.payload.data) {
        state['doneLoadSearchLocation'] = true
      } else {
        state['doneLoadSearchLocation'] = false
      }

      return {
        ...state,
        loading: action.payload.loading,
        searchedLocation: action.payload.data,
        error: action.payload.error,
      }
    case RESET_SEARCH_LOCATION:
      return {
        ...state,
        searchedLocation: action.payload.data,
      }
    default:
      return state
  }
}

export default shrimpPriceReducer
