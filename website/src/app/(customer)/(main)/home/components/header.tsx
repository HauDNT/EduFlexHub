import HeaderNavItems from "@/app/(customer)/(main)/home/components/header_nav_items";
import HeaderAvatar from "@/app/(customer)/(main)/home/components/header_avatar";

const Header = () => {
    return (
        <header className="flex justify-between p-4 shadow-md">
            <h1 className="flex items-center text-xl text-gray-800 font-semibold">
                <span className="text-blue-600">Edu</span>FlexHub
            </h1>
            <nav>
                <div className="flex gap-4">
                    <HeaderNavItems/>
                    <HeaderAvatar/>
                </div>
            </nav>
        </header>
    )
}

export default Header