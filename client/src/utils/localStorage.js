// export const getSavedMovieIds = () => {
//     const savedMovieIds = localStorage.getItem('saved_movies')
//       ? JSON.parse(localStorage.getItem('saved_movies'))
//       : [];
  
//     return savedMovieIds;
//   };
  
//   export const saveMovieIds = (movieIdArr) => {
//     if (movieIdArr.length) {
//       localStorage.setItem('saved_movies', JSON.stringify(movieIdArr));
//     } else {
//       localStorage.removeItem('saved_movies');
//     }
//   };
  
//   export const removeMoiveId = (movieId) => {
//     const savedMovieIds = localStorage.getItem('saved_movies')
//       ? JSON.parse(localStorage.getItem('saved_movies'))
//       : null;
  
//     if (!savedMovieIds) {
//       return false;
//     }
  
//     const updatedSavedMovieIds = savedMovieIds?.filter((savedMoiveId) => savedMovieId !== movieId);
//     localStorage.setItem('saved_moives', JSON.stringify(updatedSavedMovieIds));
  
//     return true;
//   };