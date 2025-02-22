'use client'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
    CreditCard,
    ShoppingCart,
    Heart,
    BookmarkCheck,
    BookOpen,
    LifeBuoy,
    LogOut,
    Settings,
    User,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const HeaderAvatar = ({uri}: { uri?: string }) => {
    const defaultAvatar = "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-5502.jpg?w=740";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src={uri || defaultAvatar} alt="User Avatar"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Tuỳ chọn</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User/>
                        <span>Tài khoản</span>
                        {/*<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>*/}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ShoppingCart/>
                        <span>Giỏ hàng của bạn</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCard/>
                        <span>Lịch sử mua hàng</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <BookOpen/>
                            <span>Khoá học</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <Heart/>
                                    <span>Yêu thích</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <BookmarkCheck/>
                                    <span>Đã lưu</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <LifeBuoy/>
                    <span>Hỗ trợ</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings/>
                    <span>Cài đặt</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <LogOut/>
                    <span>Đăng xuất</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default HeaderAvatar