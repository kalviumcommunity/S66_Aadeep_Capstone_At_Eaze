# Google OAuth Setup Guide

This guide will help you set up Google OAuth for authentication in the At Eaze platform.

## Backend Setup

### 1. Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application" as the application type
6. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `http://localhost:5000` (for backend)
   - Your production domain (for production)
7. Copy the Client ID and Client Secret

### 2. Update Backend Environment Variables

Add these to your `backend/.env` file:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

## Frontend Setup

### 1. Create Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### 2. Update Google OAuth Component (if needed)

The Google OAuth component is already configured to use the environment variable. Make sure your `VITE_GOOGLE_CLIENT_ID` matches the one from your Google Cloud Console.

## How It Works

### Authentication Flow

1. **User clicks "Continue with Google"**
2. **Google OAuth popup opens**
3. **User authorizes the application**
4. **Google returns an authorization code**
5. **Frontend sends code to backend**
6. **Backend exchanges code for user info**
7. **Backend creates/updates user and returns JWT**
8. **Frontend stores JWT and redirects user**

### User Account Linking

- **New users**: Account is created automatically with Google profile data
- **Existing users**: If email matches, account is linked to Google OAuth
- **Profile data**: Name, email, and profile picture are automatically imported

## Security Features

- **Token validation**: Backend verifies Google tokens
- **Email verification**: Google accounts are automatically verified
- **Secure storage**: JWT tokens are stored securely
- **Automatic logout**: Tokens expire after 30 days

## Troubleshooting

### Common Issues

1. **"Google OAuth failed"**
   - Check that `VITE_GOOGLE_CLIENT_ID` is set correctly
   - Verify redirect URIs in Google Cloud Console
   - Ensure Google+ API is enabled

2. **"Invalid credentials"**
   - Check backend environment variables
   - Verify Google Client Secret is correct

3. **"Failed to initialize Google OAuth"**
   - Check internet connection
   - Verify Google OAuth script is loading

### Development vs Production

- **Development**: Use `http://localhost:3000` and `http://localhost:5000`
- **Production**: Use your actual domain names
- **HTTPS**: Production requires HTTPS for OAuth to work

## Testing

1. Start both backend and frontend servers
2. Navigate to login or signup page
3. Click "Continue with Google"
4. Complete Google OAuth flow
5. Verify user is logged in and redirected appropriately

## Additional Configuration

### Custom Scopes

You can modify the OAuth scopes in `GoogleOAuth.jsx`:

```javascript
scope: "email profile openid", // Add more scopes as needed
```

### Profile Picture

Google profile pictures are automatically saved to the user's avatar field and can be displayed in the UI.

### Account Linking

Users can link multiple authentication methods to the same email address for seamless login. 