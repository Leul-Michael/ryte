export { auth as middleware } from "@/lib/auth"

export const config = {
  matcher: ["/ryte", "/ryte/:path*", "/profile/:path*", "/story/:slug/update"],
}
