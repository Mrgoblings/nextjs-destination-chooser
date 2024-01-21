import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/lib/db";


/**
 * 
 * @swagger
 * /api/title:
 *   get:
 *     summary: Get all titles
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Limit the number of titles to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Titles retrieved successfully
 *       500:
 *         description: Internal Server Error
 */
export async function handler(req: NextRequest) {
    const MAX_DEFAULT_LIMIT = 20;

    try {
        const { limit } = await req.json();
        const titles = await db.title.findMany({
            take: limit ? +(limit as string) : MAX_DEFAULT_LIMIT,
        });

        return NextResponse.json({ titles }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
