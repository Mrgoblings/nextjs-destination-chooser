import { NextRequest, NextResponse } from 'next/server';
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
 */
export async function PATCH(req: NextRequest) {
    const id = +(req.nextUrl.pathname.split('/').pop() + "");


    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { headingData } = await req.json();

    try {
        const updatedHeading = await db.heading.update({
            where: {
                id: id,
            },
            data: {
                // Update heading information logic here
                // ...
                ...headingData,
            },
        });

        return NextResponse.json({ message: 'Heading information updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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
 *         description: No Headings found
 *       500:
 *         description: Internal Server Error
 */
export async function GET(req: NextRequest) {
    const id = +(req.nextUrl.pathname.split('/').pop() + "");

    try {
        const heading = await db.heading.findUnique({
            where: {
                id,
            },
        });

        if (!heading) {
            return NextResponse.json({ error: 'No Headings found' }, { status: 404 });
        }

        return NextResponse.json({ heading }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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
 */
export async function DELETE(req: NextRequest) {
    const id = +(req.nextUrl.pathname.split('/').pop() + "");
    
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const deletedHeading = await db.heading.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ message: 'Heading deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
