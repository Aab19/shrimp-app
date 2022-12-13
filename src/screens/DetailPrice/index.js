import React, {Fragment, useEffect, useState} from 'react'
import {FlatList, Image, Linking, SafeAreaView, Share, View} from 'react-native'
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
      <Fragment>
        <View className="flex-row justify-between items-center">
          <TextView
            content={changeDateFormat(item.date)}
            customClass="text-[#737373]"
          />
          <View
            className={`flex-row items-center ${
              item.creator.buyer == null ? 'bg-[#E5E5E5]' : 'bg-[#FFF8E7]'
            }  rounded-[28px] px-1 h-[22px]`}>
            {item.creator.buyer != null && <IconStar />}
            <TextView
              content={`${
                item.creator.buyer == null
                  ? 'Belum terverifikasi'
                  : 'Terverifikasi'
              } `}
              customClass="ml-1 text-[12px] h-[16px] leading-[16px]"
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
              customClass="text-[12px] text-[#A09E9E]"
            />
            <TextView
              content={item.creator.name}
              customClass="mt-[2px]"
              customStyle={gstyles.typefaceBold}
            />
          </View>
        </View>
        <View className="flex flex-row items-center justify-between mt-2">
          <View className="w-[70%]">
            <TextView
              content="Kontak"
              customClass="text-[12px] text-[#A09E9E]"
            />
            <TextView
              content={item.contact}
              customClass="mt-[2px] text-[16px] mr-6"
              customStyle={gstyles.typefaceBold}
              ellipsis="tail"
              lines={1}
            />
          </View>
          <CustomButton
            containerClass="w-[30%]"
            text="Hubungi"
            onPress={() => Linking.openURL(`tel:${item.creator.phone}`)}
          />
        </View>
        <View className="mt-4">
          <TextView
            content="Daftar Harga"
            customClass="text-[16px]"
            customStyle={gstyles.typefaceBold}
          />
          <FlatList
            data={sizeList}
            initialNumToRender={sizeList.length}
            className=""
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderListPrice}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View className="mt-4">
          <TextView
            content="Catatan"
            customClass="text-[16px]"
            customStyle={[gstyles.primaryText, gstyles.typefaceBold]}
          />
          <TextView
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam"
            customClass="mt-1"
            customStyle={gstyles.primaryText}
          />
        </View>
      </Fragment>
    )
  }

  const renderListPrice = ({item, index}) => {
    return (
      <View className="flex-row">
        <TextView
          content={`Size ${item}`}
          customClass="text-[16px] mt-3 w-[20%]"
        />
        <TextView
          content={`Rp ${toCurrencyFormat(detail[`size_${item}`])}`}
          customClass="text-[16px] mt-3 w-[80%] ml-4"
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
    <SafeAreaView className="flex-1 bg-white">
      <Navbar
        back
        share
        title="Harga Udang"
        navigate={goBack}
        shareVia={shareVia}
      />
      {detail && (
        <Fragment>
          <View className="p-3">
            <TextView
              content={formatText(detail.region.province_name)}
              customClass="text-[16px]"
              customStyle={gstyles.typefaceBold}
            />
            <TextView
              content={formatText(detail.region.name)}
              customClass="text-[16px] text-[#737373] mt-1"
              customStyle={gstyles.typefaceBold}
            />
          </View>
          <View className="h-[4px] bg-[#F6F6F6] w-full"></View>
          <FlatList
            data={[detail]}
            className="p-4"
            contentContainerStyle={{paddingBottom: 40}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderDetail}
            showsVerticalScrollIndicator={false}
          />
        </Fragment>
      )}
    </SafeAreaView>
  )
}

export default DetailPrice
