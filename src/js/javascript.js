const apiKey = window.env.apiKey;

console.log(apiKey);

document.getElementById('searchButton').addEventListener('click', () => {
  const searchInput = document.getElementById('searchInput').value.trim();
  if (searchInput !== '') {
    searchBooks(searchInput);
  }
});



function searchBooks(searchQuery) {





  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=6&key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const booksContainer = document.getElementById('booksContainer');
      booksContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos libros

      data.items.forEach((book, index) => {
        const bookInfo = book.volumeInfo;
        const cardId = book.id;
        const card = document.createElement('div');
        card.id = cardId;
        card.classList.add('col-md-4', 'mb-4');
        card.innerHTML = `
          <div class="card">
          
            <img src="${bookInfo.imageLinks?.smallThumbnail || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${bookInfo.title}">
           
            <div class="card-body">

              <div class="titleStar"> 
              <h5 class="card-title">${bookInfo.title}</h5>
              <button class="btn btn-primary addToFavorites">
                 <i class="far fa-star"></i>
            </button>
            </div>
            

            <p class="card-text">${bookInfo.authors?.[0] || 'Autor desconocido'}</p>
            <h6 class="card-date">${bookInfo.publishedDate || ''}</h6>
              <button class="btn btn-primary showDescription" data-target="${cardId}">
              <a href="./src/models/descripcion.html?id=${cardId}" class="btn btn-primary">Ver Descripción</a>
              </button>
            </div>
          </div>
        `;

        const addToFavoritesBtn = card.querySelector('.addToFavorites');
        addToFavoritesBtn.addEventListener('click', () => addToFavorites(book, addToFavoritesBtn));
        booksContainer.appendChild(card);
      });
    })
    .catch(error => console.error('Error fetching books:', error));
}

function addToFavorites(book, button) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const isBookInFavorites = favorites.some(favorite => favorite.id === book.id);

  if (!isBookInFavorites) {
    favorites.push({
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || [],
      description: book.volumeInfo.description || '',
      thumbnail: book.volumeInfo.imageLinks?.smallThumbnail || 'https://via.placeholder.com/150'
    });
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Libro agregado a favoritos:', book.volumeInfo.title);
    // Cambiar la estrella a llena
    button.innerHTML = '';
    button.appendChild(filledStarIcon.cloneNode(true));
  } else {
    console.log('El libro ya está en la lista de favoritos.');
  }
}