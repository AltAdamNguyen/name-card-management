import { useEffect, useState } from "react";
import { Card, Checkbox } from "react-native-paper";
import { View, TouchableOpacity, Text, StyleSheet, Platform, UIManager } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const Tree = ({ item, expand = false, navigation, checked = false, child = false, checklistExport, listExport=[] }) => {
  const [expanded, setExpanded] = useState(expand);
  const [checkedItem, setCheckedItem] = useState(false);
  useEffect(() => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, [])

  const toggleExpand = () => {
    setExpanded(!expanded);
  }

  const handleViewContact = () => {
    navigation.navigate()
  }

  const handleChecked = (item) => {
    console.log(Boolean(listExport.find(i => i.id === item)))
    return Boolean(listExport.find(i => i.id === item));
  }

  return (
    <View style={styles.container}>
      {item.children.length !== 0 ? (
        <Card mode={child ? "outlined" : "elevated"} style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={toggleExpand}>
            <View style={styles.row_label}>
              {checked ?
                (
                  <Checkbox
                    status={handleChecked(item.id) ? "checked" : "unchecked"}
                    onPress={() => {
                      checklistExport(item.id, !checkedItem)
                      setCheckedItem(!checkedItem)
                    }} />
                ) :
                (
                  <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={26} color={'#828282'} />
                )}

              <View style={styles.row_label_right}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitle}>Quản lí</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={30} color={'#828282'} />
          </TouchableOpacity>
          {item.children.map((element, index) => {
            return (
              <View key={index}>
                <View style={styles.parentHr} />
                {
                  expanded &&
                  <Tree item={element} navigation={navigation} checked={checked} child={true} listExport={listExport}/>
                }
              </View>
            )
          })}
        </Card>
      ) : (
        <Card mode={child ? "outlined" : "elevated"} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.row_label}>
              {checked ?
                (
                  <Checkbox
                  status={handleChecked(item.id) ? "checked" : "unchecked"}
                    onPress={() => {
                      checklistExport(item.id, checkedItem)
                      setCheckedItem(!checkedItem)
                    }} />
                ) :
                (
                  <Icon name="account" size={26} color={'#828282'} />
                )}
              <View style={styles.row_label_right}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitle}>Nhân viên</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={30} color={'#828282'} />
          </View>
        </Card>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FFF',
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
