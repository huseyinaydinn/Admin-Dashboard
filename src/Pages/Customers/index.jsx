import { Avatar, Rate, Space, Table, Typography } from "antd";
import { getInventory, getOrders, getUSers } from "../../API";
import { useEffect, useState } from "react";

export default function Customers() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setLoading(true)
        getUSers().then(res => {
            return (
                setDataSource(res.users)
            )
        })
        setLoading(false)
    }, [])

    return (
        <Space size={20} direction="vertical" >
            <Typography.Title level={4}>
                Orders
            </Typography.Title>
            <Table
                loading={loading}
                columns={[{
                    title: "Photo",
                    dataIndex: "image",
                    render: (link) => {
                        return (
                            <Avatar src={link} />
                        )
                    }
                },
                {
                    title: "First Name",
                    dataIndex: "firstName"
                },

                {
                    title: "Last Name",
                    dataIndex: "lastName",
                },
                {
                    title: "E-mail",
                    dataIndex: "email",
                },
                {
                    title: "Phone",
                    dataIndex: "phone"
                },
                {
                    title: "Address",
                    dataIndex: "address",
                    render: (address) => <span>{address.address}, {address.city}</span>
                }]} dataSource={dataSource}
                pagination={{
                    pageSize: 8
                }}>

            </Table>
        </Space >
    )
}