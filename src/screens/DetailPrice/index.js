import {FlashList} from '@shopify/flash-list'
import React, {useEffect, useState} from 'react'
import {Image, Linking, SafeAreaView, Share, View} from 'react-native'
import {IconStar} from '../../assets/img/icons'
import CustomButton from '../../components/CustomButton'
import Navbar from '../../components/Navbar'
import TextView from '../../components/TextView'
import {gstyles} from '../../utils'
import {changeDateFormat, formatText, toCurrencyFormat} from '../../utils/utils'

const DetailPrice = ({navigation: {goBack}, route}) => {
  const [detail, setDetail] = useState()
  const sizeList = [
    20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180,
    190, 200,
  ]

  useEffect(() => {
    if (route.params && route.params.detail) {
      setDetail(route.params.detail)
    }
  }, [route.params])

  const renderDetail = ({item, index}) => {
    return (
      <>
        <View className="flex-row justify-between items-center">
          <TextView
            content={changeDateFormat(item.date)}
            customClass="text-[#737373]"
          />
          <View
            className={`flex-row items-center ${
              item.creator.buyer == null ? 'bg-[#E5E5E5]' : 'bg-[#FFF8E7]'
            }  rounded-[28px] p-1 pr-3 h-[22px]`}>
            {item.creator.buyer != null && <IconStar />}
            <TextView
              content={`${
                item.creator.buyer == null
                  ? 'Belum terverifikasi'
                  : 'Terverifikasi'
              } `}
              customClass="ml-1 text-[12px] h-[16px] leading-4"
            />
          </View>
        </View>
        <View className="flex-row items-center mt-2">
          <Image
            className="rounded-full"
            style={{
              width: 32,
              height: 32,
            }}
            source={{
              uri: `https://app.jala.tech/storage/${item.creator.avatar}`,
            }}
          />
          <View className="ml-2">
            <TextView
              content="Supplier"
              customClass="text-[12px] text-[#A09E9E] leading-4 tracking-[0.3px]"
            />
            <TextView
              content={item.creator.name}
              customClass="leading-5 tracking-[0.5px]"
              customStyle={gstyles.typefaceBold}
            />
          </View>
        </View>
        <View className="flex flex-row items-center justify-between mt-[6px]">
          <View className="w-[70%]">
            <TextView
              content="Kontak"
              customClass="text-[12px] text-[#A09E9E] leading-4"
            />
            <TextView
              content={item.contact}
              customClass="text-[16px] leading-6 mr-3 tracking-[0.5px]"
              customStyle={gstyles.typefaceBold}
              ellipsis="tail"
              lines={1}
            />
          </View>
          <CustomButton
            containerClass="px-4 py-[6px]"
            customClass="leading-5 tracking-[0.5px]"
            text="Hubungi"
            onPress={() => Linking.openURL(`tel:${item.creator.phone}`)}
          />
        </View>
        <View className="mt-5">
          <TextView
            content="Daftar Harga"
            customClass="text-[16px] leading-6 tracking-[0.5px]"
            customStyle={gstyles.typefaceBold}
          />
          <View className="flex-1 mt-3">
            <FlashList
              data={sizeList}
              estimatedItemSize={100}
              initialNumToRender={sizeList.length}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderListPrice}
              showsVerticalScrollIndicator={false}
            />
            {/* <FlatList
            data={sizeList}
            initialNumToRender={sizeList.length}
            className="mt-3"
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderListPrice}
            showsVerticalScrollIndicator={false}
          /> */}
          </View>
        </View>
        <View className="mt-4">
          <TextView
            content="Catatan"
            customClass="text-[16px] leading-6 tracking-[0.5px]"
            customStyle={[gstyles.primaryText, gstyles.typefaceBold]}
          />
          <TextView
            content={item.remark ? item.remark : '-'}
            customClass="mt-1 leading-5"
          />
        </View>
      </>
    )
  }

  const renderListPrice = ({item, index}) => {
    return (
      <View className={`flex-row items-center ${index !== 0 && 'mt-3'}`}>
        <TextView
          content={`Size ${item}`}
          customClass="text-[16px] basis-1/4 leading-5"
        />
        <TextView
          content={`Rp ${toCurrencyFormat(detail[`size_${item}`])}`}
          customClass="text-[16px] basis-3/4 leading-5 ml-1"
        />
      </View>
    )
  }

  const shareVia = async () => {
    try {
      const result = await Share.share({
        message: `https://app.jala.tech/shrimp_prices/${detail.id}`,
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
    <SafeAreaView className="flex-1 bg-[#F1F5F9]">
      <Navbar
        back
        share
        title="Harga Udang"
        navigate={goBack}
        shareVia={shareVia}
      />
      {detail && (
        <>
          <View className="p-3 bg-white">
            <TextView
              content={formatText(detail.region.province_name)}
              customClass="text-[16px] leading-6 tracking-[0.5px]"
              customStyle={gstyles.typefaceBold}
            />
            <TextView
              content={formatText(detail.region.name)}
              customClass="text-[16px] text-[#737373] leading-6 tracking-[0.5px]"
              customStyle={gstyles.typefaceBold}
            />
          </View>
          <View className="flex-1 px-4 py-2 bg-white mt-1">
            <FlashList
              data={[detail]}
              estimatedItemSize={100}
              contentContainerStyle={{paddingBottom: 24}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderDetail}
              showsVerticalScrollIndicator={false}
            />
            {/* <FlatList
            data={[detail]}
            className="px-4 py-2 bg-white mt-1 h-full"
            contentContainerStyle={{paddingBottom: 24}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderDetail}
            showsVerticalScrollIndicator={false}
          /> */}
          </View>
        </>
      )}
    </SafeAreaView>
  )
}

export default DetailPrice
