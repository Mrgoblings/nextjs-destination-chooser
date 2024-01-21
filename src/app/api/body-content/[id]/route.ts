import { db } from "@/lib/db";
import { getSession } from '../../../actions';
import { NextRequest, NextResponse } from "next/server";

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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
export async function GET(req: NextRequest) {
    const id = +(req.nextUrl.pathname.split('/').pop() + "");

    try {
        const bodyContent = await db.bodyContent.findUnique({
            where: {
                id: id,
            },
        });

        if (!bodyContent) {
            return NextResponse.json({ error: 'BodyContent not found' }, { status: 404 });
        }

        return NextResponse.json({ bodyContent }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BodyContentData'
 *     responses:
 *       200:
 *         description: Body content information updated successfully
 *       500:
 *         description: Internal Server Error
 */
export async function PATCH(req: NextRequest) {
    const id = +(req.nextUrl.pathname.split('/').pop() + "");

    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { bodyContentData } = await req.json();

    try {
        const updatedBodyContent = await db.bodyContent.update({
            where: {
                id: id,
            },
            data: {
                // Update body content information logic here
                // ...
                ...bodyContentData,
            },
        });

        return NextResponse.json({ message: 'BodyContent information updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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
 *       500:
 *         description: Internal Server Error
 */
export async function DELETE(req: NextRequest) {
    const id = +(req.nextUrl.pathname.split('/').pop() + "");

    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

    try {
        const deletedBodyContent = await db.bodyContent.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ message: 'BodyContent deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
