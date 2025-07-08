This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://
nextjs.org/docs/app/api-reference/cli/create-next-app).# PetCare - Pet Adoption & Care Platform

A comprehensive web application for pet adoption and pet care services, built with Next.js, React, and Node.js.

## Features

- 🐕 **Pet Adoption**: Browse and adopt pets from shelters
- 🏥 **Veterinary Services**: Connect with certified veterinarians
- 🎓 **Pet Training**: Professional training services
- ✂️ **Pet Grooming**: Keep pets looking their best
- 🏠 **Boarding Services**: Safe and comfortable pet boarding
- 👤 **User Dashboard**: Manage adoptions and appointments
- 📱 **Responsive Design**: Works on all devices

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible UI components

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Multer** - File upload handling

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
my-app/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── adopt/             # Pet adoption page
│   ├── contact/           # Contact page
│   ├── dashboard/         # User dashboard
│   ├── login/             # Login page
│   ├── pet/[id]/          # Individual pet pages
│   ├── register/          # Registration page
│   └── services/          # Services page
├── components/            # Reusable UI components
│   └── ui/               # Radix UI components
├── public/               # Static assets
│   └── images/           # Image files
├── backend/              # Express.js server
│   ├── config/           # Database configuration
│   ├── middleware/       # Custom middleware
│   ├── models/           # MongoDB models
│   └── routes/           # API routes
└── lib/                  # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Pets
- `GET /api/pets` - Get all pets
- `GET /api/pets/:id` - Get specific pet
- `POST /api/pets` - Add new pet
- `PUT /api/pets/:id` - Update pet
- `DELETE /api/pets/:id` - Delete pet

### Services
- `GET /api/services` - Get all services
- `POST /api/appointments` - Book appointment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email info@petcare.com or create an issue in this repository.
