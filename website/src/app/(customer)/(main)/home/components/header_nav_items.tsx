'use client'
import * as React from "react"
import Link from "next/link"

import {cn} from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string; progress: string }[] = [
    {
        title: "JavaScript Cơ Bản",
        href: "/courses/javascript-basic",
        description: "Khóa học nhập môn JavaScript, giúp bạn nắm vững các khái niệm cơ bản.",
        progress: "5/20 bài",
    },
    {
        title: "ReactJS Từ Cơ Bản Đến Nâng Cao",
        href: "/courses/reactjs",
        description: "Học cách xây dựng ứng dụng web hiện đại với ReactJS.",
        progress: "8/30 bài",
    },
    {
        title: "Lập Trình Node.js",
        href: "/courses/nodejs",
        description: "Xây dựng backend mạnh mẽ với Node.js và Express.",
        progress: "3/25 bài",
    },
    {
        title: "Python Cho Người Mới Bắt Đầu",
        href: "/courses/python-basic",
        description: "Lập trình Python từ cơ bản đến thực hành với dự án thực tế.",
        progress: "6/15 bài",
    },
    {
        title: "Lập Trình Mobile Với React Native",
        href: "/courses/react-native",
        description: "Tạo ứng dụng mobile đa nền tảng với React Native.",
        progress: "2/20 bài",
    },
    {
        title: "Cấu Trúc Dữ Liệu & Giải Thuật",
        href: "/courses/data-structure-algorithms",
        description: "Nâng cao tư duy lập trình với thuật toán và cấu trúc dữ liệu.",
        progress: "10/50 bài",
    },
    {
        title: "Lập Trình Fullstack Với MERN Stack",
        href: "/courses/mern-stack",
        description: "Phát triển ứng dụng web hoàn chỉnh với MongoDB, Express, React và Node.js.",
        progress: "4/40 bài",
    },
    {
        title: "Kỹ Thuật Lập Trình Hướng Đối Tượng (OOP)",
        href: "/courses/oop",
        description: "Hiểu và áp dụng lập trình hướng đối tượng trong thực tế.",
        progress: "7/25 bài",
    },
    {
        title: "Lập Trình Với TypeScript",
        href: "/courses/typescript",
        description: "Tìm hiểu TypeScript và cách sử dụng trong các dự án lớn.",
        progress: "3/18 bài",
    },
    {
        title: "Phát Triển API Với Laravel",
        href: "/courses/laravel-api",
        description: "Xây dựng RESTful API mạnh mẽ với Laravel.",
        progress: "6/22 bài",
    },
    {
        title: "Lập Trình IoT Với ESP32",
        href: "/courses/iot-esp32",
        description: "Xây dựng hệ thống IoT thông minh với ESP32 và giao tiếp với web server.",
        progress: "2/15 bài",
    },
    {
        title: "Machine Learning Cơ Bản",
        href: "/courses/machine-learning",
        description: "Giới thiệu về Machine Learning và cách xây dựng mô hình AI.",
        progress: "5/30 bài",
    },
];


const HeaderNavItems = () => {
    return (
        <NavigationMenu className={'px-4'}>
            <NavigationMenuList>
                <NavigationMenuItem style={{position: "relative"}}>
                    <NavigationMenuTrigger>Khoá học nổi bật</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="space-y-3 p-6 md:w-[400px] lg:w-[400px]">
                            <ListItem href="#" title="ReactJS">
                                Một thư viện JavaScript phổ biến được phát triển bởi Facebook, cho phép xây dựng
                                giao diện người dùng tương tác và hiệu quả.
                            </ListItem>
                            <ListItem href="#" title="NextJS 15">
                                Một framework mạnh mẽ cho React, cung cấp khả năng render phía server (SSR) và tạo
                                trang tĩnh (SSG).
                            </ListItem>
                            <ListItem href="#" title="Laravel">
                                Một framework PHP mã nguồn mở, nổi tiếng với cú pháp rõ ràng và dễ sử dụng. Laravel
                                cung cấp nhiều tính năng mạnh mẽ như ORM Eloquent, routing, middleware và hệ thống
                                bảo mật, giúp phát triển ứng dụng web nhanh chóng và hiệu quả.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Khoá học của bạn</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default HeaderNavItems