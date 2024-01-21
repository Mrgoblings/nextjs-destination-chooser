import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/lib/db";

/**
 * 
 * @swagger
 * /api/heading:
 *   get:
 *     summary: Get all headings
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Limit the number of headings to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Headings retrieved successfully
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: No Headings found
 */
export default async function GET(req: NextRequest) {
    const MAX_DEFAULT_LIMIT = 20;

    try {
        const { limit } = await req.json();
        const headings = await db.heading.findMany({
            take: limit ? +(limit as string) : MAX_DEFAULT_LIMIT,
        });

        if (headings.length === 0) {
            return NextResponse.json({ error: 'No Headings found' }, { status: 404 });
        }

        return NextResponse.json({ headings }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
