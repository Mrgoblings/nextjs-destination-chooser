import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/lib/db";
import { getSession } from '../../../actions';

/**
 * 
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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PageData'
 *     responses:
 *       200:
 *         description: Page information updated successfully
 *       404:
 *         description: Page not found
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
        const { pageData } = req.body;

        try {
            const updatedPage = await db.page.update({
                where: {
                    id: +(id as string),
                },
                data: {
                    // Update page information logic here
                    // ...
                    ...pageData,
                },
            });

            return res.status(200).json({ message: 'Page information updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * 
     * @swagger
     * /api/page/{id}:
     *   get:
     *     summary: Get page information
     *     description: Returns the page and its adjacent information.
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID of the page
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Page information retrieved successfully
     *       404:
     *         description: Page not found
     *       500:
     *         description: Internal Server Error
     *       401:
     *         description: Unauthorized
     *       405:
     *         description: Method Not Allowed
     */
    if (req.method === 'GET') {
        try {
            const page = await db.page.findUnique({
                where: {
                    id: +(id as string),
                },
                include: {
                    Title: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        take: 1
                    },
                    Heading: {
                        orderBy: {
                            position: 'asc',
                            createdAt: 'desc'
                        },
                        distinct: ['position'],
                        include: {
                            BodyContent: {
                                orderBy: {
                                    createdAt: 'desc'
                                },
                                take: 1
                            }
                        }
                    },
                },
            });

            if (!page) {
                return res.status(404).json({ error: 'Page not found' });
            }

            interface HeadingPosition {
                [key: number]: any;
            }

            const latestHeadings = Object.values(
                page.Heading.reduce((acc: HeadingPosition, heading: { position: number; createdAt: string | number | Date; }) => {
                    if (!acc[heading.position] || new Date(heading.createdAt) > new Date(acc[heading.position].createdAt)) {
                        acc[heading.position] = heading;
                    }
                    return acc;
                }, {})
            );

            const newPage = {
                ...page,
                Heading: latestHeadings,
            };

            return res.status(200).json({ page: newPage });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * 
     * @swagger
     * /api/page/{id}:
     *   delete:
     *     summary: Delete page
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID of the page
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Page deleted successfully
     *       404:
     *         description: Page not found
     *       500:
     *         description: Internal Server Error
     *       401:
     *         description: Unauthorized
     *       405:
     *         description: Method Not Allowed
     */
    if (req.method === 'DELETE') {
        try {
            const deletedPage = await db.page.delete({
                where: {
                    id: +(id as string),
                },
            });

            return res.status(200).json({ message: 'Page deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
