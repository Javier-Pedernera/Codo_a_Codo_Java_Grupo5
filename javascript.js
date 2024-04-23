const apiKey = window.env.apiKey;

console.log(apiKey);
fetch(`https://www.googleapis.com/books/v1/volumes?q=war&filter=free-ebooks&maxResults=3&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const booksContainer = document.getElementById('booksContainer');

    // Convertir el objeto en un array utilizando Object.values()
    const booksArray = Object.values(data);

    // Iterar sobre los libros en el array
    booksArray.forEach(book => {
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-4');
      card.innerHTML = `
        <div class="card">
          <img src="${book.cover}" class="card-img-top" alt="${book.title}">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">${book.description}</p>
            <button class="btn btn-primary addToFavorites">Agregar a Favoritos</button>
          </div>
        </div>
      `;
      const addToFavoritesBtn = card.querySelector('.addToFavorites');
      addToFavoritesBtn.addEventListener('click', () => addToFavorites(book));

      booksContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching books:', error));

// Función para agregar un libro a la lista de favoritos
function addToFavorites(book) {
  console.log('Agregado a favoritos:', book);
}