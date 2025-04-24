import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import RootLayout from './Layout/Rootlayout'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Cart = () => {
    const navigation = useNavigation()
    const [cart, setCart] = useState([]);

    const calculateSum = (arr) => {
        return arr.reduce((total, current) => {
            return total + current.price * current.quantity;
        }, 0);
    }
    
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
    }, []);
    console.log('cartitemssss', cart);

    const CLearCart = () => {
        // AsyncStorage.removeItem('cart')
        AsyncStorage.setItem('cart', JSON.stringify([]));

        navigation.navigate('Home')
    }

    return (
        <RootLayout>
            <View style={{ padding: 15 }}>
                <View style={{ marginTop: '4%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Image source={{ uri: "https://randomuser.me/api/portraits/men/86.jpg" }}
                        style={{ height: 40, width: 40, borderRadius: 60 }}
                        resizeMode='contain'
                    />

                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', color: '#000', flex: 1, }}> Cart </Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Icon
                            type='antdesign'
                            name='home'
                            size={23}
                        />
                    </TouchableOpacity>

                </View>

                <FlatList
                    data={cart}


                    renderItem={(i) =>

                        <>

                            <View style={{ backgroundColor: '#e5e5e520', marginTop: 15 }}>

                                <View style={{ flexDirection: 'row', }}>
                                    <Image source={{ uri: i.item.image }} style={{ height: 75, width: 75, borderRadius: 10, marginRight: 10 }} />
                                    <View>
                                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 13 }}>{i.item.title}</Text>
                                        <Text>Count : {i.item.quantity}  | Price  {i.item.price}</Text>
                                        <Text>Total Price : {i.item.quantity * i.item.price}</Text>

                                    </View>


                                    <View>

                                    </View>

                                </View>
                            </View>

                        </>
                    }


                />
                {cart &&
                    <Text style={{ marginTop: 15, fontSize: 14, fontFamily: 'Poppins-Bold', textAlign: 'center' }}>Total {parseInt(calculateSum(cart))} $ </Text>


                }

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, }}>
                    <TouchableOpacity style={{ backgroundColor: '#e5e5e5', height: 40, width: 80, justifyContent: 'center', borderRadius: 10 }} onPress={() => CLearCart()}>
                        <Text style={{ fontSize: 13, textAlign: 'center' }}> Clear cart </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#e5e5e5', height: 40, width: 80, justifyContent: 'center', borderRadius: 10 }} onPress={() => navigation.navigate('Home')}>
                        <Text style={{ fontSize: 13, textAlign: 'center' }}> Back to product list </Text>
                    </TouchableOpacity>
                </View>


            </View>

        </RootLayout>
    )
}

export default Cart

const styles = StyleSheet.create({})