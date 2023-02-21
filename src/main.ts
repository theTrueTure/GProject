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
  state.searchHistory.push(textValue);
  update({ searchHistory: state.searchHistory, currentSearch: textValue })
  console.log(state.searchHistory)
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
        imgElement.setAttribute('alt', item.alt_description || "no information for this image")
        document.querySelector<HTMLDivElement>('#app')!.append(imgElement);
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

const searchSuggestion = () => {
  const suggestionsElement = document.getElementById('searchText')
  suggestionsElement?.addEventListener('focus', () => {
    const ulElement = document.getElementById('suggestionList') as HTMLUListElement
    ulElement.innerHTML = ''
    state.searchHistory.map(item => {
      const liElement = document.createElement('li')
      liElement.innerHTML = item;
      ulElement.append(liElement);
    })
  })
}
searchSuggestion();
