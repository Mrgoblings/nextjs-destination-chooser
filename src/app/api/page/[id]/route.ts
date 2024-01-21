import { NextRequest, NextResponse } from 'next/server';
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
 */
export async function PATCH(req: NextRequest) {
    const id = +(req.nextUrl.pathname.split('/').pop() + "");

    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pageData } = await req.json();

    try {
        const updatedPage = await db.page.update({
            where: {
                id,
            },
            data: {
                // Update page information logic here
                // ...
                ...pageData,
            },
        });

        return NextResponse.json({ message: 'Page information updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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
 */
export async function GET(req: NextRequest) {
    const id = +(req.nextUrl.pathname.split('/').pop() + "");

    try {
        const page = await db.page.findUnique({
            where: {
                id,
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
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
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

        return NextResponse.json({ page: newPage }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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
 */
export async function DELETE(req: NextRequest) {
    const id = +(req.nextUrl.pathname.split('/').pop() + "");

    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const deletedPage = await db.page.delete({
            where: {
                id,
            },
        });

        return NextResponse.json({ message: 'Page deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

