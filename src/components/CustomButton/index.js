import React from 'react'
import {TouchableOpacity} from 'react-native'
import {IconPlus} from '../../assets/img/icons'
import {gstyles} from '../../utils'
import TextView from '../TextView'

const CustomButton = ({
  text,
  containerClass,
  customClass,
  customStyle,
  outline,
  disabled,
  addIcon,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled ? true : false}
      className={` ${
        outline ? 'border-[1px] border-[#1B77DF]' : 'bg-[#1B77DF]'
      }  rounded-[4px] justify-center items-center px-4 py-2 ${
        disabled && 'bg-[#D9019C] opacity-20'
      } ${addIcon && 'flex-row'} ${containerClass}`}>
      {addIcon && <IconPlus style={{marginRight: 12, marginTop: -4}} />}
      <TextView
        customClass={`${
          outline ? 'text-[#F63E7C]' : 'text-white'
        }  text-[16px] ${customClass}`}
        customStyle={customStyle ? customStyle : gstyles.typefaceBold}
        content={text}
      />
    </TouchableOpacity>
  )
}

export default CustomButton
