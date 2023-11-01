import { Card, Space, Statistic, Table, Typography } from "antd";
import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getInventory, getOrders, getRevenue, getUSers } from "../../API";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function Dashboard() {
    const [orders, setOrders] = useState(0)
    const [inventory, setInventory] = useState(0)
    const [customers, setCustomers] = useState(0)
    const [revenue, setRevenue] = useState(0)

    useEffect(() => {
        getOrders().then(res => {
            setOrders(res.total)
            setRevenue(res.discountedTotal)
        });
        getInventory().then(res => {
            setInventory(res.total)
        });
        getUSers().then(res => {
            setCustomers(res.total)
        })
    }, [])
    return (
        <Space direction="vertical" size={20}>
            <Typography.Title level={4}>
                Dashboard
            </Typography.Title>
            <Space direction="horizontal">
                <DashboardCard icon={<ShoppingCartOutlined style={{ color: 'green', backgroundColor: 'rgba(0,255,0,0.25)', borderRadius: 20, fontSize: 24, padding: 8 }} />} title='Orders' value={orders} />
                <DashboardCard icon={<ShoppingOutlined style={{ color: 'blue', backgroundColor: 'rgba(0,0,255,0.25)', borderRadius: 20, fontSize: 24, padding: 8 }} />} title='Inventory' value={inventory} />
                <DashboardCard icon={<UserOutlined style={{ color: 'purple', backgroundColor: 'rgba(0,255,255,0.25)', borderRadius: 20, fontSize: 24, padding: 8 }} />} title='Customer' value={customers} />
                <DashboardCard icon={<DollarCircleOutlined style={{ color: 'red', backgroundColor: 'rgba(255,0,0,0.25)', borderRadius: 20, fontSize: 24, padding: 8 }} />} title='Revenue' value={revenue} />
            </Space>
            <Space style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                <RecentOrders />
                <DashboardChart />
            </Space>
        </Space>
    )
}

function DashboardCard({ title, value, icon }) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    )
}

function RecentOrders() {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getOrders().then(res => {
            setDataSource(res.products.splice(0, 3))
        })
        setLoading(false)
    })
    return (
        <>
            <Typography.Title level={5}>Recent Orders</Typography.Title>
            <Table columns={[{
                title: 'Title',
                dataIndex: 'title',
                key: 'id',
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'id',
            },
            {
                title: 'DiscountedPrice',
                dataIndex: 'discountedPrice',
                key: 'id',
            }]}
                dataSource={dataSource}
                loading={loading}
                pagination={false}

            ></Table>
        </>
    )
}

function DashboardChart() {
    const [revenueData, setRevenueData] = useState({
        labels: [],
        datasets: []
    })
    useEffect(() => {
        getRevenue().then(res => {
            const labels = res.carts.map(cart => {
                return `User-${cart.userId}`
            })
            const data = res.carts.map(cart => {
                return cart.discountedTotal
            })

            const dataSource = {
                labels,
                datasets: [
                    {
                        label: 'Revenue',
                        data: data,
                        backgroundColor: 'rgba(255, 0, 0, 1)',
                    }
                ],
            };
            setRevenueData(dataSource)
        })
    }, [])
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Order Revenue',
            },
        },
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    return (
        <Card style={{ width: 500, height: 250 }}>
            <Bar options={options} data={revenueData} />
        </Card>
    )
}
