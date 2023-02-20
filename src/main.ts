import { createApi } from 'unsplash-js';
import * as nodeFetch from 'node-fetch';

const polyfillLibrary = require('polyfill-library');

const polyfillBundle = polyfillLibrary.getPolyfillString({
  uaString: 'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
  minify: true,
  features: {
    es6: { flags: ['gated'] },
  },
}).then(bundleString => {
  console.log(bundleString);
});

const unsplash = createApi({
  accessKey: '5vcBJ_NanyB5xxCKoPCfkrIURjCnfB9TQY2vKGeABXA',
  fetch: nodeFetch.default as unknown as typeof fetch,
});

unsplash.users.getPhotos({ username: 'foo' }).then(result => {
  if (result.errors) {
    console.log('error occurred: ', result.errors[0]);
  } else {
    const feed = result.response;

    const { total, results } = feed;

    console.log(`received ${results.length} photos out of ${total}`);
    console.log('first photo: ', results[0]);
  }
});

// import * as Unsplash from 'unsplash-js';

// const unsplashImages = new Unsplash({
//   applicationId: '{5vcBJ_NanyB5xxCKoPCfkrIURjCnfB9TQY2vKGeABXA}',
//   secret: '{zU28LnpimqAgTDRPP4W6r2TU4b0Zh9XKN2fN7Kc5Qgo}',
// });
// unsplashImages.search.photos('cats', 1)
//   .then((res: any) => res.json())
//   .then((json: any) => {
//     const imgUrl = json.results.urls.regular;
//     console.log(imgUrl, 'HEREEE', json);
//     document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<img href=${imgUrl}>`;
//   });

// // export default main;
