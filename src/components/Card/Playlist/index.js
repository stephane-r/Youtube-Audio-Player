// @flow
import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Card from '../Layout';
import { actions } from '../../../store';
import Spacer from '../../Spacer';
import { CarouselPlayIcon } from '../../Carousel';
import Source from '../../Source';
import DialogRemovePlaylist from '../../Dialog/RemovePlaylist';
import MenuPlaylist from '../../Menu/Playlist';
import {
  REMOVE_PLAYLIST,
  REMOVE_SOURCE_TO_PLAYLIST
} from '../../../graphql/mutation/playlist';
import GET_USER from '../../../graphql/query/user';

type CardPlaylistProps = {
  client?: Object,
  totalSongs: number,
  playlist: Object,
  toggleModal: Function,
  card: Object,
  userId: number
};

const CardPlaylist = ({
  client,
  totalSongs,
  playlist,
  toggleModal,
  ...props
}) => {
  const [dialogIsOpen, setToggleDialog] = useState(false);
  const [showItems, setToggleItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDialog = () => setToggleDialog(!dialogIsOpen);
  const toggleItems = () => setToggleItems(!showItems);

  const refetchQueries = [
    {
      query: GET_USER,
      variables: {
        userId: props.userId
      }
    }
  ];

  const removePlaylist = async () => {
    setIsLoading(true);
    client.mutate({
      mutation: REMOVE_PLAYLIST,
      variables: { ...playlist, deleted: true },
      refetchQueries
    });
    actions.setFlashMessage(`${playlist.name} has been removed.`);
    setIsLoading(false);
  };

  const removeSource = sourceId => {
    const { sources } = playlist;
    const sourcesUpdated = sources.filter(s => s.id !== sourceId);

    client.mutate({
      mutation: REMOVE_SOURCE_TO_PLAYLIST,
      variables: {
        id: playlist.id,
        sources: sourcesUpdated
      },
      refetchQueries
    });

    return actions.setFlashMessage(`${sourceId} has been removed.`);
  };

  return (
    <>
      <Card
        {...props}
        items={playlist.sources}
        itemsRenderer={
          <Source
            items={playlist.sources}
            onRemove={removeSource}
            playlistId={playlist.id}
          />
        }
        showItems={showItems}
        playlistId={playlist.id}
        onPress={playlist.sources.length === 0 ? null : toggleItems}
        rightContent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: -30
            }}>
            <CarouselPlayIcon
              onPress={() => actions.playPlaylist(playlist.id)}
            />
            <MenuPlaylist
              onEdit={() => toggleModal(playlist)}
              onRemove={toggleDialog}
            />
          </View>
        }>
        <Text>{totalSongs} songs</Text>
      </Card>
      <Spacer height={10} />
      {/* TODO: Maybe remove this Dialog and import to screen parent ? */}
      <DialogRemovePlaylist
        visible={dialogIsOpen}
        toggleDialog={toggleDialog}
        onPress={removePlaylist}
        playlistName={playlist.name}
        loading={isLoading}
      />
    </>
  );
};

export default withApollo<CardPlaylistProps>(CardPlaylist);
