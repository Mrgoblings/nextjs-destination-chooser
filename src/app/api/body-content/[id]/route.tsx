import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/lib/db";
import { getSession } from '../../../actions';

/**
 * 
 * @swagger
 * /api/body-content/{id}:
 *   patch:
 *     summary: Update body content information
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the body content
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BodyContentData'
 *     responses:
 *       200:
 *         description: Body content information updated successfully
 *       404:
 *         description: Body content not found
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
        const { bodyContentData } = req.body;

        try {
            const updatedBodyContent = await db.bodyContent.update({
                where: {
                    id: +(id as string),
                },
                data: {
                    // Update body content information logic here
                    // ...
                    ...bodyContentData,
                },
            });

            return res.status(200).json({ message: 'BodyContent information updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * 
     * @swagger
     * /api/body-content/{id}:
     *   get:
     *     summary: Get body content information
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID of the body content
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Body content information retrieved successfully
     *       404:
     *         description: Body content not found
     *       500:
     *         description: Internal Server Error
     *       401:
     *         description: Unauthorized
     *       405:
     *         description: Method Not Allowed
     */
    if (req.method === 'GET') {
        try {
            const bodyContent = await db.bodyContent.findUnique({
                where: {
                    id: +(id as string),
                },
            });

            if (!bodyContent) {
                return res.status(404).json({ error: 'BodyContent not found' });
            }

            return res.status(200).json({ bodyContent });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * 
     * @swagger
     * /api/body-content/{id}:
     *   delete:
     *     summary: Delete body content
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID of the body content
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Body content deleted successfully
     *       404:
     *         description: Body content not found
     *       500:
     *         description: Internal Server Error
     *       401:
     *         description: Unauthorized
     *       405:
     *         description: Method Not Allowed
     */
    if (req.method === 'DELETE') {
        try {
            const deletedBodyContent = await db.bodyContent.delete({
                where: {
                    id: +(id as string),
                },
            });

            return res.status(200).json({ message: 'BodyContent deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
