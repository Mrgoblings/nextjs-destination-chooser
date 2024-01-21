import { NextRequest, NextResponse } from 'next/server';
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
 */
export async function PATCH(req: NextRequest) {
    const id = +(req.nextUrl.pathname.split('/').pop() + "");

    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { titleData } = await req.json();

    try {
        const updatedTitle = await db.title.update({
            where: {
                id,
            },
            data: {
                // Update title information logic here
                // ...
                ...titleData,
            },
        });

        return NextResponse.json({ message: 'Title information updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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
 */

export async function GET(req: NextRequest) {
    const id = +(req.nextUrl.pathname.split('/').pop() + "");

    try {
        const title = await db.title.findUnique({
            where: {
                id,
            },
        });

        if (!title) {
            return NextResponse.json({ error: 'Title not found' }, { status: 404 });
        }

        return NextResponse.json({ title }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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
 */

export async function DELETE(req: NextRequest) {
    const id = +(req.nextUrl.pathname.split('/').pop() + "");

    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const deletedTitle = await db.title.delete({
            where: {
                id,
            },
        });

        return NextResponse.json({ message: 'Title deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
