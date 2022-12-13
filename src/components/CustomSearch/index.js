import React, {useState} from 'react'
import {StyleSheet, TextInput, View, Platform} from 'react-native'
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
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }>
        <IconSearch style={{marginLeft: 1}} />
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
  searchBar__unclicked: {
    paddingVertical: Platform.OS == 'ios' ? 16 : 4,
    paddingHorizontal: Platform.OS == 'ios' ? 12 : 12,
    flexDirection: 'row',
    backgroundColor: '#F5F6F7',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  searchBar__clicked: {
    paddingVertical: Platform.OS == 'ios' ? 16 : 4,
    paddingHorizontal: Platform.OS == 'ios' ? 12 : 12,
    flexDirection: 'row',
    backgroundColor: '#F5F6F7',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1B77DF',
    alignItems: 'center',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '80%',
    color: theme.textColorPrimary,
  },
})
