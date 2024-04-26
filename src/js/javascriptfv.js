document.addEventListener('DOMContentLoaded', loadFavoriteBooks);

function loadFavoriteBooks() {
    const apiKey = window.env.apiKey;

    const apiUrl = `https://www.googleapis.com/books/v1/users/112151905261123439023/bookshelves/0/volumes?key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const booksContainer = document.getElementById('booksContainer');
            booksContainer.innerHTML = ''; 

            data.items.forEach((book, index) => {
                const bookInfo = book.volumeInfo;
                const cardId = book.id;
                const card = document.createElement('div');
                card.id = cardId;
                card.classList.add('col-md-4'); 
                card.innerHTML = `
                    <div class="card">
                        <img src="${bookInfo.imageLinks?.smallThumbnail || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${bookInfo.title}">
                        <div class="card-body">
                            <h5 class="card-title">${bookInfo.title}</h5>
                            <h6 class="card-title">${bookInfo.subtitle || ''}</h6>
                            <p class="card-text">${bookInfo.authors?.[0] || 'Autor desconocido'}</p>
                            <p class="description"></p> <!-- Aquí se mostrará la descripción -->
                            <button class="btn btn-primary showDescription" data-target="${cardId}">Mostrar Descripción</button>
                        </div>
                    </div>
                `;

                const descriptionButton = card.querySelector('.showDescription');
                const descriptionElement = card.querySelector('.description');
                let descriptionVisible = false; 

                descriptionButton.addEventListener('click', () => {
                    if (descriptionVisible) {
                        descriptionElement.textContent = ''; 
                        descriptionButton.textContent = 'Mostrar Descripción';
                    } else {
                        descriptionElement.textContent = bookInfo.description || 'Descripción no disponible'; 
                        descriptionButton.textContent = 'Ocultar Descripción';
                    }
                    descriptionVisible = !descriptionVisible; 
                });

                booksContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching books:', error));
}

