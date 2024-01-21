import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from '../../actions';

/**
 * 
 * @swagger
 * /api/body-content:
 *   get:
 *     summary: Get all body contents
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Limit the number of body contents to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Headings retrieved successfully
 *       500:
 *         description: Internal Server Error
 *       401:
 *         description: Unauthorized
 */
export async function GET(req: NextRequest) {
    const MAX_DEFAULT_LIMIT = 20;

    try {
        const { limit } = await req.json();
        const bodyContents = await db.bodyContent.findMany({
            take: limit ? +(limit as string) : MAX_DEFAULT_LIMIT,
        });

        return NextResponse.json({ bodyContents }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

