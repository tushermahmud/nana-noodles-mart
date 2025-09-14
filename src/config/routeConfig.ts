export interface ProtectedRoute {
  path: RegExp;
  description: string;
}

export const protectedRoutes: ProtectedRoute[] = [
  {
    path: /^\/admin/,
    description: 'Admin dashboard and management pages'
  },
  {
    path: /^\/cart/,
    description: 'Shopping cart page'
  },
  {
    path: /^\/checkout/,
    description: 'Checkout process'
  },
  {
    path: /^\/profile/,
    description: 'User profile pages'
  },
  {
    path: /^\/orders/,
    description: 'User order history'
  },
  {
    path: /^\/account/,
    description: 'Account management'
  }
];

// Routes that should redirect authenticated users away
export const authRoutes = [
  '/login',
  '/register',
  '/sign-in',
  '/sign-up'
];

// Public routes that don't require authentication
export const publicRoutes = [
  '/',
  '/products',
  '/categories',
  '/about',
  '/contact'
];
