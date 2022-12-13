import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {IconArrowBack, IconShare} from '../../assets/img/icons'
import {gstyles} from '../../utils/styles'
import TextView from '../TextView'

const Navbar = ({title, back, share, navigate, shareVia}) => {
  return (
    <View className="flex-row p-4 bg-[#1B77DF] justify-between">
      <View className="flex-row items-center">
        {back && (
          <TouchableOpacity onPress={() => navigate()}>
            <IconArrowBack />
          </TouchableOpacity>
        )}

        <TextView
          content={title}
          customClass="text-white text-[18px] ml-4"
          customStyle={gstyles.typefaceBold}
        />
      </View>
      {share && (
        <TouchableOpacity onPress={() => shareVia()}>
          <IconShare />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Navbar
