import React from 'react'
import {Text} from 'react-native'

const TextView = ({
  customClass,
  customStyle,
  lines,
  ellipsis,
  content,
  enablePress,
  onPress = () => {},
}) => {
  return (
    <Text
      disabled={enablePress ? false : true}
      className={`font-['Lato-Regular'] text-[14px] text-[#454646] ${customClass}`}
      style={customStyle}
      numberOfLines={lines}
      ellipsizeMode={ellipsis}
      onPress={onPress}>
      {content}
    </Text>
  )
}

export default TextView
