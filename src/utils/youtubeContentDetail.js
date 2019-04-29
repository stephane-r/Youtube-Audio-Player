// @flow
import config from 'react-native-config';

const { YOUTUBE_API_KEY } = config;

const baseURL: string = 'https://www.googleapis.com/youtube/v3/videos';

const getYoutubeContentDetail = async (id: string): Object => {
  try {
    const request = await fetch(
      `${baseURL}?part=contentDetails&id=${id}&key=${YOUTUBE_API_KEY}`
    );
    const response = await request.json();

    return response.items[0].contentDetails;
  } catch (error) {
    return error;
  }
};

export default getYoutubeContentDetail;
