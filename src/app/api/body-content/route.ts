import { NextApiRequest, NextApiResponse } from 'next';
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
            const bodyContents = await db.bodyContent.findMany({
                take: limit ? +(limit as string) : MAX_DEFAULT_LIMIT,
            });

            return res.status(200).json({ bodyContents });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}