# Shopping List App

A React TypeScript application for managing shopping lists with user authentication, Redux state management, and JSON-server for data persistence.

## Planning

### Moodboard
- **Color Scheme**: 
  - Primary: `#007BFF` (blue for buttons/links)
  - Secondary: `#6C757D` (gray for text/borders)
  - Success: `#28A745` (green for confirmations)
  - Error: `#DC3545` (red for errors)
  - Background: `#F8F9FA` (light gray)
  - Text: `#333333` (dark gray)
- **Typography**: Roboto, sans-serif
  - Headings: `font-weight: 700`, sizes: `2.5rem` (h1), `2rem` (h2), `1.5rem` (h3)
  - Body: `font-weight: 400`, size: `1rem`
- **Layout**: 
  - Sidebar/top navigation for Home, Profile, Logout.
  - Centered content with cards for shopping lists.
  - Responsive at breakpoints: 320px, 480px, 768px, 1024px, 1200px.
- **Interactivity**: Hover effects, smooth transitions, toast notifications.
- **Inspiration**: Minimalist e-commerce interfaces (e.g., Amazon’s list feature).

### Step-by-Step Plan
1. Initialize React TypeScript project and install dependencies (`react-router-dom`, `redux`, `axios`, `bcryptjs`, `json-server`).
2. Set up project structure with components, pages, Redux slices, and Module CSS.
3. Configure Redux store with `authSlice` and `shoppingListSlice`.
4. Implement authentication (login/register) with encrypted passwords and protected routes.
5. Build Home page with CRUD operations, search, and sort for shopping lists.
6. Create Profile page for viewing/updating user info.
7. Ensure responsiveness with media queries in Module CSS.
8. Add accessibility (ARIA labels, keyboard navigation) and security (encrypted credentials).
9. Implement notifications and interactive elements (hover effects, cursor changes).
10. Use GitHub with `main` for planning and `development` for features; document in README.

### Pseudocode
```plaintext
// Initialize Project
CREATE React TypeScript project
INSTALL dependencies (react-router-dom, redux, axios, bcryptjs, json-server)
SETUP json-server with users and shoppingLists endpoints

// Redux Store
CONFIGURE store with authSlice and shoppingListSlice
authSlice:
  STATE: user, isAuthenticated, error
  ACTIONS: login, register, logout, updateProfile
shoppingListSlice:
  STATE: lists, searchQuery, sortBy
  ACTIONS: addList, fetchLists, updateList, deleteList, searchLists, sortLists

// Components
CREATE Class Components:
  - ShoppingListCard: Display list details, edit/delete buttons
  - AuthForm: Handle login/register forms
  - ProfileForm: Manage profile updates
CREATE Functional Components:
  - Navbar: Navigation with links to Home, Profile, Logout
  - ProtectedRoute: Restrict access based on auth
  - Notification: Show success/error messages

// Pages
LoginPage:
  DISPLAY AuthForm for login
  VALIDATE inputs
  DISPATCH login action
  REDIRECT to Home on success
RegistrationPage:
  DISPLAY AuthForm for registration
  VALIDATE inputs
  ENCRYPT password
  DISPATCH register action
  REDIRECT to Login
HomePage:
  DISPLAY list of ShoppingListCards
  ALLOW adding new lists
  IMPLEMENT search and sort with URL params
  HANDLE CRUD operations
ProfilePage:
  DISPLAY ProfileForm
  ALLOW updating user info and credentials

// Routing
SETUP BrowserRouter with routes:
  /login -> LoginPage
  /register -> RegistrationPage
  / -> HomePage (protected)
  /profile -> ProfilePage (protected)
USE ProtectedRoute to guard / and /profile

// Styling
USE Module CSS for each component
ADD media queries for breakpoints (320px, 480px, 768px, 1024px, 1200px)
IMPLEMENT hover effects, transitions, and cursor changes
ENSURE consistent typography and colors

// Data Management
CONFIGURE json-server with /users and /shoppingLists endpoints
USE axios for API calls
STORE user data and lists persistently
ENCRYPT passwords on signup

// GitHub
INITIALIZE repository
CREATE main and development branches
COMMIT planning to main
DEVELOP features in development with frequent commits
WRITE README with project overview, setup, and usage