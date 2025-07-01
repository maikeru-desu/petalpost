# PetalPost - Modern Flower Shop E-Commerce

PetalPost is a full-stack e-commerce platform for a modern flower shop, built with Laravel and React. It features a responsive design, secure authentication, product catalog management, and a smooth shopping experience with a unique floral-themed UI.

![PetalPost Banner](https://via.placeholder.com/800x400?text=PetalPost+Banner)

## Features

- 🌸 Beautiful, responsive UI built with React and Tailwind CSS with custom floral theming
- 🔐 Secure authentication with Laravel Sanctum
- 🛒 Product browsing and shopping cart functionality
- 💳 Checkout and payment processing
- 👤 User account management
- 📱 Fully responsive design for mobile and desktop
- 🔍 Product search and filtering capabilities
- 📄 Pagination with a reusable component across product listings, favorites, and orders
- 💀 Skeleton loading for better UX during data fetching
- 🌟 Clean, maintainable codebase architecture

## Tech Stack

### Backend
- **Laravel** - PHP framework for robust backend development
- **MySQL** - Database
- **Laravel Sanctum** - API authentication
- **Action Pattern** - Clean architecture for business logic organization

### Frontend
- **React** - JavaScript library for building user interfaces
- **React Router v6** - Routing for React applications
- **React Query** - Complete data fetching and state management solution
- **Tailwind CSS** - Utility-first CSS framework with custom floral theming
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Toast notifications

## Installation

### Prerequisites
- PHP >= 8.1
- Node.js >= 16.0
- Composer
- MySQL

### Backend Setup
1. Clone the repository:
```bash
git clone https://github.com/yourusername/petalpost.git
cd petalpost
```

2. Install PHP dependencies:
```bash
cd backend
composer install
```

3. Set up environment variables:
```bash
cp .env.example .env
php artisan key:generate
```

4. Configure the database in the `.env` file:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=petalpost
DB_USERNAME=root
DB_PASSWORD=
```

5. Run migrations and seeders:
```bash
php artisan migrate --seed
```

6. Start the Laravel development server:
```bash
php artisan serve
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Configure the API URL in `.env`:
```
VITE_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

5. Access the application at: `http://localhost:5173`

## Project Structure

### Backend
- `app/Actions` - Business logic using the Action pattern
- `app/Http/Controllers` - API controllers
- `app/Http/Requests` - Form validation
- `app/Models` - Database models
- `routes/api.php` - API routes

### Frontend
- `src/components` - React components
- `src/components/layout` - Layout components (Header, Footer, etc.)
- `src/components/common` - Reusable UI components like Pagination
- `src/components/guards` - Authentication protection components
- `src/hooks` - Custom React hooks for data fetching and state management
- `src/api` - API service modules organized as object-based services

## Development

### Backend API Endpoints

#### Authentication
- `POST /login` - Authenticate user
- `POST /logout` - Logout user
- `GET /api/user` - Get authenticated user

#### Products
- `GET /api/products` - List products
- `GET /api/products/{id}` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Delete product (admin)

## Database Schema

PetalPost uses a relational database design to manage products, users, orders, and related entities.

### Database Diagram

View the complete database schema diagram here: [PetalPost Database Schema](https://dbdiagram.io/d/petalpost-684f7f603cc77757c8fa6d39)

### Core Tables

- **users** - Customer accounts with authentication information
  - Contains: id, first_name, last_name, email, password, etc.
  
- **products** - Product catalog with details
  - Contains: id, type_id, name, mini_description, description, price, image
  
- **product_types** - Categories of products
  - Contains: id, name, description
  
- **tags** - Product tags for filtering and organization
  - Contains: id, name
  
- **product_tags** - Many-to-many relationship between products and tags
  - Contains: product_id, tag_id
  
- **orders** - Customer orders
  - Contains: id, user_id, status, total, etc.
  
- **order_products** - Line items in each order
  - Contains: order_id, product_id, price, quantity

### Relationships

- A **User** can place many **Orders**
- A **Product** belongs to one **ProductType**
- A **Product** can have many **Tags** (through product_tags)
- An **Order** contains many **Products** (through order_products)

## Screenshots

![Home Page](https://via.placeholder.com/400x300?text=Home+Page)
![Product Details](https://via.placeholder.com/400x300?text=Product+Details)
![Shopping Cart](https://via.placeholder.com/400x300?text=Shopping+Cart)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Michael Joseph Gelvez - [@kiminotenmei](https://x.com/kiminotenmei)

Project Link: [https://github.com/maikeru-desu/petalpost](https://github.com/maikeru-desu/petalpost)
