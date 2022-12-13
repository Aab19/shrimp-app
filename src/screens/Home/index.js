import React, {useState} from 'react'
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import Navbar from '../../components/Navbar'
import TextView from '../../components/TextView'
import {gstyles, theme} from '../../utils/styles'
import News from '../News'
import Pricing from '../Pricing'

const Home = ({navigation: {navigate}}) => {
  const listTab = [
    {
      status: {
        id: 1,
        name: 'Harga Udang',
      },
    },
    {
      status: {
        id: 2,
        name: 'Kabar Udang',
      },
    },
    {
      status: {
        id: 3,
        name: 'Penyakit',
      },
    },
  ]

  const [status, setStatus] = useState({
    id: 1,
    name: 'Harga Udang',
  })
  const setStatusFilter = status => {
    setStatus(status)
  }

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <Navbar title={status.name} />
      <View className="flex-row justify-center self-center">
        {listTab.map((e, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.btnTab,
                status.id === e.status.id && styles.btnTabActive,
              ]}
              onPress={() => setStatusFilter(e.status)}>
              <TextView
                customStyle={gstyles.typefaceBold}
                customClass={`${
                  status.id === e.status.id
                    ? 'text-[#1B77DF]'
                    : 'text-[#737373]'
                } text-[16px]`}
                content={e.status.name}
              />
            </TouchableOpacity>
          )
        })}
      </View>

      <Pricing status={status.id} navigate={navigate} />
      <News status={status.id} active={status.id == 2 ? true : false} />
      <News status={status.id} active={status.id == 3 ? true : false} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  btnTab: {
    width: Dimensions.get('window').width / 3,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: theme.white,
    borderBottomWidth: 4,
    borderBottomColor: '#F6F6F6',
  },
  btnTabActive: {
    backgroundColor: theme.white,
    borderBottomWidth: 4,
    borderBottomColor: theme.statusBarColor,
  },
})

export default Home
