//import liraries
import React, {useState} from 'react';
import { View, Text, Image } from 'react-native';
import { Card, RadioButton, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FormatDate } from '../../validate/FormatDate';
import styles from '../../screen/Home/styles';
const listFlag = {
    F0001: {
        name: 'very-important',
        title: 'Rất quan trọng',
        color: '#EB5757',
        background: 'rgba(235, 87, 87, 0.2)',
        value: 'F0001',
    },
    F0002: {
        name: 'important',
        title: 'Quan trọng',
        color: '#F2994A',
        background: 'rgba(242, 153, 74, 0.2)',
        value: 'F0002',
    },
    F0003: {
        name: 'not-important',
        title: 'Không quan trọng',
        color: '#F2C94C',
        background: 'rgba(242, 201, 76, 0.2)',
        value: 'F0003',
    },
    F0004: {
        name: 'dont-care',
        title: 'Không quan tâm',
        color: '#2D9CDB',
        background: 'rgba(45, 156, 219, 0.2)',
        value: 'F0004',
    }
}

const listStatus = {
    S0001: {
        name: 'failed',
        color: '#EB5757',
        value: 'S0001',
    },
    S0002: {
        name: 'ongoing',
        color: '#F2994A',
        value: 'S0002',
    },
    S0003: {
        name: 'success',
        color: '#00C853',
        value: 'S0003',
    }
}
// create a component
const Contact = ({item, route, handleViewContact, checkListGroup, handleReActivateButton, listGroup = [], visibleCheckBox}) => {

    return (
        <Card mode='elevated' style={styles.card} elevation={2} onPress={() => handleViewContact(item.id)}>
            <View>
                <View style={styles.item}>
                    {visibleCheckBox &&
                        <RadioButton
                            value={item.id}
                            status={listGroup.includes(item.id) ? 'checked' : 'unchecked'}
                            color={'#1890FF'}
                            onPress={() => {
                                checkListGroup(item.id, !listGroup.includes(item.id))
                            }}
                        />
                    }
                    <View style={styles.imgContact}>
                        <Image source={{ uri: item.img_url }} style={styles.image} />
                    </View>
                    <View style={styles.txtContact}>
                        <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <Text style={styles.nameContact}>{item.name}</Text>
                            {!route.params && item.flag_id &&
                                <Icon name="bookmark" size={24} color={listFlag[item.flag_id].color} />
                            }
                            {route.params && route.params.useid &&
                                <Icon name="checkbox-blank-circle" size={14} color={listStatus[item.status_id].color} />
                            }
                            {route.params && route.params.deactive &&
                                <Icon name="account-reactivate"
                                    size={24}
                                    color={"#828282"}
                                    onPress={() => handleReActivateButton(item.id)} />
                            }
                        </View>
                        <Text style={styles.titleContact}>{item.job_title}</Text>
                        <View style={styles.title}>
                            <Text numberOfLines={1} style={styles.companyContact}>{item.company}</Text>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.date}>{FormatDate(item.created_at)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {route.params && route.params.deactive &&
                    <List.Accordion
                        title="Lý do"
                        titleStyle={{ fontSize: 14 }}
                        theme={{colors: { primary: '#1890FF' }}}
                        right={(props) => <Icon {...props} />}
                        style={{ backgroundColor: '#FFF', padding: 0, margin: 0, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
                    >
                        <List.Item titleNumberOfLines={0} title={item.reason_da} />
                    </List.Accordion>
                }
            </View>
        </Card>
    );
};


//make this component available to the app
export default Contact;
