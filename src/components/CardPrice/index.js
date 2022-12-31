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
    <View
      className={`bg-white rounded-[4px] ${props.idx !== 0 && 'mt-2'}`}
      style={gstyles.boxShadow}>
      <View className={`p-3 border border-[#E5E5E5] rounded-[4px]`}>
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
                customClass="text-[12px] leading-4 tracking-[0.3px]"
                customStyle={gstyles.blueText}
              />
              <TextView
                content={creator && creator.name}
                customClass="leading-5"
              />
            </View>
          </View>
          <View
            className={`flex-row items-center ${
              creator && creator.buyer == null
                ? 'bg-[#E5E5E5] px-2 py-1 '
                : 'bg-[#FFF8E7] p-1'
            }  rounded-[28px]  h-[22px]`}>
            {creator && creator.buyer != null && <IconStar />}
            <TextView
              content={`${
                creator && creator.buyer == null
                  ? 'Belum terverifikasi'
                  : 'Terverifikasi'
              } `}
              customClass="ml-1 text-[12px] h-[16px] leading-4 tracking-[0.3px]"
            />
          </View>
        </View>

        <View>
          <TextView
            content={resultDate}
            customClass="text-[12px] mt-[10px] leading-4 tracking-[0.3px]"
            customStyle={gstyles.blueText}
          />
          <TextView
            content={provinceName}
            customClass="text-[12px] mt-1 leading-4"
          />
          <TextView
            content={regencyName}
            customClass="text-[18px] leading-6 tracking-[0.5px]"
            customStyle={gstyles.typefaceBold}
          />
        </View>

        <View className="flex-row justify-between items-center mt-1">
          <View>
            <TextView
              content={`size ${props.size}`}
              customClass="text-[12px] leading-4 tracking-[0.3px]"
              customStyle={gstyles.blueText}
            />
            <TextView
              content={`${currency_id} ${toCurrencyFormat(
                props.data[props.price],
              )}`}
              customClass="text-[22px] mt-[2px] leading-7 tracking-[1px]"
              customStyle={gstyles.typefaceBlack}
            />
          </View>
          <View>
            <CustomButton
              containerClass="px-4 py-[6px]"
              customClass="leading-5 tracking-[0.5px]"
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
    </View>
  )
}

export default CardPrice
