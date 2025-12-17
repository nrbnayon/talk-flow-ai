// middleware.ts - Next.js v16 Simple Proxy Middleware
import { NextRequest, NextResponse } from "next/server";
import { JWTPayload, jwtVerify } from "jose";

// ============================================
// CONFIGURATION
// ============================================

// Public routes (no authentication required)
const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/pricing",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

// Protected routes (authentication required)
const PROTECTED_ROUTES = ["/dashboard", "/profile", "/settings", "/admin"];

// Admin-only routes (requires admin role)
const ADMIN_ROUTES = ["/admin"];

// JWT Secret - Use environment variable in production
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Verify JWT token
 */
async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    console.error("❌ Error verifying token:", error);
    return null;
  }
}

/**
 * Check if a path matches any route in the list
 */
function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    // Exact match
    if (pathname === route) return true;
    // Prefix match (e.g., /dashboard matches /dashboard/*)
    if (pathname.startsWith(route + "/")) return true;
    return false;
  });
}

// ============================================
// MAIN PROXY FUNCTION (Next.js v16)
// ============================================

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  console.log("🔐 Middleware:", pathname);

  // ============================================
  // STEP 1: Extract tokens from cookies
  // ============================================
  const accessToken = request.cookies.get("accessToken")?.value;
  let userRole = request.cookies.get("userRole")?.value;

  // ============================================
  // STEP 2: Verify access token
  // ============================================
  let user = null;
  let isAuthenticated = false;
  const isDevelopment = process.env.NODE_ENV !== "production";

  if (accessToken) {
    // Development mode: Accept dummy credentials
    if (isDevelopment && accessToken === "dev-admin-token") {
      user = { email: "admin@gmail.com", role: "admin" };
      isAuthenticated = true;
      if (!userRole) {
        userRole = "admin";
      }
    } else {
      // Production mode: Verify JWT token
      user = await verifyToken(accessToken);
      isAuthenticated = !!user;

      // Extract role from token payload (if not in cookie)
      if (user && !userRole) {
        userRole = (user.role as string) || (user.userRole as string);
      }
    }
  }

  // Determine if user is admin
  const isAdmin = userRole === "admin" || user?.role === "admin";

  console.log("✅ Auth Status:", { isAuthenticated, userRole, isAdmin });

  // ============================================
  // STEP 3: Route matching
  // ============================================
  const isPublicRoute = matchesRoute(pathname, PUBLIC_ROUTES);
  const isProtectedRoute = matchesRoute(pathname, PROTECTED_ROUTES);
  const isAdminRoute = matchesRoute(pathname, ADMIN_ROUTES);

  // ============================================
  // STEP 4: Access control logic
  // ============================================

  // Public routes - always allow
  if (isPublicRoute) {
    // If authenticated user visits login/signup, redirect to dashboard
    if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    const response = NextResponse.next();
    // Add security headers
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    return response;
  }

  // Protected routes - require authentication
  if (isProtectedRoute || isAdminRoute) {
    // Not authenticated - redirect to login
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      console.log("❌ Unauthorized - Redirecting to login");
      return NextResponse.redirect(loginUrl);
    }

    // Admin routes - require admin role
    if (isAdminRoute && !isAdmin) {
      console.log("❌ Forbidden - Not admin");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Authenticated - allow access
    console.log("✅ Authorized - Access granted");
    const response = NextResponse.next();
    // Add security headers
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    return response;
  }

  // Default: Allow all other routes with security headers
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
