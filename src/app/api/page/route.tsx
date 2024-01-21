import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/lib/db";
import { getSession } from '../../actions';

/**
 * 
 * @swagger
 * /api/page:
 *   get:
 *     summary: Get all pages
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Limit the number of pages to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pages retrieved successfully
 *       500:
 *         description: Internal Server Error
 *       401:
 *         description: Unauthorized
 *       405:
 *         description: Method Not Allowed
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const MAX_DEFAULT_LIMIT = 20;
    const session = await getSession();
    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        try {
            const { limit } = req.query;
            const pages = await db.page.findMany({
                take: limit ? +(limit as string) : MAX_DEFAULT_LIMIT,
                include: {
                    Title: true,
                    Heading: {
                        include: {
                            BodyContent: true,
                        },
                    },
                },
            });

            return res.status(200).json({ pages });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
