import {GET_NEWS} from './action'

const initialState = {
  loadingNews: false,
  newsData: false,
  newsDataDisease: false,
  errorNews: false,
  doneLoadNews: false,
  doneLoadNewsDisease: false,
}

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS:
      if (action.payload && action.payload.data) {
        if (action.payload.data.type == 'news') {
          if (action.payload.data.reset) {
            state['newsData'] = false
          }
          state['doneLoadNews'] = true
          if (!state['newsData']) {
            state['newsData'] = action.payload.data.res
          } else {
            state['newsData'].data = [
              ...state['newsData'].data,
              ...action.payload.data.res.data,
            ]
            state['newsData'].links = action.payload.data.res.links
            state['newsData'].meta = action.payload.data.res.meta
          }
        }
        if (action.payload.data.type == 'disease') {
          if (action.payload.data.reset) {
            state['newsDataDisease'] = false
          }
          state['doneLoadNewsDisease'] = true
          if (!state['newsDataDisease']) {
            state['newsDataDisease'] = action.payload.data.res
          } else {
            state['newsDataDisease'].data = [
              ...state['newsDataDisease'].data,
              ...action.payload.data.res.data,
            ]
            state['newsDataDisease'].links = action.payload.data.res.links
            state['newsDataDisease'].meta = action.payload.data.res.meta
          }
        }
      } else {
        state['doneLoadNews'] = false
        state['doneLoadNewsDisease'] = false
      }
      return {
        ...state,
        loadingNews: action.payload.loading,
        newsData: state['newsData'],
        newsDataDisease: state['newsDataDisease'],
        errorNews: action.payload.error,
      }
    default:
      return state
  }
}

export default newsReducer
