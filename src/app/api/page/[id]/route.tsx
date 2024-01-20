import { NextApiRequest, NextApiResponse } from 'next';
import {db} from "@/lib/db";
import { getSession } from '../../../actions';

/**
 * @swagger
 * /api/page/{id}:
 *   patch:
 *     summary: Update page information
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the page
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Page information updated successfully
 *       404:
 *         description: Page not found
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
    } = req;

    const session = await getSession();
    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'PATCH') {
        const { pageData } = req.body;

        try {
            const updatedPage = await db.page.update({
                where: {
                    id: id as string,
                },
                data: {
                    // Update page information logic here
                    // ...
                },
            });

            return res.status(200).json({ message: 'Page information updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    if (req.method === 'GET') {
        try {
            const page = await db.page.findUnique({
                where: {
                    id: id as string,
                },
            });

            if (!page) {
                return res.status(404).json({ error: 'Page not found' });
            }

            return res.status(200).json({ page });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const deletedPage = await db.page.delete({
                where: {
                    id: id as string,
                },
            });

            return res.status(200).json({ message: 'Page deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}