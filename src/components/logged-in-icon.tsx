"use client";
import { useEffect, useState } from 'react';
import UserAvatar from "./ui/user-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Session } from "next-auth";
import { getAuthSession } from '@/lib/auth';


export default function LoggedInIcon() {
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        getAuthSession().then(fetchedSession => {
            setSession(fetchedSession);
        });
    }, []);

    return <>
            {session ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <UserAvatar className="mx-3" user={{
                            name: session?.user?.name || "",
                            image: session?.user?.image || "",
                        }}
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuItem>
                            Log out
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                ) : ""
            }
    </>;
}
