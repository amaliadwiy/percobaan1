export const ironOptions = {
    cookieName : "UserCookie", 
    password : String(process.env.NEXT_PUBLIC_COOKIE_KEY),
    cookieOptions:{
        secure: process.env.NODE_ENV ==="production"
    }
}