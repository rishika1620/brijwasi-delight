You are a senior Frontend Architect and Angular expert.

I have already developed a backend for a food delivery application
(Brijwasi Delight) using Spring Boot microservices.

I am providing you access to the BACKEND CODE.
You must carefully analyze the backend APIs, DTOs, models, and endpoints
before designing the frontend.

----------------------------------------------------
TECH STACK REQUIREMENTS
----------------------------------------------------

Framework: Angular (latest stable version)
Language: TypeScript
Styling: SCSS
UI Style Reference: Zomato, Swiggy
Architecture: Modular, scalable, reusable
State handling: Services + RxJS
Responsive: Mobile-first (important)

----------------------------------------------------
DESIGN & UI REQUIREMENTS
----------------------------------------------------

• Follow modern food-delivery UI patterns
• Clean, minimal, premium look
• Use the provided MENU and COLOR references as the base theme
• Responsive for:
  - Mobile
  - Tablet
  - Desktop

Theme Guidelines:
• Primary color: Based on provided menu theme
• Secondary color: Subtle neutral
• Fonts: Clean, readable (Zomato/Swiggy inspired)
• Rounded cards
• Smooth hover & transition effects

----------------------------------------------------
FEATURES TO IMPLEMENT
----------------------------------------------------

1️⃣ AUTHENTICATION
- Login
- Register
- JWT-based authentication
- Store token securely
- Guard protected routes

2️⃣ HOME PAGE
- Category-based menu listing
- Sections like:
  - Special
  - Starters
  - Main Course
  - Beverages
  - Chinese
  - South Indian
- Search bar
- Filter by category

3️⃣ MENU ITEM CARD
- Image
- Name
- Price
- Rating (static/dummy if not available)
- Add to Cart button
- Customization modal (extra cheese, add-ons)

4️⃣ CART
- Add / remove items
- Update quantity
- Show selected customizations
- Price calculation
- Proceed to checkout

5️⃣ CHECKOUT
- Address selection
- Order summary
- Payment initiation (API integrated)
- Order confirmation

6️⃣ ORDERS
- Current orders
- Previous orders
- Order status timeline:
  CONFIRMED → PREPARING → PACKED → ON_THE_WAY → DELIVERED

7️⃣ NOTIFICATIONS
- Fetch notifications from backend
- Display notification list

8️⃣ ACCOUNT / PROFILE
- User details
- Address management
- Order history
- Logout

----------------------------------------------------
ARCHITECTURE RULES (VERY IMPORTANT)
----------------------------------------------------

1. Use Angular MODULES
   - auth
   - home
   - menu
   - cart
   - order
   - payment
   - notification
   - shared

2. Create SEPARATE folders for:
   - components
   - services
   - models / interfaces
   - guards
   - interceptors

3. API integration MUST be done via SERVICES only
   - No HTTP calls inside components

4. Use reusable components:
   - Button
   - Card
   - Modal
   - Loader
   - Navbar
   - Footer

5. Apply SOLID principles and DRY
6. Use Angular Interceptor for JWT token
7. Use Route Guards for protected pages

----------------------------------------------------
BACKEND INTEGRATION
----------------------------------------------------

Base API URL: http://localhost:8080 (API Gateway)

Integrate APIs for:
- Auth Service
- Menu Service
- Cart Service
- Order Service
- Payment Service
- Notification Service

Match request & response models EXACTLY with backend DTOs.

----------------------------------------------------
DELIVERABLES
----------------------------------------------------

1. Angular project structure
2. Module-wise folder structure
3. Reusable UI components
4. Models / Interfaces
5. Services for each backend microservice
6. JWT Interceptor
7. Auth Guard
8. Fully responsive UI
9. Sample HTML + SCSS for key screens
10. Instructions to run the frontend locally

----------------------------------------------------
IMPORTANT OUTPUT RULE
----------------------------------------------------

• Generate code incrementally
• Start with project setup
• Then core layout (navbar, footer)
• Then Auth
• Then Menu → Cart → Order flow
• Ensure clean and readable code
• Avoid placeholder logic where backend API exists
