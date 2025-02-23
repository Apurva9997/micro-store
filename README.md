# Microfrontend Demo with Vite

This project demonstrates a microfrontend architecture using Vite with build-time composition. The architecture is designed to showcase how multiple independent applications can work together in a cohesive system.

## Project Structure

```
microfrontends-poc/
├── host-app/               # Main container application
├── apps/
│   ├── catalog/           # Product catalog microfrontend
│   ├── cart/             # Shopping cart microfrontend
│   └── user-profile/     # User management microfrontend
└── package.json         # Root workspace configuration
```

## Technical Stack

- Vite - Build tool
- React - UI framework
- TypeScript - Type safety
- Module Federation - Microfrontend composition
- Tailwind CSS - Styling
- React Router - Navigation

## Implementation Approach

### Host Application

- Acts as the shell application
- Handles routing between microfrontends
- Manages shared state if needed
- Provides common layout and navigation

### Microfrontends

- Each microfrontend is a standalone Vite application
- Exposes their main component and any shared components
- Can be developed and tested independently

### Shared Features

- Common UI components
- Authentication state
- Utility functions
- Type definitions

## Integration Strategy

- Module Federation for exposing and consuming microfrontends
- Each microfrontend exposes its main component
- Host app imports and renders these components
- Shared dependencies managed at the host level

## Development Workflow

- Independent development for each microfrontend
- Local development server for each app
- Build-time integration for production deployment
- Shared component library for consistent UI

## Implementation Phases

### Phase 1

1. Set up the host application with basic routing
2. Create the catalog microfrontend
3. Create the cart microfrontend
4. Implement basic module federation configuration

### Phase 2

1. Add shared component library
2. Implement state management if needed
3. Add user profile microfrontend
4. Add build and deployment configuration

## Key Features

### Catalog App

- Product listing
- Product details
- Category navigation

### Cart App

- Cart summary
- Add/remove items
- Cart total calculation

### User Profile App

- User information display
- Basic profile management

## Communication Pattern

- Event-based communication between microfrontends
- Shared state management for critical data
- URL-based routing for navigation

## Build and Deployment

- Independent build process for each microfrontend
- Host app combines all microfrontends at build time
- Single deployment artifact for production

## Getting Started

[Instructions will be added as we implement the project]
