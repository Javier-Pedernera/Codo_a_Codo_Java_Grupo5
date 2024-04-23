const apiKey = window.env.apiKey;

console.log(apiKey);
document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput !== '') {
      searchBooks(searchInput);
    }
  });
  
  function searchBooks(searchQuery) {
    const apiKey = window.env.apiKey;
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
                <h5 class="card-title">${bookInfo.title}</h5>
                <h6 class="card-title">${bookInfo.subtitle || ''}</h6>
                <p class="card-text">${bookInfo.authors?.[0] || 'Autor desconocido'}</p>
                <button class="btn btn-primary addToFavorites">Agregar a Favoritos</button>
                <button class="btn btn-primary showDescription" data-target="${cardId}">Ver Descripción</button>
              </div>
            </div>
          `;
    
          const addToFavoritesBtn = card.querySelector('.addToFavorites');
          addToFavoritesBtn.addEventListener('click', () => addToFavorites(book));
    
          booksContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching books:', error));
  }