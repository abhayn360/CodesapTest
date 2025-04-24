import { ActivityIndicator, Alert, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import RootLayout from './Layout/Rootlayout'
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused, useNavigation } from '@react-navigation/native'
const HEIGHT = Dimensions.get('screen').height

const Home = () => {
  const [products, setproducts] = useState([])
  const [loading, setloading] = useState(false)
  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    setloading(true)
    try {
      fetch('https://fakestoreapi.com/products').then((res) => res.json()).then((data) => {
        console.log('products', data);
        setloading(false)

        setproducts(data)
      })
    }
    catch (err) {
      setloading(false)

      Alert.alert(err)

    }


  }

  const [cart, setCart] = useState([]);
  const isFocused = useIsFocused()

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart !== null) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart from AsyncStorage:', error);
      }
    };

    loadCart();
  }, [isFocused]);

  console.log(cart)
  const addToCart = async (product) => {
    try {
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
      let updatedCart = [...cart];

      if (existingItemIndex >= 0) {
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }

      setCart(updatedCart);

      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));

      Alert.alert('Success', `${product.title} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'Failed to add item to cart');
    }
  };



  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <View style={styles.imageContainer}>
        <View >
          <Image source={{ uri: item.image }} style={{ height: 100, width: 100 }} />
        </View>
      </View>
      <Text style={styles.productName} numberOfLines={2}>{item.title}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.productPrice}>{item.price} $ </Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => addToCart(item)}
        >

          <Icon
            type='antdesign'
            name='pluscircle'
            size={23}
            color={"gray"}
          />
        </TouchableOpacity>
      </View>

    </View>
  );
  const navigation = useNavigation()
  return (
    <RootLayout >

      <View style={styles.container}>

        <View style={{ marginTop: '4%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image source={{ uri: "https://randomuser.me/api/portraits/men/86.jpg" }}
            style={{ height: 40, width: 40, borderRadius: 60 }}
            resizeMode='contain'
          />

          <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', color: '#000', flex: 1, }}> Home </Text>

          <TouchableOpacity onPress={() => cart && cart.length !== 0 && navigation.navigate('Cart')}>
            <Icon
              type='antdesign'
              name='shoppingcart'
              size={23}
            />
            <Text>{cart?.length}</Text>
          </TouchableOpacity>

        </View>
        {loading &&
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>

            <ActivityIndicator size="large" />

          </View>
        }
        <Text style={{ fontFamily: 'Poppins-Bold', color: '#000', marginTop: 10 }}>Most popular </Text>
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />






      </View>


    </RootLayout>

  )
}

export default Home

const styles = StyleSheet.create({
  rootcontainer: {
    backgroundColor: '#fff',
    height: HEIGHT
  },
  usersection: {
    flexDirection: 'row',
    padding: 15
  },
  container: {
    paddingHorizontal: '4%'
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productItem: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxWidth: '48%',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  imageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#888',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
})

