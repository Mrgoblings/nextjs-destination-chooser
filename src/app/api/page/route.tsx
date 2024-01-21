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

            const newPages = pages.map((page) => {
                interface HeadingPosition {
                    [key: number]: any;
                }

                const latestHeadings = Object.values(
                    page.Heading.reduce((acc: HeadingPosition, heading) => {
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

                return newPage;
            });

            return res.status(200).json({ pages: newPages });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
