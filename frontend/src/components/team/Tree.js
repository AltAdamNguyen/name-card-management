import { useEffect, useState } from "react";
import { Card, Checkbox, TouchableRipple, IconButton } from "react-native-paper";
import { View, Text, StyleSheet, Platform, UIManager} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const Tree = ({ item, expand = false, navigation, checked = false, child = false, checklistExport, listExport = [], handleChecked }) => {
  const [expanded, setExpanded] = useState(expand);
  const [checkedItem, setCheckedItem] = useState(listExport.includes(item.id) ? true : false);
  useEffect(() => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, [])

  const toggleExpand = () => {
    setExpanded(!expanded);
  }

  useEffect(() => {
    checklistExport(item.id, checkedItem);
  }, [checkedItem]);

  const handleViewContact = () => {
    navigation.navigate("HomeSwap", {screen: "SearchContact", params: {useid: item.id, name: item.name}});
  }

  return (
    <View style={styles.container}>
      {(item.children && item.children.length !== 0) ? (
        <Card mode={child ? "outlined" : "elevated"} style={styles.card}>
          <TouchableRipple borderless={true} style={styles.row} onPress={toggleExpand} onLongPress={handleChecked}>
            <View style={styles.row_item}>
              <View style={styles.row_label}>
                {checked ?
                  (
                    <Checkbox
                      status={checkedItem ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setCheckedItem(!checkedItem);
                      }}
                      />
                  ) :
                  (
                    <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={26} color={'#828282'} />
                  )}

                <View style={styles.row_label_right}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.subtitle}>{item.email}</Text>
                </View>
              </View>
              <IconButton icon="chevron-right" size={26} color={'#828282'} onPress={handleViewContact}/>
            </View>
          </TouchableRipple>
          {expanded && item.children.map((element, index) => {
            return (
              <View key={index}>
                <View style={styles.parentHr} />
                  <Tree item={element} navigation={navigation} checked={checked} child={true} listExport={listExport} checklistExport={checklistExport} handleChecked={handleChecked} />
              </View>
            )
          })}
        </Card>
      ) : (
        <Card mode={child ? "outlined" : "elevated"} style={styles.card}>
          <TouchableRipple borderless={true} style={styles.row} onLongPress={handleChecked}>
            <View style={styles.row_item}>
              <View style={styles.row_label}>
                {checked ?
                  (
                    <Checkbox
                      status={checkedItem ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setCheckedItem(!checkedItem);
                      }}
                      />
                  ) :
                  (
                    <Icon name="account" size={26} color={'#828282'} />
                  )}
                <View style={styles.row_label_right}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.subtitle}>{item.email}</Text>
                </View>
              </View>
              <IconButton icon="chevron-right" size={26} color={'#828282'} onPress={handleViewContact}/>
            </View>

          </TouchableRipple>
        </Card>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  },
  card: {
    width: '90%',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12,
    color: '#828282',
  },
  row: {
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  row_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row_label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row_label_right: {
    marginLeft: 5
  },
  parentHr: {
    height: 1,
    color: '#fff',
    width: '100%'
  },
  child: {
    backgroundColor: '#FFF',
    padding: 16,
  }

});

export default Tree;
