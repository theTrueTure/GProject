import { createApi } from 'unsplash-js';

type State = {
  searchHistory: string[],
  currentSearch: string
}

let state: State = {
  searchHistory: [],
  currentSearch: 'cat'
}

const unsplash = createApi({
  accessKey: '5vcBJ_NanyB5xxCKoPCfkrIURjCnfB9TQY2vKGeABXA',
});

const htmlSearch = document.getElementById('searchButton') as HTMLButtonElement;
htmlSearch.addEventListener('click', () => {
  const searchInput = document.getElementById('searchText') as HTMLInputElement;
  const textValue = searchInput.value;
  const clientSearch = document.getElementById('demo') as HTMLParagraphElement;
  clientSearch.innerHTML = textValue;
  state.searchHistory.push(textValue);
  update({ searchHistory: state.searchHistory, currentSearch: textValue })
  console.log(state.searchHistory)
  // state.searchHistory.push(textValue);
});

const fetchingPhotos = () => {
  unsplash.search
    .getPhotos({ query: state.currentSearch, orientation: 'landscape', perPage: 9})
    .then(result => {
      console.log(result);
      document.querySelector<HTMLDivElement>('#app')!.innerHTML='';
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
const update = (newState : State) => {
  state = { ...state, ...newState }; // patch state, overwrite old data with new properties 
  window.dispatchEvent(new Event('statechange'));
  };

window.addEventListener('statechange', () => {
  fetchingPhotos();
})

