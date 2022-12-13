import React from 'react'
import {Image, View} from 'react-native'
import {IconStar} from '../../assets/img/icons'
import {gstyles} from '../../utils'
import {changeDateFormat, formatText, toCurrencyFormat} from '../../utils/utils'
import CustomButton from '../CustomButton'
import TextView from '../TextView'

const CardPrice = props => {
  let {id, creator, date, region, currency_id} = props.data
  let resultDate = changeDateFormat(date)
  let provinceName = formatText(region.province_name)
  let regencyName = formatText(region.name)

  return (
    <View className="p-3 border border-[#E5E5E5] rounded-[4px] mt-2">
      <View className="flex-row justify-between">
        <View className="flex-row items-center">
          <Image
            className="rounded-full"
            style={{
              width: 32,
              height: 32,
            }}
            source={{
              uri: creator
                ? `https://app.jala.tech/storage/${creator.avatar}`
                : `https://app.jala.tech/storage/users/default.png`,
            }}
          />
          <View className="ml-2">
            <TextView
              content="Supplier"
              customClass="text-[12px]"
              customStyle={gstyles.blueText}
            />
            <TextView
              content={creator && creator.name}
              customClass="mt-[2px]"
            />
          </View>
        </View>
        <View
          className={`flex-row items-center ${
            creator && creator.buyer == null ? 'bg-[#E5E5E5]' : 'bg-[#FFF8E7]'
          }  rounded-[28px] px-1 h-[22px]`}>
          {creator && creator.buyer != null && <IconStar />}
          <TextView
            content={`${
              creator && creator.buyer == null
                ? 'Belum terverifikasi'
                : 'Terverifikasi'
            } `}
            customClass="ml-1 text-[12px] h-[16px] leading-[16px]"
          />
        </View>
      </View>

      <View>
        <TextView
          content={resultDate}
          customClass="text-[12px] mt-[10px]"
          customStyle={gstyles.blueText}
        />
        <TextView content={provinceName} customClass="text-[12px] mt-[10px]" />
        <TextView
          content={regencyName}
          customClass="text-[18px] mt-1"
          customStyle={gstyles.typefaceBold}
        />
      </View>

      <View className="flex-row justify-between items-center mt-1">
        <View>
          <TextView
            content={`size ${props.size}`}
            customClass="text-[12px]"
            customStyle={gstyles.blueText}
          />
          <TextView
            content={`${currency_id} ${toCurrencyFormat(
              props.data[props.price],
            )}`}
            customClass="text-[22px] mt-[2px]"
            customStyle={gstyles.typefaceBlack}
          />
        </View>
        <View>
          <CustomButton
            text="LIHAT DETAIL"
            onPress={() =>
              props.navigate({
                name: 'Detail Price',
                params: {
                  detail: props.data,
                },
              })
            }
          />
        </View>
      </View>
    </View>
  )
}

export default CardPrice
