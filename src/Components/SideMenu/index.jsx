import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

export default function SideMenu() {
    const navigate = useNavigate()
    return (
        <div className="SideMenu">
            <Menu
                className="SideMenuVertical"
                mode="vertical"
                onClick={(item) => {
                    //item.key
                    navigate(item.key);
                }} items={[{
                    label: "Dashboard",
                    icon: <AppstoreOutlined />,
                    key: "/"
                },
                {
                    label: "Invertory",
                    icon: <ShopOutlined />,
                    key: "/inventory"
                },
                {
                    label: "Orders",
                    icon: <ShoppingCartOutlined />,
                    key: "/orders"
                },
                {
                    label: "Customers",
                    icon: <UserOutlined />,
                    key: "/customers"
                }
                ]}>

            </Menu>
        </div >
    )
}