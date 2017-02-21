'use strict';

import React, { Component } from 'react';
import {  TabBarIOS,
          StyleSheet,
          View,
          Text,
          Dimensions} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import icons from './tabs/icons';
import colors from '../components/style/colors';
import Home from './tabs/home';
import Favorites from './tabs/favorites';
import Search from './tabs/search';
import More from './tabs/more';

import appActions from '../actions/app-actions';

class Index extends Component {
  constructor(props) {
    super(props);
    let { width, height } = Dimensions.get('window');
    this.state = {
      selectedTab: 'home',
      dimensions: {
        width: width,
        height: height
      }
    };
  }

  componentDidMount() {
    let profile = {};
    if (typeof this.props.profile === 'string') {
      profile = JSON.parse(this.props.profile);
    } else {
      profile = this.props.profile;
    }

    this.props.actions.initializeApp({
      userId: profile.identities[0].userId,
      email: profile.email,
      avatarUrl: profile.picture,
      nickname: profile.nickname
    })
      .catch((err) => {
        console.error('error initializing application', err);
      });
  }

  _onLayoutChange = (e) => {
    let { width, height } = Dimensions.get('window');
    this.setState({
      dimensions: {
        width,
        height
      }
    });
  }

  render() {
    const orientation = this.state.dimensions.width < this.state.dimensions.height ?
      'portrait' : 'landscape';

    return (
        <TabBarIOS
          unselectedTintColor={colors.tabBarUnselected}
          tintColor={colors.tabBarSelected}
          barTintColor={colors.tabBarColor}>
          <TabBarIOS.Item
            title='Home'
            icon={{uri: icons.homeIcon, scale: 5}}
            selected={this.state.selectedTab === 'home'}
            onPress={() => {
              this.setState({
                selectedTab: 'home',
              });
            }}>
            <View>
              <Home navigator={this.props.navigator}
                    orientation={orientation}
              />
            </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon='search'
            selected={this.state.selectedTab === 'search'}
            onPress={() => {
              this.setState({
                selectedTab: 'search',
              });
            }}>
            <View>
              <Search navigator={this.props.navigator}
                      orientation={orientation}
              />
            </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon ='favorites'
            selected={this.state.selectedTab === 'favorites'}
            onPress={() => {
              this.setState({
                selectedTab: 'favorites',
              });
            }}>
            <View>
              <Favorites navigator={this.props.navigator}
                         orientation={orientation}
              />
            </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            orientation={orientation}
            systemIcon ='more'
            selected={this.state.selectedTab === 'more'}
            onPress={() => {
              this.setState({
                selectedTab: 'more',
              });
            }}>
            <View>
              <More navigator={this.props.navigator}
                    favoritesCount={this.props.state.listingsReducer.favorites.length}
                    orientation={orientation}
              />
            </View>
          </TabBarIOS.Item>
        </TabBarIOS>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...appActions}, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});
