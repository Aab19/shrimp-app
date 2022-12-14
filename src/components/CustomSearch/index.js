import React, {useState} from 'react'
import {StyleSheet, TextInput, View} from 'react-native'
import {theme} from '../../utils/styles'
import {IconSearch} from '../../assets/img/icons'

const CustomSearch = ({
  text,
  changeText,
  containerClass,
  customClass,
  clearSearch,
  submitSearch,
  ...props
}) => {
  const [clicked, setClicked] = useState(false)

  return (
    <View className={containerClass} style={styles.container}>
      <View
        className={`relative ${customClass}`}
        style={
          clicked ? styles.searchBarClicked : styles.searchBarUnclicked
        }>
        <IconSearch style={{position: 'relative', left: 12}} />
        <TextInput
          style={styles.input}
          placeholder="Cari"
          placeholderTextColor={theme.textColorHint}
          value={text}
          onChangeText={changeText}
          onFocus={() => {
            setClicked(true)
          }}
          onBlur={() => {
            setClicked(false)
          }}
          onSubmitEditing={submitSearch}
          {...props}
        />
      </View>
    </View>
  )
}
export default CustomSearch

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchBarUnclicked: {
    flexDirection: 'row',
    backgroundColor: '#F5F6F7',
    borderRadius: 4,
    borderWidth: 2,
    width: '90%',
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  searchBarClicked: {
    flexDirection: 'row',
    backgroundColor: '#F5F6F7',
    borderRadius: 4,
    borderWidth: 2,
    width: '90%',
    borderColor: '#1B77DF',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 10,
    width: '88%',
    color: theme.textColorPrimary,
  },
})
