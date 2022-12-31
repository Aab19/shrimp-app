import React from 'react'
import {Image, TouchableOpacity, View} from 'react-native'
import TextView from '../TextView'
import {gstyles} from '../../utils'
import {changeDateFormat} from '../../utils/utils'
import {IconShareGrey} from '../../assets/img/icons'

const CardNews = ({idx, data, modalWebView, shareVia, news}) => {
  let date = data.created_at.split(' ')[0]
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={modalWebView}
      className={`${idx && 'mt-3'}`}>
      <View className="w-full border border-[#E5E5E5] rounded-t-lg shadow-[0_4px_8px_-0_rgba(0,0,0,0.02)]">
        <Image
          className="w-full h-[160px] rounded-t"
          source={{
            uri: data.image
              ? `https://app.jala.tech/storage/${data.image}`
              : `https://app.jala.tech/storage/users/default.png`,
          }}
        />
      </View>
      <View className="px-3 py-2 border border-[#E5E5E5] border-t-0 rounded-b-lg">
        <TextView
          content={news ? data.title : data.full_name}
          customClass="text-[18px] leading-6 tracking-[0.7px]"
          customStyle={gstyles.typefaceBlack}
        />
        <TextView
          content={news ? data.excerpt : data.meta_description}
          customClass="text-[#737373] mt-1 leading-5"
          ellipsis="tail"
          lines={2}
        />
        <View className="flex-row justify-between items-center mt-2">
          <TextView
            content={changeDateFormat(date)}
            customClass="text-[#737373] leading-5"
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
