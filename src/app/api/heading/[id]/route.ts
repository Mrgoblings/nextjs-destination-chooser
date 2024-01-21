import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/lib/db";
import { getSession } from '../../../actions';

/**
 * 
 * @swagger
 * /api/heading/{id}:
 *   patch:
 *     summary: Update heading information
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the heading
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HeadingData'
 *     responses:
 *       200:
 *         description: Heading information updated successfully
 *       404:
 *         description: Heading not found
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
        const { headingData } = req.body;

        try {
            const updatedHeading = await db.heading.update({
                where: {
                    id: +(id as string),
                },
                data: {
                    // Update heading information logic here
                    // ...
                    ...headingData,
                },
            });

            return res.status(200).json({ message: 'Heading information updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * 
     * @swagger
     * /api/heading/{id}:
     *   get:
     *     summary: Get heading information
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID of the heading
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Heading information retrieved successfully
     *       404:
     *         description: Heading not found
     *       500:
     *         description: Internal Server Error
     *       401:
     *         description: Unauthorized
     *       405:
     *         description: Method Not Allowed
     */
    if (req.method === 'GET') {
        try {
            const heading = await db.heading.findUnique({
                where: {
                    id: +(id as string),
                },
            });

            if (!heading) {
                return res.status(404).json({ error: 'Heading not found' });
            }

            return res.status(200).json({ heading });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * 
     * @swagger
     * /api/heading/{id}:
     *   delete:
     *     summary: Delete heading
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID of the heading
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Heading deleted successfully
     *       404:
     *         description: Heading not found
     *       500:
     *         description: Internal Server Error
     *       401:
     *         description: Unauthorized
     *       405:
     *         description: Method Not Allowed
     */
    if (req.method === 'DELETE') {
        try {
            const deletedHeading = await db.heading.delete({
                where: {
                    id: +(id as string),
                },
            });

            return res.status(200).json({ message: 'Heading deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
