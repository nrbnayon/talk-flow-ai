# 🎙️ Talk Flow AI - AI Interaction & Claims Management Dashboard

## 🌟 Overview
**Talk Flow AI** is a cutting-edge administrative platform designed to manage and analyze AI-driven voice interactions and claims workflows. Built with a focus on speed, aesthetics, and data-driven insights, it provides a seamless experience for administrators to monitor performance, manage users, and handle complex reporting.

The platform leverages a modern dark-themed aesthetic with vibrant gradients, providing a premium feel for advanced AI operations management.

---

## 🚀 Key Features

-   **🤖 AI Interaction Hub**: 
    -   Schedule and manage AI-driven calls.
    -   View detailed interaction histories and transcripts.
    -   Monitor live call status and metrics.
-   **📊 Advanced Analytics & Reporting**: 
    -   Interactive dashboards with **Recharts**.
    -   Weekly activity tracking and claims trend analysis.
    -   Detailed reports on resolution times and claim types.
-   **📑 Claims Management**: 
    -   Centralized tracking system for all pending and processed claims.
    -   Workflow-based interaction for claim resolution.
-   **📁 Document Center**: 
    -   Integrated document management system for maintaining project records.
-   **👤 User & Profile Administration**: 
    -   Comprehensive user management tools.
    -   Personalized profile settings and role-based access control.
-   **🔐 Secure Authentication**: 
    -   Robust auth flow including Login, OTP Verification, and Password Recovery.

---

## 🛠️ Tech Stack

-   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with custom design tokens.
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth UI transitions.
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) for accessible, high-performance components.
-   **Icons**: [HugeIcons](https://hugeicons.com/), [Lucide React](https://lucide.dev/), and Tabler Icons.
-   **Charts**: [Recharts](https://recharts.org/) for data visualization.
-   **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for validation.
-   **Notifications**: [Sonner](https://sonner.stevenly.all/) for elegant toast alerts.

---

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router (Auth & Dashboard groups)
├── components/           # UI Components (Dashboard, Auth, and primitives)
│   ├── Dashboard/        # Feature-specific dashboard components
│   ├── Auth/             # Authentication-related components
│   └── ui/               # Base Radix-based UI elements
├── data/                 # Static data and mock definitions
├── hooks/                # Custom React hooks
├── lib/                  # Shared utilities and validation logic
├── public/               # Static assets (icons, logo, etc.)
└── types/                # TypeScript type definitions
```

---

## 📦 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/nrbnayon/talk-flow-ai.git
    cd talk-flow-ai
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build and Deploy

To create an optimized production build:
```bash
npm run build
npm start
```

---

## 🎨 Design System

Talk Flow AI uses a custom design system defined in `globals.css`:
-   **Primary Background**: `#0A0E14` (Deep Night)
-   **Accent Colors**: Vibrant purples and reds for interactive elements.
-   **Typography**: Optimized Geist and Inter font family for maximum readability.
-   **Glassmorphism**: Subtle effects for cards and overlays.

---

Built with ❤️ by the Talk Flow AI Team.
