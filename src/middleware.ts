import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const authPages = ["/auth/login", "/auth/register", "/auth/forgotPassword"];
const publicPages = ["/", ...authPages];

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess() {
    return NextResponse.next(); 
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/auth/login",
      error: "/auth/login",
    },
  }
);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const publicPathnameRegex = RegExp(
  `^(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  );
  const authPathnameRegex = RegExp(
    `^(${authPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname);

  // If the user is navigating to a public page check if they are authenticated or not
  if (isPublicPage) {
    // If they are authenticated and trying to access an auth page, redirect to dashboard
    if (token && isAuthPage) {
      const redirectUrl = new URL("/dashboard", req.nextUrl.origin);

      return NextResponse.redirect(redirectUrl);
    }

    // Otherwise, let them navigate
    return NextResponse.next();
  } else {
    // If they are navigating to a private page, authenticate them first

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};