'use strict';

import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { bindActionCreators } from 'redux';
import { connect  } from 'react-redux';
import userActions from '../../actions/user-actions';

import colors from '..//style/colors';
import dimensions from '..//style/dimensions';
import trailAngelApi from '../../api/trailangel-api';

class SupplyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.state.userReducer.userId,
      dimensions: {
        width: 1,
        height: 1
      },
      inputText: '',
      supplies: [
        // This is the shape of a supply item element in the supplies array
        //{name: 'Flashlight', isChecked: false},
        //{name: 'Trail Mix', isChecked: false}
      ]
    }

  }

  // Populate saved supply list if one exists
  componentDidMount() {
    return trailAngelApi.getSupplyItems(this.state.userId)
    .then((supplylist) => {
      this.setState({
        supplies: supplylist
      });
    })
    .catch((err) => {
      console.error('error getting supply list', err);
    })
  }

  _onLayoutChange = (e) => {
    this.setState({
      dimensions: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height
      }
    });
  }

  // Handler for clicking on a checkbox icon
  _handleItemPress = (index, e) => {
    let updatedSupplies = this.state.supplies.slice();
    // Toggle the isChecked property
    updatedSupplies[index].isChecked = !updatedSupplies[index].isChecked;
    return trailAngelApi.updateSupplyItem(
      this.state.userId,
      updatedSupplies[index].name,
      updatedSupplies[index].isChecked)
    .then((res) => {
      this.setState({
        supplies: updatedSupplies
      });
    })
    .catch((err) => {
      console.error('There was an error updating checkbox', err);
    });
  }

  // Handler for deleting an item from the supply list
  _handleItemDelete = (index, e) => {
    let updatedSupplies = this.state.supplies.slice();
    updatedSupplies.splice(index, 1);
    return trailAngelApi.removeSupplyItem(this.state.userId, this.state.supplies[index].name)
    .then((res) => {
      this.setState({
        supplies: updatedSupplies
      });
    })
    .catch((err) => {
      console.error('There was an error deleting the item', err);
    });
  }

  // Handler for submitting a supply item
  _handleSubmit = (e) => {
    let updatedSupplies = this.state.supplies.slice();
    updatedSupplies.push({name: e.nativeEvent.text, isChecked: false});
    return trailAngelApi.addSupplyItem(this.state.userId, e.nativeEvent.text)
    .then((res) => {
      this.setState({
        supplies: updatedSupplies,
        inputText: ''
      });
    })
    .catch((err) => {
      console.error('Error adding item to database', err);
    });
  }

  render() {
    const orientation = this.state.dimensions.width < this.state.dimensions.height ?
      'portrait' : 'landscape';
    let keyId = 0 // Reset unique key counter for SupplyListItem components

    return (
      <View
        style={styles.container}
        marginTop={dimensions.navHeight(orientation)}
        onLayout={this._onLayoutChange}
      >
        <TextInput
          style={styles.textInput}
          value={this.state.inputText}
          placeholder='Input supply list item'
          onChangeText={(text) => this.setState({inputText: text})}
          onSubmitEditing={this._handleSubmit}
          returnKeyType='done'
          maxLength={17}
        />
        <View style={styles.list}>
          {
            this.state.supplies.map((item, index) => {
              return (
                <SupplyListItem
                  index={index}
                  name={item.name}
                  isChecked={item.isChecked}
                  key={keyId++}
                  onPress={this._handleItemPress}
                  onDelete={this._handleItemDelete}
                />
              )
            })
          }
        </View>
      </View>
    );
  }
};

const mapStateToProps = function(state) {
  return {
    state: state
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplyList);


const SupplyListItem = (props) => {
  const CheckBoxIcon = props.isChecked ?
    <Icon name='check-square' style={styles.icon} /> :
    <Icon name='square' style={styles.icon} />;

  return (
    <View style={styles.listItem}>
      <TouchableWithoutFeedback onPress={props.onPress.bind(this, props.index)}>
        {CheckBoxIcon}
      </TouchableWithoutFeedback>
      <Text style={styles.listItemText}> {props.name} </Text>
      <TouchableHighlight onPress={props.onDelete.bind(this, props.index)}>
        <Icon name='times' style={styles.icon} />
      </TouchableHighlight>
    </View>
  );
}


const styles = StyleSheet.create({
  // SupplyList styles
  container: {
    width: dimensions.windowWidth(),
    height: dimensions.windowHeight(),
    flexDirection: 'column',
    alignItems: 'center'
  },

  textInput: {
    marginTop: 20,
    paddingLeft: 10,
    height: 40,
    width: 200,
    alignSelf: 'center',
    borderColor: colors.midgray,
    borderWidth: 0.5,
    borderRadius: 5
  },

  list: {
    marginTop: 20,
    width: dimensions.windowWidth() - 14,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'column',
    borderColor: colors.beige,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5
  },

  // SupplyListItem styles
  listItem: {
    margin: 10,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flexDirection:'row'
  },

  listItemText: {
    padding: 10,
    fontSize: 20
  },

  icon: {
    padding:10,
    fontSize:24,
    color:'#000000'
  }
});
