# TikTok-Analytics-SaaS-App

**Overview:**
TikTok-Analytics-SaaS-App is a modern, full-stack web application built with Next.js and TypeScript. It includes a beautiful UI powered by TailwindCSS and shadcn/ui, and provides dynamic form handling and validation using React Hook Form and Zod.
The backend is powered by Supabase, offering authentication, real-time database, and storage services.

**Tech Stack:**
- Next.js
- TypeScript
- TailwindCSS
- Lucide Icons
- React Hook Form
- Zod

**Project Structure:**
- `app/` – Contains Next.js app routes and pages
- `components/` – Reusable UI components
- `hooks/` – Custom React hooks
- `utils/` – Utility functions
- `supabase/` – Supabase client configuration
- `public/` – Static assets
- `schema.sql` – SQL schema for Supabase

**Getting Started:**
```bash
# Clone the repo
git clone https://github.com/suncoast-soft/TikTok-Analytics-SaaS-App.git
cd TikTok-Analytics-SaaS-App

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local  # Then fill in the required values

# Run the development server
npm run dev
```

**Features:**
- Full Next.js 13+ app directory structure
- Type-safe forms with Zod validation
- Supabase integration for auth and DB
- Utility-first design with TailwindCSS
- Reusable component system with shadcn/ui

**License:**
MIT