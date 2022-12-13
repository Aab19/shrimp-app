import React, {Fragment, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {
  IconCloseCircleGrey,
  IconLocation,
  IconScales,
} from '../../assets/img/icons'
import CardPrice from '../../components/CardPrice'
import CustomBottomSheet from '../../components/CustomBottomSheet'
import CustomSearch from '../../components/CustomSearch'
import TextView from '../../components/TextView'
import {
  getLocation,
  getSearchLocation,
  getShrimpPrice,
  resetSearchLocation,
} from '../../store/price/action'
import {gstyles, theme} from '../../utils'
import {formatText} from '../../utils/utils'

const Pricing = ({status, navigate}) => {
  const dispatch = useDispatch()
  const {
    dataShrimpPrice,
    listLocation,
    searchedLocation,
    doneLoadContent,
    doneLoadLocation,
    doneLoadSearchLocation,
  } = useSelector(state => state.ShrimpPrice)
  const [shrimpPriceData, setShrimpPriceData] = useState([])
  const [shrimpPricePage, setShrimpPricePage] = useState(1)
  const [pageLoading, setPageLoading] = useState(false)
  const [sizeValue, setSizeValue] = useState(20)
  const [locationData, setLocationData] = useState([])
  const [locationPage, setLocationPage] = useState(1)
  const [pageLocationLoading, setPageLocationLoading] = useState(false)
  const [listSearchLocation, setListSearchLocation] = useState([])
  const [searchLoad, setSearchLoad] = useState(false)
  const [searchPhrase, setSearchPhrase] = useState('')
  const [bottomSheetSizeFilter, setBottomSheetSizeFilter] = useState(false)
  const [bottomSheetLocationFilter, setBottomSheetLocationFilter] =
    useState(false)
  const [refreshPriceData, setRefreshPriceData] = React.useState(false)
  const [selectedLocation, setSelectedLocation] = useState({
    id: 0,
    name: 'Indonesia',
  })

  useEffect(() => {
    if (status == 1 && locationData.length == 0) {
      dispatch(getLocation(locationPage))
    }
  }, [status])

  useEffect(() => {
    dispatch(getShrimpPrice(shrimpPricePage, selectedLocation.id))
  }, [shrimpPricePage])

  useEffect(() => {
    if (bottomSheetLocationFilter) {
      dispatch(getLocation(locationPage, true))
    }
  }, [locationPage])

  useEffect(() => {
    if (doneLoadContent) {
      setPageLoading(false)
      setRefreshPriceData(false)
      setShrimpPriceData(dataShrimpPrice.data)
    } else {
      setPageLoading(false)
    }

    if (doneLoadLocation && listLocation.data.length !== 0) {
      setPageLocationLoading(false)
      setLocationData(listLocation.data)
    } else {
      setPageLocationLoading(false)
    }

    if (doneLoadSearchLocation) {
      setSearchLoad(false)
      if (searchedLocation.data.length == 0) {
        setListSearchLocation([])
      } else {
        setListSearchLocation(searchedLocation.data)
      }
    }
  }, [doneLoadContent, doneLoadLocation, doneLoadSearchLocation])

  const renderCardShrimpPrice = ({item, index}) => {
    return (
      <CardPrice
        key={index}
        data={item}
        size={sizeValue}
        navigate={navigate}
        price={`size_${sizeValue}`}
      />
    )
  }
  const sizeList = [
    20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180,
    190, 200,
  ]

  const renderSizeList = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSizeValue(item)
          setBottomSheetSizeFilter(false)
        }}>
        <TextView
          content={item}
          customClass={`${index == 0 ? 'mt-0' : 'mt-6'}`}
        />
      </TouchableOpacity>
    )
  }

  const renderLocationList = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onSelectedLocation(item)
        }}>
        <TextView
          content={formatText(item.full_name)}
          customClass={`${index == 0 ? 'mt-0' : 'mt-6'}`}
        />
      </TouchableOpacity>
    )
  }

  const onSelectedLocation = item => {
    setSelectedLocation({
      id: item.id,
      name: item.name,
    })
    setBottomSheetLocationFilter(false)
    setShrimpPricePage(1)
    setSearchPhrase('')
    setListSearchLocation([])
    dispatch(resetSearchLocation())
    dispatch(getShrimpPrice(shrimpPricePage, item.id, true))
  }

  const renderFooter = () => {
    return (
      <View
        className={`mt-3 ${
          pageLoading || pageLocationLoading ? 'flex' : 'hidden'
        }`}>
        <ActivityIndicator color={theme.statusBarColor} />
      </View>
    )
  }

  const handleOnEndReached = () => {
    if (shrimpPriceData && shrimpPricePage < dataShrimpPrice.meta.last_page) {
      setPageLoading(true)
      setShrimpPricePage(shrimpPricePage + 1)
    } else {
      setPageLoading(false)
    }

    if (
      locationData &&
      bottomSheetLocationFilter &&
      locationPage < listLocation.meta.last_page
    ) {
      setPageLocationLoading(true)
      setLocationPage(locationPage + 1)
    } else {
      setPageLocationLoading(false)
    }
  }

  const onSubmitSearch = value => {
    if (value == '') {
      setListSearchLocation([])
    } else {
      setSearchLoad(true)
      dispatch(getSearchLocation(searchPhrase))
    }
  }

  const onRefreshProduct = () => {
    setRefreshPriceData(true)
    setPageLoading(true)
    setShrimpPricePage(1)
    setSelectedLocation({
      id: 0,
      name: 'Indonesia',
    })
    dispatch(getShrimpPrice(1, 0, true))
  }

  return (
    <Fragment>
      <CustomBottomSheet visible={bottomSheetSizeFilter}>
        <View className="bg-white h-[93%] absolute left-0 right-0 bottom-0 rounded-t-[16px]">
          <View className="flex-row justify-between items-center p-4">
            <TextView
              content="Size"
              customClass="text-[16px]"
              customStyle={gstyles.typefaceBold}
            />
            <TouchableOpacity onPress={() => setBottomSheetSizeFilter(false)}>
              <TextView
                content="Tutup"
                customStyle={[gstyles.typefaceBold, gstyles.blueText]}
              />
            </TouchableOpacity>
          </View>
          <View className="h-[2px] w-full bg-[#E5E5E5]"></View>
          <FlatList
            data={sizeList}
            className="p-4"
            contentContainerStyle={{paddingBottom: 40}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderSizeList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </CustomBottomSheet>

      <CustomBottomSheet visible={bottomSheetLocationFilter}>
        <View className="bg-white h-[85%] absolute left-0 right-0 bottom-0 rounded-t-[16px]">
          <View className="p-4">
            <View className="flex-row items-center justify-between">
              <TextView
                content="Kota/kabupaten"
                customClass="text-[16px]"
                customStyle={gstyles.typefaceBold}
              />
              <TouchableOpacity
                onPress={() => {
                  setBottomSheetLocationFilter(false)
                  Keyboard.dismiss()
                  setSearchPhrase('')
                  setListSearchLocation([])
                  dispatch(resetSearchLocation())
                }}>
                <TextView
                  content="Tutup"
                  customStyle={[gstyles.typefaceBold, gstyles.blueText]}
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center mt-3">
              <CustomSearch
                containerClass="w-full"
                customClass="py-0"
                value={searchPhrase}
                onChangeText={text => setSearchPhrase(text)}
                submitSearch={() => onSubmitSearch()}
              />
              <TouchableOpacity
                className="relative right-[20px]"
                onPress={() => {
                  Keyboard.dismiss()
                  setSearchPhrase('')
                  setListSearchLocation([])
                  dispatch(resetSearchLocation())
                }}>
                <IconCloseCircleGrey width={20} height={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="h-[2px] w-full bg-[#E5E5E5]"></View>

          {searchLoad &&
          listSearchLocation &&
          (listSearchLocation.length !== 0 ||
            listSearchLocation.length == 0) ? (
            <View className="mt-3">
              <ActivityIndicator color={theme.statusBarColor} />
            </View>
          ) : !searchLoad &&
            listSearchLocation &&
            listSearchLocation.length !== 0 ? (
            <FlatList
              data={listSearchLocation}
              className={`p-4 ${
                listSearchLocation && listSearchLocation.length == 0
                  ? 'hidden'
                  : 'flex'
              }`}
              contentContainerStyle={{paddingBottom: 40}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderLocationList}
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <FlatList
              data={locationData}
              className={`p-4 ${
                listSearchLocation && listSearchLocation.length == 0
                  ? 'flex'
                  : 'hidden'
              }`}
              contentContainerStyle={{paddingBottom: 40}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderLocationList}
              ListFooterComponent={renderFooter}
              onEndReached={handleOnEndReached}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </CustomBottomSheet>

      <View className={`p-4 ${status == 1 ? 'flex' : 'hidden'}`}>
        {shrimpPriceData.length == 0 ? (
          <View className="justify-center items-center">
            <TextView
              content="Not Found"
              customClass="text-[22px]"
              customStyle={gstyles.typefaceBold}
            />
          </View>
        ) : (
          <Fragment>
            <View className="justify-center items-center">
              <TextView
                content="Harga Terbaru"
                customClass="text-[#004492] text-[18px]"
                customStyle={gstyles.typefaceBold}
              />
            </View>
            <FlatList
              className="p-2 pt-0 mt-3"
              data={shrimpPriceData}
              extraData={sizeValue}
              contentContainerStyle={{paddingBottom: 200}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderCardShrimpPrice}
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
              onEndReached={handleOnEndReached}
              onEndReachedThreshold={0.5}
              maxToRenderPerBatch={10}
              refreshControl={
                <RefreshControl
                  refreshing={refreshPriceData}
                  onRefresh={onRefreshProduct}
                  colors={[theme.statusBarColor]}
                  tintColor={theme.statusBarColor}
                />
              }
            />
          </Fragment>
        )}
      </View>

      {status == 1 && (
        <View className="flex-row absolute bottom-2 left-3 right-3 z-10">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setBottomSheetSizeFilter()}
            className="bg-[#004492] p-2 shrink rounded-l-[60px] pl-4 py-2 pr-14 flex-row items-center">
            <IconScales />
            <View className="ml-3">
              <TextView
                content="Size"
                customClass="text-[12px]"
                customStyle={gstyles.whiteText}
              />
              <TextView
                content={sizeValue}
                customClass="mt-[1px]"
                customStyle={[gstyles.whiteText, gstyles.typefaceBold]}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setBottomSheetLocationFilter(true)
              setSearchPhrase('')
              setListSearchLocation([])
            }}
            className="bg-[#1B77DF] flex-row items-center grow rounded-r-[60px] pl-5">
            <IconLocation />
            <TextView
              content={`${
                selectedLocation.id == 0
                  ? 'Indonesia'
                  : formatText(selectedLocation.name)
              }`}
              customClass="text-[16px] ml-3 w-[58%]"
              customStyle={[gstyles.whiteText, gstyles.typefaceBold]}
              ellipsis="tail"
              lines={1}
            />
          </TouchableOpacity>
        </View>
      )}
    </Fragment>
  )
}

export default Pricing
