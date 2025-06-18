# PetalPost - Modern Flower Shop E-Commerce

PetalPost is a full-stack e-commerce platform for a modern flower shop, built with Laravel and React. It features a responsive design, secure authentication, product catalog management, and a smooth shopping experience.

![PetalPost Banner](https://via.placeholder.com/800x400?text=PetalPost+Banner)

## Features

- 🌸 Beautiful, responsive UI built with React and Tailwind CSS
- 🔐 Secure authentication with Laravel Sanctum
- 🛒 Product browsing and shopping cart functionality
- 💳 Checkout and payment processing
- 👤 User account management
- 📱 Fully responsive design for mobile and desktop
- 🔍 Product search and filtering capabilities
- 🌟 Clean, maintainable codebase architecture

## Tech Stack

### Backend
- **Laravel** - PHP framework for robust backend development
- **MySQL** - Database
- **Laravel Sanctum** - API authentication
- **Action Pattern** - Clean architecture for business logic organization

### Frontend
- **React** - JavaScript library for building user interfaces
- **React Router** - Routing for React applications
- **React Query** - Data fetching and state management
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

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
- `src/hooks` - Custom React hooks
- `src/stores` - Zustand store definitions
- `src/api` - API service modules

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

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/petalpost](https://github.com/yourusername/petalpost)
