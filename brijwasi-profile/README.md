# Brijwasi Profile Service

## Overview
The Profile Service is a dedicated microservice that manages user profile data including addresses, payment methods, and user preferences. This service handles all user profile-related operations independently from the Authentication Service, following the microservices architecture pattern.

## Service Details
- **Service Name**: profile-service
- **Port**: 8084
- **Database**: MySQL - `brijwasi_profile`
- **Eureka Registration**: Yes

## Architecture

### Models
1. **Address** - User delivery addresses with default address tracking
2. **PaymentCard** - Payment methods (Credit, Debit, UPI cards)
3. **UserPreferences** - User notification and food preferences

### Database Tables
- `user_addresses` - Stores user delivery addresses
- `payment_cards` - Stores user payment methods
- `user_preferences` - Stores user preferences and settings

## API Endpoints

### Address Management

#### Get All Addresses
```
GET /api/profile/addresses
Header: X-User-Id: {userId}
```
Response: List of all active user addresses

#### Get Specific Address
```
GET /api/profile/addresses/{id}
Header: X-User-Id: {userId}
```
Response: Address details

#### Create Address
```
POST /api/profile/addresses
Header: X-User-Id: {userId}
Body:
{
  "label": "Home",
  "street": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "country": "USA",
  "mobileNumber": "1234567890",
  "landmark": "Near Central Park",
  "isDefault": true
}
```
Response: Created address object

#### Update Address
```
PUT /api/profile/addresses/{id}
Header: X-User-Id: {userId}
Body: Updated address data
```
Response: Updated address object

#### Delete Address
```
DELETE /api/profile/addresses/{id}
Header: X-User-Id: {userId}
```
Response: Success message

#### Set Default Address
```
PUT /api/profile/addresses/{id}/set-default
Header: X-User-Id: {userId}
```
Response: Success message

#### Get Default Address
```
GET /api/profile/addresses/default
Header: X-User-Id: {userId}
```
Response: Default address object or null

---

### Payment Card Management

#### Get All Payment Cards
```
GET /api/profile/payment-cards
Header: X-User-Id: {userId}
```
Response: List of all active payment cards

#### Get Specific Payment Card
```
GET /api/profile/payment-cards/{id}
Header: X-User-Id: {userId}
```
Response: Payment card details

#### Add Payment Card
```
POST /api/profile/payment-cards
Header: X-User-Id: {userId}
Body:
{
  "cardType": "CREDIT",
  "cardHolderName": "John Doe",
  "cardNumber": "4242",
  "expiryMonth": 12,
  "expiryYear": 2025,
  "isDefault": true
}
```
Response: Created card object

#### Update Payment Card
```
PUT /api/profile/payment-cards/{id}
Header: X-User-Id: {userId}
Body: Updated card data
```
Response: Updated card object

#### Delete Payment Card
```
DELETE /api/profile/payment-cards/{id}
Header: X-User-Id: {userId}
```
Response: Success message

#### Set Default Payment Card
```
PUT /api/profile/payment-cards/{id}/set-default
Header: X-User-Id: {userId}
```
Response: Success message

#### Get Default Payment Card
```
GET /api/profile/payment-cards/default
Header: X-User-Id: {userId}
```
Response: Default payment card object or null

---

### User Preferences

#### Get User Preferences
```
GET /api/profile/preferences
Header: X-User-Id: {userId}
```
Response: User preferences object (creates default if not exists)

#### Update User Preferences
```
PUT /api/profile/preferences
Header: X-User-Id: {userId}
Body:
{
  "emailNotifications": true,
  "smsNotifications": true,
  "pushNotifications": true,
  "promotionalEmails": false,
  "preferredLanguage": "en",
  "preferredCurrency": "INR",
  "isVegetarian": false,
  "isSpicyFoodLover": true,
  "dietaryRestrictions": "No nuts",
  "newsLetterSubscribed": true
}
```
Response: Updated preferences object

## Response Format

All responses follow the StandardizedApiResponse format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "statusCode": 200
}
```

## Features

### Address Management
- ✅ Create multiple addresses per user
- ✅ Edit address details
- ✅ Delete addresses (soft delete)
- ✅ Set default address (only one active)
- ✅ Automatic cleanup of deleted defaults
- ✅ Validation for address fields

### Payment Card Management
- ✅ Support for Credit, Debit, and UPI cards
- ✅ Secure last-4-digits storage
- ✅ Expiry date tracking
- ✅ Default card selection
- ✅ Multiple payment methods per user
- ✅ Soft deletion of cards

### User Preferences
- ✅ Notification preferences (Email, SMS, Push)
- ✅ Promotional email opt-in/opt-out
- ✅ Newsletter subscription
- ✅ Language selection
- ✅ Currency preference
- ✅ Food preferences (Vegetarian, Spicy)
- ✅ Dietary restrictions tracking

## Database Schema

### user_addresses
```sql
CREATE TABLE user_addresses (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  label VARCHAR(50) NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL,
  mobile_number VARCHAR(20) NOT NULL,
  landmark VARCHAR(255),
  is_default BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_is_active (is_active)
);
```

### payment_cards
```sql
CREATE TABLE payment_cards (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  card_type VARCHAR(20) NOT NULL,
  card_holder_name VARCHAR(100) NOT NULL,
  card_number VARCHAR(20) NOT NULL,
  expiry_month INT,
  expiry_year INT,
  upi_id VARCHAR(255),
  is_default BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_is_active (is_active)
);
```

### user_preferences
```sql
CREATE TABLE user_preferences (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT UNIQUE NOT NULL,
  email_notifications BOOLEAN DEFAULT TRUE,
  sms_notifications BOOLEAN DEFAULT TRUE,
  push_notifications BOOLEAN DEFAULT TRUE,
  promotional_emails BOOLEAN DEFAULT TRUE,
  preferred_language VARCHAR(20) DEFAULT 'en',
  preferred_currency VARCHAR(10) DEFAULT 'INR',
  is_vegetarian BOOLEAN DEFAULT FALSE,
  is_spicy_food_lover BOOLEAN DEFAULT TRUE,
  dietary_restrictions TEXT,
  news_letter_subscribed BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id)
);
```

## Environment Configuration

### application.yml
- Database: MySQL (localhost:3306)
- Service Port: 8084
- Eureka Server: http://localhost:8761/eureka/
- Database Name: brijwasi_profile

### To Run the Service
```bash
mvn clean install
mvn spring-boot:run
```

## Integration with Other Services

### API Gateway
The Profile Service should be registered with the API Gateway:
```yaml
# In API Gateway config
profile:
  url: http://localhost:8084
  routes:
    - path: /profile/**
      service-url: http://profile-service:8084
```

### Auth Service Integration
- Profile Service is called by Auth Service to create default preferences for new users
- Uses X-User-Id header for user identification

## Security Considerations

1. **X-User-Id Header**: All endpoints require this header for user identification
2. **Data Isolation**: Users can only access their own addresses/preferences
3. **Soft Deletes**: Deleted data is marked inactive, not permanently removed
4. **Default Management**: Automatic handling ensures only one default per category

## Future Enhancements

1. Add Loyalty Points tracking
2. Add Order History storage
3. Add Product Reviews/Ratings
4. Add Wishlist/Favorites
5. Add Referral Code management
6. Add User Activity Logs
7. Add Integration with Recommendation Engine
