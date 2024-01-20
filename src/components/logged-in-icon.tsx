import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from './ui/user-avatar';
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default async function LoggedInIcon() {
    const session = await getAuthSession();

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
                    <Link href="/api/auth/signout">
                        <DropdownMenuItem>
                            <LogOut className="w-4 h-4 mr-3" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    );
}
