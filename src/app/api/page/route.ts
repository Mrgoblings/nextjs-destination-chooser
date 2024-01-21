import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/lib/db";

/**
 * 
 * @swagger
 * /api/page:
 *   get:
 *     summary: Get all pages
 *     description: Returns all pages and their adjacent information.
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
 */
export default async function GET(req: NextRequest) {
    const MAX_DEFAULT_LIMIT = 20;

    try {
        const { limit } = await req.json();
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

        const newPages = pages.map((page: { Heading: any[]; }) => {
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

            return newPage;
        });

        if (newPages.length === 0) {
            return NextResponse.json({ error: 'No Headings found' }, { status: 404 });
        }

        return NextResponse.json({ pages: newPages }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
