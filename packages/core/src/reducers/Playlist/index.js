const playlistState = {};

const playlistActions = {
  createNewPlaylist: async (state, actions, newPlaylist) => {
    const { playlist } = state.user;
    const playlistUpdated = {
      playlist: playlist ? [...playlist, newPlaylist] : [newPlaylist]
    };
    const user = {
      ...state.user,
      ...playlistUpdated
    };

    await actions.updateUser(playlistUpdated);

    return {
      ...state,
      user
    };
  },
  removePlaylist: async (state, actions, playlistId) => {
    const { playlist } = state.user;
    const playlistUpdated = {
      playlist: playlist.filter(item => item.id !== playlistId)
    };
    const user = {
      ...state.user,
      ...playlistUpdated
    };

    await actions.updateUser(playlistUpdated);

    return {
      ...state,
      user
    };
  },
  updatePlaylist: async (state, actions, playlist) => {
    const currentPlaylist = state.user.playlist;
    const playlistUpdated = {
      playlist: currentPlaylist.map(item => {
        if (item.id === playlist.id) {
          return {
            ...item,
            ...playlist
          };
        }

        return item;
      })
    };
    const user = {
      ...state.user,
      ...playlistUpdated
    };

    await actions.updateUser(playlistUpdated);

    return {
      ...state,
      user
    };
  }
};

export { playlistState, playlistActions };
