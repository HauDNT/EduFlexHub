import {
    GridIcon,
    CalenderIcon,
    UserCircleIcon,
    ListIcon,
    TableIcon,
    PageIcon,
    PieChartIcon,
    PlugInIcon,
} from "@/assets/icons";

export const AdminSidebarItems = [
    {icon: <GridIcon/>, name: "Dashboard", path: "/admin"},
    {icon: <CalenderIcon/>, name: "Calendar", path: "/admin/calendar"},
    {icon: <UserCircleIcon/>, name: "User Profile", path: "/admin/profile"},
    {
        name: "Forms",
        icon: <ListIcon/>,
        subItems: [{name: "Form Elements", path: "/admin/form-elements"}],
    },
    {
        name: "Tables",
        icon: <TableIcon/>,
        subItems: [{name: "Basic Tables", path: "/admin/basic-tables"}],
    },
    {
        name: "Pages",
        icon: <PageIcon/>,
        subItems: [
            {name: "Blank Page", path: "/admin/blank"},
            {name: "404 Error", path: "/admin/error-404"},
        ],
    },
];

export const UserSidebarItems = [
    {icon: <PieChartIcon/>, name: "Charts", path: "/product/charts"},
    {icon: <PlugInIcon/>, name: "Plugins", path: "/product/plugins"},
    {
        name: "UI Elements",
        icon: <PlugInIcon/>,
        subItems: [
            {name: "Alerts", path: "/product/alerts"},
            {name: "Avatar", path: "/product/avatars"},
        ],
    },
];
