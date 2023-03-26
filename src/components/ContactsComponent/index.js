import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import colors from '../../assets/theme/colors';
import AppModal from '../common/AppModal';
import CustomButton from '../common/CustomButton';
import Icon from '../common/Icon';
import Message from '../common/Message';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {CONTACTS_DETAIL, CREATE_CONTACT} from '../../constants/routesNames';
import {s} from 'react-native-size-matters';

const ContactsComponent = ({modalVisible, loading, data, setModalVisible}) => {
  const {navigate} = useNavigation();
  const swipeableItemRefs = useRef([]);

  const toggleSwipeable = key => {
    swipeableItemRefs.current.forEach((ref, i) => {
      if (ref.id !== key) {
        swipeableItemRefs.current?.[i]?.swipeable?.close();
      }
    });
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
        <Message info message="No contacts to show" />
      </View>
    );
  };
  const renderItem = ({item}) => {
    const {contact_picture, first_name, country_code, phone_number, last_name} =
      item;
    const renderLeftActions = (progress, dragX) => {
      return (
        <View style={[{flexDirection: 'row', paddingRight: 5}]}>
          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <Icon
              name="chat"
              type="material"
              size={s(22)}
              color={colors.white}
            />
            <Text style={styles.actionText} numberOfLines={1}>
              Chat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <Icon
              name={'heart-outline'}
              type="materialCommunity"
              size={22}
              color={colors.white}
            />
            <Text numberOfLines={1} style={styles.actionText}>
              Favorite
            </Text>
          </TouchableOpacity>
        </View>
      );
    };
    const {id} = item;
    return (
      <Swipeable
        ref={ref =>
          swipeableItemRefs.current.push({
            id,
            swipeable: ref,
          })
        }
        friction={2}
        leftThreshold={80}
        rightThreshold={40}
        onSwipeableWillOpen={() => toggleSwipeable(id)}
        // renderLeftActions={(progress, dragX) =>
        //   renderLeftActions(progress, dragX, item)
        // }
        renderRightActions={(progress, dragX) =>
          renderLeftActions(progress, dragX, item)
        }>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            navigate(CONTACTS_DETAIL, {item});
          }}>
          <View style={styles.item}>
            {contact_picture ? (
              <Image
                style={{width: 45, height: 45, borderRadius: 100}}
                source={{uri: contact_picture}}
              />
            ) : (
              <View
                style={{
                  width: 45,
                  height: 45,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.grey,
                  borderRadius: 100,
                }}>
                <Text style={[styles.name, {color: colors.white}]}>
                  {first_name[0]}
                </Text>
                <Text style={[styles.name, {color: colors.white}]}>
                  {last_name[0]}
                </Text>
              </View>
            )}

            <View style={{paddingLeft: 20}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.name}>{first_name}</Text>

                <Text style={styles.name}> {last_name}</Text>
              </View>
              <Text
                style={
                  styles.phoneNumber
                }>{`${country_code} ${phone_number}`}</Text>
            </View>
          </View>
          <Icon name="right" type="ant" size={18} color={colors.grey} />
        </TouchableOpacity>
      </Swipeable>
    );
  };
  return (
    <>
      <View>
        <FlatList
          renderItem={renderItem}
          data={data}
          keyExtractor={item => String(item.id)}
          ListEmptyComponent={ListEmptyComponent}
        />

        {loading && (
          <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => {
          navigate(CREATE_CONTACT);
        }}>
        <Icon name="plus" size={21} color={colors.white} />
      </TouchableOpacity>
    </>
  );
};

export default ContactsComponent;
