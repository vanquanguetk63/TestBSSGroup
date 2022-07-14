import {useEffect, useState} from 'react';

import user from '../network/user/user';

export default () => {
  const [randomUser, setRandomUser] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await user.getRamdomUser();
      if (response) {
        setRandomUser(response);
      }
    })();
  }, []);

  const getAnotherRandomUser = async () => {
    const response = await user.getRamdomUser();
    if (response) {
      setRandomUser(response);
    }
  };

  return {
    randomUser,
    getAnotherRandomUser,
  };
};
