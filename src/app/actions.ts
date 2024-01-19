'use server'

import { getAuthSession } from "@/lib/auth";
import { Session } from "inspector";

 
export async function getSession() {
    return await getAuthSession();
}