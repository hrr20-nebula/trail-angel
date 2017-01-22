'use strict';

import React from 'react';
import {  View,
          Text,
          StyleSheet,
          Image,
          TouchableHighlight,
          ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import WeatherIcon from '../weather/weather-icon.component';
import WeatherForecast from '../weather/weather-forecast.component';
import Details from '../trail/trailDetail.component';
import Dashboard from './favoriteMapDashboard.component';
import colors from '../colors';

import dataApi from '../../api';

export default class FavoriteListItem extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      vicinity: '',
      distance: null,
      weather: null
    };
  }

  componentDidMount() {
    this._isMounted = true;

    if (this.props.userLocation.coords.latitude === undefined ||
      this.props.geometry.location === undefined) {

      return;
    }

    dataApi.google.getDistance2Points(this.props.userLocation.coords,
                                      {
                                        latitude: this.props.geometry.location.lat,
                                        longitude: this.props.geometry.location.lng
                                      })
      .then((distance) => {
        if (this._isMounted && distance) {
          this.setState({
            distance: distance.text
          });
        }
      })
      .catch((err) => {
        console.error('Error getting distance for component: ', err);
      });

    dataApi.weather(this.props.geometry.location.lat, this.props.geometry.location.lng)
      .then((weather) => {
        if (this._isMounted && weather) {
          this.setState({
            weather
          });
        }
      })
      .catch((err) => {
        console.error('Error getting weather for component: ', err);
      });

    if (this.props.vicinity !== undefined) {
      this.setState({
        vicinity: this.props.vicinity.replace(/, /g, '\n')
      });
    }  
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _handleRemoveFavorite() {
    this.props.removeFavorite(this.props.id);
  }

  _selectTrail() {
    this.props.navigator.push({
      title: 'Trail Detail',
      component: Details,
      passProps: {
        ...this.props
      }
    });
  }

  _handlePressWeather() {
    this.props.navigator.push({
      title: 'Daily Forecast',
      component: WeatherForecast,
      passProps: {
        ...this.state.weather,
        forecast: this.state.weather,
        navigator: this.props.navigator,
      }
    })
  }

  _handleGoToMapDashboard() {
    this.props.navigator.push({
      title: 'Dashboard',
      component: Dashboard,
      passProps: {
        ...this.props
      }
    });
  }

  render() {
    let view;
    if (this.props.geometry === undefined) {
      view = <View />
    } else {
      view =
      <View>
        <TouchableHighlight onPress={this._selectTrail.bind(this)} underlayColor='white'>
          <View>
            <View style={styles.rowContainer}>
              <View>
                <View style={styles.leftColumn}>
                  <Image source={{uri: this.props.photoThumbnailUrl}} style={styles.photo} />
                  <TouchableHighlight onPress={this._handleRemoveFavorite.bind(this)}
                                      style={styles.removeButton}
                                      underlayColor='white'>
                    <Icon name='minus-circle' size={20} color={colors.warning} />
                  </TouchableHighlight>
                </View>
              </View>
              <View style={styles.middleColumn}>
                <Text style={styles.title}>{this.props.name}</Text>
                <Text style={styles.location}>{this.state.vicinity}</Text>
                {this.props.rating === undefined? <View /> :
                  <Text style={styles.rating}>Rating: {this.props.rating} </Text>
                }
                  <TouchableHighlight onPress={this._handleGoToMapDashboard.bind(this)}
                      style={styles.mapButton}
                      underlayColor='white'>
                    <Icon name='map' size={20} color={colors.mapColor} />
                  </TouchableHighlight>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.distance}>
                  {this.state.distance ? this.state.distance : ''}
                </Text>
                <View>{this.state.weather ? 
                  <View>
                    <TouchableHighlight onPress={this._handlePressWeather.bind(this)} underlayColor='white' >
                      <View>
                        <WeatherIcon icon={this.state.weather.currently.icon}
                                     color={colors.weatherIconColor}
                                     size={30}
                                     style={{
                                       opacity: 0.8
                                     }}
                        />
                        <Text style={styles.weather}>
                        {this.state.weather ?
                          `${Math.round(Number(this.state.weather.currently.temperature))}°F` :
                          ''
                        }
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                    :
                    <ActivityIndicator  size='small' color={colors.seafoam} style={{ opacity: 0.8 }} />
                  }
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    }
    return (
      <View>
        {view}
      </View>
    );

  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    padding: 20,
    width: 90,
    height: 90,
    alignItems: 'center',
  },
  middleColumn: {
    padding: 20,
    width: 190,
    height: 180,
  },
  rightColumn: {
    padding: 20,
    width: 100,
    height: 150,
    alignItems: 'center',
  },
  removeButton: {
    paddingTop: 15,
    width: 20,
    height: 20,
  },
  mapButton: {
    paddingTop: 10,
    paddingBottom: 5,
    height: 20,
    width: 20,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.darkgray,
    width: 200,
  },
  photo: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  location: {
    color: colors.darktan
  },
  rating: {
    color: colors.peagreen,
    paddingTop: 10,
    width: 100,
  },
  description: {
    lineHeight: 20,
    fontSize: 14,
    color: colors.darktan,
    textAlign: 'left',
    marginTop: 8,
  },
  favorite: {
    marginTop: 20,
    width: 20,
    height: 20,
  },
  distance: {
    paddingTop:2,
    paddingBottom: 15
  },
  weather: {
    textAlign: 'center',
    color: colors.darkgray,
  }
});