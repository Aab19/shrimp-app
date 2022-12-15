import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Share,
  TouchableOpacity,
  View,
} from 'react-native'
import WebView from 'react-native-webview'
import {useDispatch, useSelector} from 'react-redux'
import {IconArrowBack, IconShare} from '../../assets/img/icons'
import CardNews from '../../components/CardNews'
import TextView from '../../components/TextView'
import {getNews} from '../../store/news/action'
import {gstyles, theme} from '../../utils'

const News = ({status, active}) => {
  const dispatch = useDispatch()
  const {newsData, doneLoadNews, newsDataDisease, doneLoadNewsDisease} =
    useSelector(state => state.News)
  const [data, setData] = useState([])
  const [dataDisease, setDataDisease] = useState([])
  const [newsPage, setNewsPage] = useState(1)
  const [newsDiseasePage, setNewsDiseasePage] = useState(1)
  const [pageLoading, setPageLoading] = useState(false)
  const [pageLoadingDisease, setPageLoadingDisease] = useState(false)
  const [modalWebView, setModalWebView] = useState({
    show: false,
    id: '',
  })

  useEffect(() => {
    if (status == 2 && data.length == 0) {
      dispatch(getNews(newsPage, 'news', true))
    }
    if (status == 3 && dataDisease.length == 0) {
      dispatch(getNews(newsDiseasePage, 'disease', true))
    }
  }, [status])

  useEffect(() => {
    if (status == 2) {
      dispatch(getNews(newsPage, 'news'))
    }
  }, [newsPage])

  useEffect(() => {
    if (status == 3) {
      dispatch(getNews(newsDiseasePage, 'disease'))
    }
  }, [newsDiseasePage])

  useEffect(() => {
    if (doneLoadNews && status == 2) {
      setPageLoading(false)
      setData(newsData.data)
    }
    if (doneLoadNewsDisease && status == 3) {
      setPageLoadingDisease(false)
      setDataDisease(newsDataDisease.data)
    }
  }, [doneLoadNews, doneLoadNewsDisease])

  const renderNews = useCallback(({item, index}) => {
    return (
      <CardNews
        key={index}
        idx={index}
        data={item}
        news={status == 2 ? true : false}
        disease={status == 3 ? true : false}
        shareVia={() => shareVia(item.id)}
        modalWebView={() =>
          setModalWebView({
            show: true,
            id: item.id,
          })
        }
      />
    )
  }, [])  
    
  const keyExtractor = useCallback((item, index) => index.toString(), [])

  const renderFooter = () => {
    return (
      <Fragment>
        <View
          className={`mt-3 ${
            pageLoading || pageLoadingDisease ? 'flex' : 'hidden'
          }`}>
          <ActivityIndicator color={theme.statusBarColor} />
        </View>
      </Fragment>
    )
  }

  const handleOnEndReached = () => {
    if (status == 2 && data && newsPage < newsData.meta.last_page) {
      setPageLoading(true)
      setNewsPage(newsPage + 1)
    }
    if (
      status == 3 &&
      dataDisease &&
      newsDiseasePage < newsDataDisease.meta.last_page
    ) {
      setPageLoadingDisease(true)
      setNewsDiseasePage(newsDiseasePage + 1)
    }
  }

  const shareVia = async shareId => {
    try {
      let url =
        status == 2
          ? `https://app.jala.tech/posts/${shareId}`
          : `https://app.jala.tech/web_view/diseases/${shareId}`
      const result = await Share.share({
        message: url,
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Fragment>
      <Modal
        className="relative"
        animationType="slide"
        transparent={true}
        visible={modalWebView.show}>
        <View className="w-full h-full relative z-20 bg-[#F1F5F9]">
          <View className="p-4 bg-[#1B77DF] flex-row justify-between items-center">
            <View>
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() =>
                  setModalWebView({ 
                    show: false,
                    id: '',
                  })
                }>
                <IconArrowBack />
                <TextView
                  content={status == 2 ? 'Kabar Udang' : 'Info Penyakit'}
                  customClass="text-white ml-3 text-[16px]"
                  customStyle={gstyles.typefaceBold}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => shareVia(modalWebView.id)}>
                <IconShare />
              </TouchableOpacity>
            </View>
          </View>
          
          <WebView
            className="mx-3 mt-4"
            source={{
              uri: `${
                status == 2
                  ? `https://app.jala.tech/web_view/posts/${modalWebView.id}`
                  : `https://app.jala.tech/web_view/diseases/${modalWebView.id}`
              } `,
            }}
            scalesPageToFit
            startInLoadingState
          />
        </View>
      </Modal>

      <View className={`p-4 ${active ? 'flex' : 'hidden'} bg-white`}>
        <TextView
          content={`${status == 2 ? 'Kabar Terbaru' : 'Daftar Penyakit'} `}
          customClass="text-[#004492] text-[18px] leading-6 tracking-[0.5px] ml-1"
          customStyle={gstyles.typefaceBold}
        />
        <FlatList
          className={`${status == 2 ? 'flex' : 'hidden'} mt-[15px]`}
          data={data}
          contentContainerStyle={{paddingBottom: 160}}
          keyExtractor={keyExtractor}
          renderItem={renderNews}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.5}
          maxToRenderPerBatch={10}
        />

        <FlatList
          className={`${status == 3 ? 'flex' : 'hidden'} mt-[15px]`}
          data={dataDisease}
          contentContainerStyle={{paddingBottom: 140}}
          keyExtractor={keyExtractor}
          renderItem={renderNews}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.5}
          maxToRenderPerBatch={10}
        />
      </View>
    </Fragment>
  )
}

export default News
