import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/lib/db";
import { getSession } from '../../../actions';

/**
 * 
 * @swagger
 * /api/title/{id}:
 *   patch:
 *     summary: Update title information
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the title
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TitleData'
 *     responses:
 *       200:
 *         description: Title information updated successfully
 *       404:
 *         description: Title not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 *       405:
 *         description: Method Not Allowed
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
        const { titleData } = req.body;

        try {
            const updatedTitle = await db.title.update({
                where: {
                    id: +(id as string),
                },
                data: {
                    // Update title information logic here
                    // ...
                    ...titleData,
                },
            });

            return res.status(200).json({ message: 'Title information updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * 
     * @swagger
     * /api/title/{id}:
     *   get:
     *     summary: Get title information
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID of the title
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Title information retrieved successfully
     *       404:
     *         description: Title not found
     *       500:
     *         description: Internal Server Error
     *       401:
     *         description: Unauthorized
     *       405:
     *         description: Method Not Allowed
     */
    if (req.method === 'GET') {
        try {
            const title = await db.title.findUnique({
                where: {
                    id: +(id as string),
                },
            });

            if (!title) {
                return res.status(404).json({ error: 'Title not found' });
            }

            return res.status(200).json({ title });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * 
     * @swagger
     * /api/title/{id}:
     *   delete:
     *     summary: Delete title
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID of the title
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Title deleted successfully
     *       404:
     *         description: Title not found
     *       500:
     *         description: Internal Server Error
     *       401:
     *         description: Unauthorized
     *       405:
     *         description: Method Not Allowed
     */
    if (req.method === 'DELETE') {
        try {
            const deletedTitle = await db.title.delete({
                where: {
                    id: +(id as string),
                },
            });

            return res.status(200).json({ message: 'Title deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
