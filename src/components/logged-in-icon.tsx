"use server";
import UserAvatar from "./ui/user-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAuthSession } from "@/lib/auth";

export default async function LoggedInIcon() {
    const session = await getAuthSession();  
        return <>
                {session ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <UserAvatar user={{
                                name: session.user?.name || "",
                                image: session.user?.image || "",
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
                    ) : 0
                }
        </>;
}
