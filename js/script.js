// Sample Book Data
const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "fiction",
    price: 14.99,
    cover: "https://source.unsplash.com/random/300x400/?book,fiction",
    bestseller: true,
    newArrival: true
  },
  {
    id: 2,
    title: "Educated",
    author: "Tara Westover",
    genre: "non-fiction",
    price: 13.99,
    cover: "https://source.unsplash.com/random/300x400/?memoir",
    bestseller: true,
    newArrival: false
  },
  {
    id: 3,
    title: "The Hound of the Baskervilles",
    author: "Arthur Conan Doyle",
    genre: "mystery",
    price: 11.99,
    cover: "https://source.unsplash.com/random/300x400/?mystery",
    bestseller: true,
    newArrival: true,
    staffPick: true  // This book is the staff pick
  },
  {
    id: 4,
    title: "The Love Hypothesis",
    author: "Ali Hazelwood",
    genre: "romance",
    price: 12.99,
    cover: "https://source.unsplash.com/random/300x400/?romance",
    bestseller: true,
    newArrival: false
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    genre: "sci-fi",
    price: 15.99,
    cover: "https://source.unsplash.com/random/300x400/?scifi",
    bestseller: true,
    newArrival: true
  },
  {
    id: 6,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "non-fiction",
    price: 16.99,
    cover: "https://source.unsplash.com/random/300x400/?history",
    bestseller: true,
    newArrival: false
  },
  {
    id: 7,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "mystery",
    price: 12.99,
    cover: "https://source.unsplash.com/random/300x400/?thriller",
    bestseller: true,
    newArrival: false
  },
  {
    id: 8,
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "sci-fi",
    price: 14.99,
    cover: "https://source.unsplash.com/random/300x400/?space",
    bestseller: true,
    newArrival: true
  }
];

// DOM Elements
const bookList = document.getElementById('bookList');
const bestsellerList = document.getElementById('bestsellerList');
const newArrivals = document.getElementById('newArrivals');
const searchInput = document.getElementById('searchInput');
const darkModeToggle = document.getElementById('darkModeToggle');
const staffPickTitle = document.getElementById('staffPickTitle');
const staffPickAuthor = document.getElementById('staffPickAuthor');
const staffPickCover = document.getElementById('staffPickCover');

// Display Books
function displayBooks(booksToDisplay, container) {
  container.innerHTML = '';
  booksToDisplay.forEach(book => {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-lg-3 mb-4';
    col.innerHTML = `
      <div class="card h-100 position-relative">
        ${book.bestseller ? '<span class="badge bg-danger badge-bestseller">Bestseller</span>' : ''}
        <img src="${book.cover}" class="card-img-top" alt="${book.title}">
        <div class="card-body d-flex flex-column">
          <h6 class="card-title">${book.title}</h6>
          <p class="card-text text-muted small">by ${book.author}</p>
          <p class="text-primary fw-bold mt-auto">$${book.price}</p>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

// Set Staff Pick
function setStaffPick() {
  const staffPick = books.find(b => b.staffPick);
  if (staffPick) {
    staffPickTitle.textContent = staffPick.title;
    staffPickAuthor.textContent = `by ${staffPick.author}`;
    staffPickCover.src = staffPick.cover;
  }
}
setStaffPick();

// Initial Load
displayBooks(books, bookList);
displayBooks(books.filter(b => b.bestseller), bestsellerList);
displayBooks(books.filter(b => b.newArrival), newArrivals);

// Filter by Genre
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', e => {
    const filter = e.target.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    if (filter === 'all') {
      displayBooks(books, bookList);
    } else {
      const filtered = books.filter(book => book.genre === filter);
      displayBooks(filtered, bookList);
    }
  });
});

// Search Functionality
searchInput.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(term) ||
    book.author.toLowerCase().includes(term)
  );
  displayBooks(filtered, bookList);
});

// Global Filter Function
window.filterBooks = function(genre) {
  const filtered = books.filter(book => book.genre === genre);
  displayBooks(filtered, bookList);
  document.querySelector('.btn-group .active')?.classList.remove('active');
};

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
  const body = document.body;
  const isDark = body.classList.toggle('dark-mode');

  body.className = isDark ? 'dark-mode' : 'light-mode';

  // Update icon
  const icon = darkModeToggle.querySelector('i');
  if (isDark) {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
});
