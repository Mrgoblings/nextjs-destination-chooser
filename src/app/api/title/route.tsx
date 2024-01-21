import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/lib/db";
import { getSession } from '../../actions';

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
 *       401:
 *         description: Unauthorized
 *       405:
 *         description: Method Not Allowed
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession();
    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        try {
            const { limit } = req.query;
            const titles = await db.title.findMany({
                take: limit ? +(limit as string) : undefined,
            });

            return res.status(200).json({ titles });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
