# Google OAuth Setup Guide

This guide will help you set up Google OAuth for authentication in the At Eaze platform.

## Backend Setup

### 1. Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Identity Services API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application" as the application type
6. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `http://localhost:5173` (for Vite dev server)
   - Your production domain (for production)
7. Copy the Client ID

### 2. Update Backend Environment Variables

Add these to your `backend/.env` file:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
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
2. **Google Sign-In popup opens**
3. **User signs in with Google**
4. **Google returns ID token (JWT) directly**
5. **Frontend sends ID token to backend**
6. **Backend verifies ID token and extracts user info**
7. **Backend creates/updates user and returns JWT**
8. **Frontend stores JWT and redirects user**

### User Account Linking

- **New users**: Account is created automatically with Google profile data
- **Existing users**: If email matches, account is linked to Google OAuth
- **Profile data**: Name, email, and profile picture are automatically imported

## Security Features

- **ID token verification**: Backend verifies Google ID tokens using Google's public keys
- **Email verification**: Google accounts are automatically verified
- **Secure storage**: JWT tokens are stored securely
- **Automatic logout**: Tokens expire after 30 days
- **No client secrets in frontend**: Only client ID is exposed, keeping secrets secure

## Troubleshooting

### Common Issues

1. **"Google Sign-In failed"**
   - Check that `VITE_GOOGLE_CLIENT_ID` is set correctly
   - Verify authorized JavaScript origins in Google Cloud Console
   - Ensure Google Identity Services API is enabled

2. **"Invalid credentials"**
   - Check backend environment variables
   - Verify Google Client ID is correct

3. **"Failed to initialize Google Sign-In"**
   - Check internet connection
   - Verify Google Identity Services script is loading

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

The Google Identity Services automatically requests the necessary scopes (email, profile, openid) for authentication. No additional scope configuration is needed.

### Profile Picture

Google profile pictures are automatically saved to the user's avatar field and can be displayed in the UI.

### Account Linking

Users can link multiple authentication methods to the same email address for seamless login. 