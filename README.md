# Experience Generator Platform

## Business Requirements

### Project Overview
The Experience Generator Platform aims to bridge the gap between newly-minted lawyers seeking practical experience and clients looking for free legal consultation. By connecting these two user groups, the platform facilitates a symbiotic relationship where lawyers gain valuable work experience while clients receive the guidance they need.

### Target Users
1. **Beginner Lawyers**: Newly qualified lawyers in need of real-world experience.
2. **Clients**: Individuals seeking complimentary legal consultations with confidentiality.
3. **Mentors**: Seasoned lawyers providing oversight and support.
4. **Admins**: Supervisors with full platform oversight and control capabilities.

### Expected Outcomes
- **Beginner Lawyers**: Accumulate documented legal practice experience and earn certificates for employment prospects.
- **Clients**: Obtain free legal advice while maintaining anonymity.

## Technical Requirements

### Core Functionalities
1. **User Authentication**: Secure login through Google Auth, distinguishing different user roles.
2. **One-on-One Chat**: Private messaging system for direct communication between lawyers and clients.
3. **Review System**: Clients can rate lawyers on a scale of 1 to 5 stars, along with text feedback.
4. **Notifications**: Real-time alerts for new messages to keep users engaged.
5. **User Profiles**: Simple profiles containing only essential details like name and email.
6. **Search Functionality**: Keyword-based searching to streamline user connections.
7. **Certificates**: Generation of certificates for lawyers documenting their accrued experience.

### Tech Stack and Tools
- **Backend Framework**: Nest.js with TypeScript for robust server-side logic.
- **Database**: PostgreSQL managed with TypeORM for data persistence.
- **Authentication**: Passport.js with Google OAuth for user authentication.
- **API Documentation**: Swagger implemented with `@nestjs/swagger`.
- **Validation and Transformation**: `class-validator` and `class-transformer` for DTO and model management.
- **Testing**: Jest for both unit and end-to-end testing.
- **Rate Limiting**: Nest.js `throttler` for API request management.
- **Error Handling**: Custom global filters for consistent error responses.
- **Versioning**: API versioning through URL paths for forward compatibility.
