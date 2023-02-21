// const accessKey = '5vcBJ_NanyB5xxCKoPCfkrIURjCnfB9TQY2vKGeABXA';

const url = 'https://api.unsplash.com/photos/ ';

export const fetchingPhotos = async () => {
  const result = await fetch(url);
  return result;
};

export default {};
