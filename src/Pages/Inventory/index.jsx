import { Avatar, Rate, Space, Table, Typography } from "antd";
import { getInventory } from "../../API";
import { useEffect, useState } from "react";

export default function Inventory() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setLoading(true)
        getInventory().then(res => {
            return (
                setDataSource(res.products)
            )
        })
        setLoading(false)
    }, [])

    return (
        <Space size={20} direction="vertical" >
            <Typography.Title level={4}>
                Inventory
            </Typography.Title>
            <Table
                loading={loading}
                columns={[

                    {
                        title: "Thumbnail",
                        dataIndex: "thumbnail",
                        render: (link) => {
                            return <Avatar src={link} />
                        }
                    }, {
                        title: "title",
                        dataIndex: "title"
                    },
                    {
                        title: "Price",
                        dataIndex: "price",
                        render: (value) => <span>$ {value}</span>
                    },

                    {
                        title: "Stock",
                        dataIndex: "stock",
                    },
                    {
                        title: "Brand",
                        dataIndex: "brand",
                    },
                    {
                        title: "Category",
                        dataIndex: "category"
                    }, {
                        title: "Rating",
                        dataIndex: "rating",
                        render(rating) {
                            return (
                                <Rate value={rating} allowHalf disabled />
                            );
                        }
                    },]} dataSource={dataSource}
                pagination={{
                    pageSize: 8
                }}>

            </Table>
        </Space >
    )
}