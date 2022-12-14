import React from 'react'
import {Modal, View} from 'react-native'

const CustomBottomSheet = ({
  visible,
  children,
  onRequestClose = () => {},
  onCloseModal = () => {},
}) => {
  return (
    <View
      className={`${
        visible ? 'z-10' : 'z-[-1]'
      } absolute top-0 bottom-0 left-0 right-0`}
      style={{
        backgroundColor: visible ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
      }}
      >
      <Modal
        className="relative"
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        {children}
      </Modal>
    </View>
  )
}

export default CustomBottomSheet
