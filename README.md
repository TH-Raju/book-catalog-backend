## LIVE LINK: https://book-catalog-assignment-8-jeu7z0zag-th-raju.vercel.app

### USER

- /api/v1/auth/signup (POST)
- /api/v1/auth/signin (POST)
- /api/v1/users (GET)
- /api/v1/users/7ce83cf6-e11a-4d67-bebb-f902ad294b03 (GET)
- /api/v1/users/b4398351-62b5-49ad-a3b2-32209c0026e0 (PATCH)
- /api/v1/users/bbccc832-c5c0-4c3a-8dfb-cd2deb0b7daf (DELETE)
- /api/v1/profile (Get)

### CATEGORY

- /api/v1/categories/create-category (POST)
- /api/v1/categories (GET)
- /api/v1/categories/7d3d333b-4656-43c6-a894-f8c650b82d09 (GET)
- /api/v1/categories/cd7474ab-460c-4366-8584-69d8165a7c85 (PATCH)
- /api/v1/categories/9bd449d0-b4b0-45be-9076-2ac158274c7b (DELETE)

### BOOK

- /api/v1/books/create-book (POST)
- /api/v1/books (GET)
- /api/v1/books/f252a2ec-d8fe-4b7d-99df-24fca11f87ba/category (GET)
- /api/v1/books/ca70a1fa-765b-430b-b6b9-975134f5b3e0 (PATCH)
- /api/v1/books/eb572e95-84a9-48c5-80e0-34ee9d4eeff6 (DELETE)
- /api/v1/books/b94e64d6-66c3-428e-b087-58b104b92128 (GET Single Book)

       * Query and Search

        - /api/v1/books?limit=2&page=1 (GET)
        - /api/v1/books?sortBy=price&sortOrder=asc (GET)
        - /api/v1/books?minPrice=400 (GET)
        - /api/v1/books?maxPrice=400 (GET)
        - /api/v1/books?category=f252a2ec-d8fe-4b7d-99df-24fca11f87ba (GET)
        - /api/v1/books?search=Programming (GET)
        - /api/v1/books/98adf93e-d59c-41b6-bcf2-34a7809d3db6/category?limit=1 (GET)

### ORDER

- /api/v1/orders/create-order (POST)
- /api/v1/orders (GET specific customer)
- /api/v1/orders/d3ca4345-0e7e-43f1-b692-c105c08b4ab3 (GET single order)

- /api/v1/orders/all-order (GET Only Admin)
- /api/v1/profile (Get)

        * For Order

        "bookId": "0f21509b-4bbd-4038-aa78-39c37f039d01",
        "bookId": "0f21509b-4bbd-4038-aa78-39c37f039d01",
