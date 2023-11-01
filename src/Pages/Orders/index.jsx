import { Avatar, Rate, Space, Table, Typography } from "antd";
import { getInventory, getOrders } from "../../API";
import { useEffect, useState } from "react";

export default function Orders() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setLoading(true)
        getOrders().then(res => {
            return (
                setDataSource(res.products)
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
                    title: "title",
                    dataIndex: "title"
                },
                {
                    title: "Price",
                    dataIndex: "price",
                    render: (value) => <span>$ {value}</span>
                },

                {
                    title: "Quantity",
                    dataIndex: "quantity",
                },
                {
                    title: "Total",
                    dataIndex: "total",
                },
                {
                    title: "Discounted Price",
                    dataIndex: "discountedPrice",
                    render: (discount) => {
                        return (
                            <span>$ {discount}</span>
                        )
                    }
                }]} dataSource={dataSource}
                pagination={{
                    pageSize: 8
                }}>

            </Table>
        </Space >
    )
}