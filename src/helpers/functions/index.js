export const updateState = (state, updatedState) => {
  return {
    ...state,
    ...updatedState
  }
}

export const handleAuthentatication = (match, location) => {
  if (match.isExact && location.hash.includes('access_token')) {
    const position = location
      .hash
      .split('=');
    if (Array.isArray(position) && position[1]) {
      const limit = position[1].indexOf('&');
      const token = position[1].substr(0, limit);
      if (location.hash.includes(token)) {
        localStorage.setItem('secure_token', token);
        return true;
      }
    }
  }
}

export const hasToken = (props) => {
  if (!localStorage.getItem('secure_token')) {
    props.history.push("/");
  };
  return true;
}

export const redirectIfNotLogged = () => {
  if(!localStorage.getItem('secure_token')){
    window.location.href = 'https://accounts.spotify.com/authorize?client_id=ccd748cf8756402593750b57a56d69df&response_type=token&redirect_uri=https://spotify-project-1c9d7.firebaseapp.com'
  }
}

export const removeTokenAndRedirect = () => {
  localStorage.removeItem('secure_token')
  window.location.href = 'https://accounts.spotify.com/authorize?client_id=ccd748cf8756402593750b57a56d69df&response_type=token&redirect_uri=https://spotify-project-1c9d7.firebaseapp.com'
}