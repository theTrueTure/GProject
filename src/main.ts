import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: '5vcBJ_NanyB5xxCKoPCfkrIURjCnfB9TQY2vKGeABXA',
});

const userInput = (cb: Function) => {
  const htmlSearch = document.getElementById('searchButton') as HTMLButtonElement;
  htmlSearch.addEventListener('click', () => {
    const searchInput = document.getElementById('searchText') as HTMLInputElement;
    const textValue = searchInput.value;
    const clientSearch = document.getElementById('demo') as HTMLParagraphElement;
    clientSearch.innerHTML = textValue;
    cb(textValue);
  });
};

const fetchingPhotos = (userSearch: string) => {
  unsplash.search
    .getPhotos({ query: userSearch, orientation: 'landscape' })
    .then(result => {
      console.log(result);
      result.response?.results.map(item => {
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', item.urls.small);
        document.querySelector<HTMLDivElement>('#app')!.append(imgElement);
        return item;
      });
    })
    .catch(() => {
      console.log('something went wrong!');
    });
};

userInput(fetchingPhotos);
