'use strict';

import React, { Component } from 'react';
import { TabBarIOS, StyleSheet, View, Text } from 'react-native';

import icons from '../components/icons';
import Trails from './trails-container';
import Favorites from './favorites-container';
import TrailSearch from '../components/trail/trailSearch.component';
import Settings from '../components/trail/trailSettings.component';
import { registerUser } from '../actions/user-actions';
import * as userActions from '../actions/user-actions';

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

export default class TrailAngel extends Component {
  static title = '<TabBarIOS>';
  static description = 'Trail Angel Navigation';
  static displayName = 'TrailAngel';
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.registered = false;
    this.state = {
      selectedTab: 'redTab'
    };
  }

  componentDidMount() {

  }

  _renderContent = (color: 'string', pageText: 'string' ) => {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>Renders {pageText} Page</Text>
      </View>
    );
  };

  render() {
    // todo kind of hacky, both the fn below and the one if-block below that

    function isJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }

    if (!this.registered
        && this.props.profile !== undefined
        && isJsonString(this.props.profile))
    {
          this.registered = true;
          const { dispatch } = this.context.store;
          const profile = JSON.parse(this.props.profile);
          dispatch(userActions.registerUser({
            userId: profile.identities[0].userId,
            email: profile.email,
            avatarUrl: profile.picture
          }));
    }

    return (
      <TabBarIOS
        unselectedTintColor="yellow"
        tintColor="white"
        barTintColor="darkgreen">
        <TabBarIOS.Item
          title ="Home"
          icon={{uri: icons.homeIcon, scale: 5}}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
            });
          }}>
          <Trails />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="search"
          selected={this.state.selectedTab === 'blackTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blackTab',
            });
          }}>
        <TrailSearch />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon ="favorites"
          selected={this.state.selectedTab === 'greyTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greyTab',
            });
          }}>
          <Favorites />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon ="more"
          selected={this.state.selectedTab === 'beigeTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'beigeTab',
            });
          }}>
          <Settings />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}


