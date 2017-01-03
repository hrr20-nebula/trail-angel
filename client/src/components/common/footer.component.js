'use strict';


import React, { Component } from 'react';
import  {StyleSheet,TabBarIOS,Text,View,} from 'react-native' ;
import TrailList from '../trail/trailList.component';
import SearchBar from '../trail/trailSearch.component';

// let base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
let base64Icon = 'data:image/png;base64,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';
let base64IconSearch = 'data:image/png;base64,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';
let base64IconFav = 'data:image/png;base64,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';
let base64IconMore = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAXlJREFUeJzt3DFuE2EQhuGZn8ZGApLdnpYoEqLELRyKMyDOgMQRQNSQlhwh4QxeIcBpZynAaSio7F9kn+cEXzWa6o0AAAAAAAAAAAAA7oKMiBjH8ayqXs8RL1trD3qP4nCq6qZlXmTmq2marnIcx7M54jIiHvUex1F9z4jNvdVq9TYzn/Vew9Gt5qrHeXJ6+sPZX6aq2rXeI+irZcTn3iPoIyM+5TiOT/48gSe9B3FU31rmpk3TdN0yn88R76vqZ+9VHFZV7eaqDy1zs91uv/beAwAAAAAAAAAAAAAAAAAAAPxbRkQMw3AeEW9qnl+01u533sQB/dUJHIbhvDK/tIiHvcdxVL87gev1+l1mPu29hqO77QTeOPvLtO8Ezr2H0E9rmRe9R9DHvhMoFr1Mt53Aq4zYzFUfq2rXexWHpRMIAAAAAAAAAAAAAAAAAAAA/x+dwIXRCWRPJ3DhdAKXTicQncAl0wlcNp3AJdIJBAAAAAAAAAAAgLvpF4FGoSnUGIjmAAAAAElFTkSuQmCC';

export default class TabBarExample extends Component {
  static title = '<TabBarIOS>';
  static description = 'Tab-based navigation.';
  static displayName = 'TabBarExample';

  state = {
    selectedTab: 'redTab',
  };

  _renderContent = (color: 'string', pageText: 'string' ) => {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>Renders {pageText} Page</Text>
      </View>
    );
  };

  render() {
    const { trails, actions } = this.props;
    debugger;
    return (
      <TabBarIOS
        unselectedTintColor="yellow"
        tintColor="white"
        barTintColor="darkgreen">
        <TabBarIOS.Item
          title ="Home"
          icon={{uri: base64Icon, scale: 5}}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
            });
          }}>
          <TrailList trails={trails}
                     actions={this.props.actions} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="search"
          selected={this.state.selectedTab === 'blackTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blackTab',
            });
          }}>
           {this._renderContent('#333333', 'Search')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
        systemIcon ="favorites"
          selected={this.state.selectedTab === 'greyTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greyTab',
            });
          }}>
          {this._renderContent('#333333', 'Favorites')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon ="more"
          selected={this.state.selectedTab === 'beigeTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'beigeTab',
            });
          }}>
          {this._renderContent('#d7c797', 'Settings/More')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

let styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

