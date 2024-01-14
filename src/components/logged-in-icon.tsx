"use client";
import { useSession } from 'next-auth/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from './ui/user-avatar';

export default function LoggedInIcon() {
    const { data: session, status } = useSession();

    if (status !== "authenticated") return null;

    return (
        <>
            {session && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <UserAvatar className="mx-3" user={{
                            name: session.user?.name || "",
                            image: session.user?.image || "",
                        }} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuItem>
                            Log out
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    );
}
