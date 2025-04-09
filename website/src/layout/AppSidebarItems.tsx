import { FiGrid, FiBook, FiPieChart, FiCpu } from "react-icons/fi"
import { FaUserCircle, FaUserShield } from "react-icons/fa"
import { BiReceipt } from 'react-icons/bi'

export const AdminSidebarItems = [
    {icon: <FiGrid size={25}/>, name: "Dashboard", path: "/admin/dashboard"},
    {
        name: "Người dùng",
        icon: <FaUserCircle size={25}/>,
        subItems: [
            {name: "Quản trị", path: "/admin/members?type=0"},
            {name: "Nhân viên", path: "/admin/members?type=1"},
            {name: "Giảng viên", path: "/admin/members?type=2"},
            {name: "Học viên", path: "/admin/members?type=3"},
        ],
    },
    {
        name: "Phân quyền",
        icon: <FaUserShield size={25}/>,
        path: "#"
    },
    {
        name: "Khoá học",
        icon: <FiBook size={25}/>,
        path: "#",
    },
    {
        name: "Hoá đơn",
        icon: <BiReceipt size={25}/>,
        path: "#"
    },
];

export const UserSidebarItems = [
    {icon: <FiPieChart size={25}/>, name: "Charts", path: "/product/charts"},
    {icon: <FiCpu size={25}/>, name: "Plugins", path: "/product/plugins"},
    {
        name: "UI Elements",
        icon: <FiCpu size={25}/>,
        subItems: [
            {name: "Alerts", path: "/product/alerts"},
            {name: "Avatar", path: "/product/avatars"},
        ],
    },
];
