import network from '../network';

const getRamdomUser = async () => {
  try {
    const response = await network.get(
      'https://random-data-api.com/api/users/random_user?size=10',
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const user = {
  getRamdomUser,
};

export default user;
