import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Get authentication handler
 *     responses:
 *       200:
 *         description: Successful response
 *   post:
 *     summary: Post authentication handler
 *     responses:
 *       200:
 *         description: Successful response
 */
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};