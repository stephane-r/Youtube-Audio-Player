import React from 'react';
import { View, Text, Button } from 'react-native';
import { actions } from '../../store';
import PlaylistContainer from '../../containers/Playlist';
import Input from '../../components/Forms/Input';
import Layout from '../../components/Layout';
import Spacer from '../../components/Spacer';
import Title from '../../components/Title';

const uuidv4 = require('uuid/v4');

class PlaylistScreen extends React.Component {
  static path = 'playlist';

  static navigationOptions = () => ({
    title: 'Playlist',
    linkName: 'Playlist'
  });

  state = {
    toggleModal: false,
    playlist: {
      id: null,
      createAt: new Date(),
      updatedAt: null,
      name: ''
    }
  };

  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createNewPlaylist = this.createNewPlaylist.bind(this);
    this.loadPlaylist = this.loadPlaylist.bind(this);
    this.updatePlaylist = this.updatePlaylist.bind(this);
    this.submit = this.submit.bind(this);
  }

  async toggleModal(playlist) {
    if (playlist.id) {
      await this.loadPlaylist(playlist);
    }

    await this.setState({
      toggleModal: !this.state.toggleModal
    });
  }

  async handleChange(name) {
    const playlist = { ...this.state.playlist, name };

    await this.setState({
      playlist
    });
  }

  async createNewPlaylist() {
    const playlist = { ...this.state.playlist, id: uuidv4(), sources: [] };

    await actions.createNewPlaylist(playlist);

    this.setState({
      playlist: {}
    });
  }

  async loadPlaylist(playlist) {
    await this.setState({
      playlist
    });
  }

  async updatePlaylist() {
    const playlist = {
      ...this.state.playlist,
      updatedAt: new Date()
    };

    await actions.updatePlaylist(playlist);

    this.setState({
      playlist: {}
    });
  }

  submit() {
    if (this.state.playlist.id === null) {
      return this.createNewPlaylist();
    }

    return this.updatePlaylist();
  }

  render() {
    const { toggleModal } = this.state;

    return (
      <Layout navigate={this.props.navigation}>
        <Spacer height={20} />
        <Title
          level="2"
          title="Playlist" />
        <Spacer height={20} />
        <Button
          title="Create playlist"
          onPress={this.toggleModal} />
        <PlaylistContainer
          toggleModal={playlist => this.toggleModal(playlist)}
        />
        {toggleModal && (
          <View>
            <Text>Playlist name</Text>
            <Input
              onChangeText={this.handleChange}
              placeholder="Playlist name"
              value={this.state.playlist.name}
            />
            <Button
              title="Create/update"
              onPress={this.submit} />
            <Button
              title="Cancel"
              onPress={this.toggleModal} />
          </View>
        )}
      </Layout>
    );
  }
}

export default PlaylistScreen;
