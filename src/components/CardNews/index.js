import React from 'react'
import {Image, TouchableOpacity, View} from 'react-native'
import TextView from '../TextView'
import {gstyles} from '../../utils'
import {changeDateFormat} from '../../utils/utils'
import {IconShareGrey} from '../../assets/img/icons'

const CardNews = ({data, modalWebView, shareVia, news, disease}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={modalWebView}
      className="border bg-white border-[#E5E5E5] rounded-[4px] mt-2">
      <Image
        className="w-full h-[160px] rounded-t-[4px]"
        source={{
          uri: `https://app.jala.tech/storage/${data.image}`,
        }}
      />
      <View className="p-3">
        <TextView
          content={news ? data.title : data.full_name}
          customClass="text-[18px]"
          customStyle={gstyles.typefaceBlack}
        />
        <TextView
          content={news ? data.excerpt : data.meta_description}
          customClass="text-[#737373] mt-1 leading-5"
        />
        <View className="flex-row justify-between items-center mt-3">
          <TextView
            content={changeDateFormat(data.created_at)}
            customClass="text-[#737373]"
          />
          <TouchableOpacity onPress={shareVia}>
            <IconShareGrey />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CardNews
