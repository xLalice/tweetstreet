
# Social Media Post Scheduler with Location Tagging

## Backend
[https://github.com/xLalice/tweet-street-backend](https://github.com/xLalice/tweet-street-backend).
## Overview

This application is a social media post scheduler that allows users to:
- Authenticate using Twitter via OAuth.
- Create and schedule social media posts.
- Tag locations using Google Maps.
- View scheduled posts on a calendar interface.

## Tech Stack

### Frontend:
- **React** (with TypeScript)
- **Tailwind CSS** for styling.

### Backend:
- **Node.js** (with TypeScript)
- **Express.js** for API management.

### Database:
- **PostgreSQL** with **Prisma ORM** for handling relational data.

### Third-party APIs:
- **Twitter API** for posting tweets.
- **Google Maps API** for location tagging (geocoding).

### Job Scheduling:
- **Node-Cron** for scheduling posts.

## Features

1. **User Authentication**: Users authenticate via Twitter using OAuth.
2. **Post Creation**: Users create posts with content, date, time, and location using Google Maps.
3. **Location Tagging**: Location coordinates are retrieved via the Google Maps Geocoding API.
4. **Post Scheduling**: Posts are scheduled using Node-Cron.
5. **Calendar View**: Scheduled posts are displayed in a calendar interface.

## Backend Architecture (Express + Prisma + PostgreSQL)

### User Authentication (OAuth 2.0)
- Twitter OAuth is used for user authentication.
- OAuth tokens are stored securely in the PostgreSQL database using Prisma ORM.

### Database Models (Prisma Schema)

- **User**: Stores user details such as ID, email, name, and connected Twitter account.
- **Post**: Represents a scheduled post. Fields include content, scheduled time, and location (latitude/longitude).
- **SocialMediaAccount**: Stores OAuth tokens and metadata for connected Twitter accounts.

### Google Maps Integration
- The Google Maps Geocoding API is used to process the location data entered by the user. This returns the latitude and longitude of the location, which is stored in the Post model.

### Scheduling Posts
- **Node-Cron** is used to schedule posts. When a post is created and scheduled, a cron job triggers at the designated time and posts the content to Twitter via the Twitter API.

### API Endpoints

#### Authentication:
- **POST /api/connect/twitter**: Authenticate the user with Twitter via OAuth.

#### Posts:
- **POST /api/posts**: Create a new post. Payload should include content, selected platform (Twitter), location coordinates, and scheduled time.
- **GET /api/posts**: Retrieve scheduled or past posts.
- **PUT /api/posts/:postId/status**: Update the status of a post, based on webhook notifications (e.g., post successful or failed).

## Frontend Architecture (React + TypeScript)

### User Authentication (OAuth)
- Users authenticate via Twitter’s OAuth. The OAuth tokens are sent to the backend for secure storage and handling.

### Post Creation
- Users can write a post, select the date and time for scheduling, and tag a location using **Google Maps**.
- **Google Maps Integration**: Users enter a location (address), which is then processed via the Google Maps Geocoding API to return latitude and longitude coordinates.
- The user can view the post on a calendar interface, and the scheduled posts are displayed with relevant information such as platform and scheduled time.

### Calendar View
- The app uses a calendar view to display all scheduled posts.
- Posts are color-coded to represent different platforms (Twitter).
- Users can view, edit, or delete posts directly from the calendar.

## Setup and Configuration

### Setting Up Locally

1. **Clone the repository**:
   git clone https://github.com/xLalice/tweet-street
   cd your-repo
2. **INstall dependencies**:
   npm install
3. **Set up environment variables:**
   Create a .env file in the root directory with the following environment variable:
   TWITTER_API_KEY=<your-twitter-api-key>
    TWITTER_API_SECRET=<your-twitter-api-secret>
    GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
    DATABASE_URL=<your-database-url>
4. **RUn the application:**
    npm run dev

### Configuration
**Twitter API**: You will need to set up a Twitter Developer account to get the necessary API keys and tokens. Add these to the .env file.
**Google Maps API**: Get an API key from the Google Cloud Platform, and add it to your .env file.
### Prisma Setup
Run the following command to generate the Prisma client and apply database migrations:
  npx prisma migrate dev --name init
### API Integrations and Security
**Twitter API**
  The app uses the Twitter API to post tweets. OAuth is used to securely authenticate users, and the API keys are stored as environment variables.
**Google Maps API**
  Geocoding: The app uses Google’s Geocoding API to convert location names into coordinates.
  The coordinates are stored in the database and used for location tagging.
**Securing API Keys and OAuth Tokens**
API keys for Twitter and Google Maps are secured using environment variables.
OAuth tokens for Twitter are stored securely in the PostgreSQL databas

### Pages
![image](https://github.com/user-attachments/assets/fea90ebb-be7a-4e51-92b6-fbf7f793a52f)

![image](https://github.com/user-attachments/assets/cf9c6e89-5b45-4efa-b4d8-6423e3bfb243)

![image](https://github.com/user-attachments/assets/6dc84e14-cc0c-4bd9-8f1d-1ea5ec83d0e8)


