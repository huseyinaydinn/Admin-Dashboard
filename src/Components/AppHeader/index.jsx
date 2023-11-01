import { Badge, Drawer, List, Space, Typography } from "antd"
import { BellFilled, MailOutlined } from '@ant-design/icons'
import Logo from '../../img/logo.svg'
import { useEffect, useState } from "react"
import { getComment, getOrders } from "../../API"

export default function AppHeader() {
    const [comments, setComments] = useState([])
    const [notifications, setNotifications] = useState([])
    const [commentsOpen, setCommentsOpen] = useState(false)
    const [notificationsOpen, setNotificationsOpen] = useState(false)
    useEffect(() => {
        getComment().then(res => {
            setComments(res.comments)
        })
        getOrders().then(res => {
            setNotifications(res.products)
        })
    }, [])
    return (
        <div className="AppHeader">
            <a href="/"><img src={Logo} width={40} /></a>
            <Typography.Title>My Dashboard</Typography.Title>
            <Space>
                <Badge count={comments.length} dot>
                    <MailOutlined style={{ fontSize: 24 }} onClick={() => {
                        setCommentsOpen(true)
                    }} />
                </Badge>
                <Badge count={notifications.length}>
                    <BellFilled style={{ fontSize: 24 }} onClick={() => {
                        setNotificationsOpen(true)
                    }} />
                </Badge>
            </Space>

            <Drawer title='Comments' open={commentsOpen} onClose={() => {
                setCommentsOpen(false)
            }} maskClosable>
                <List dataSource={comments} renderItem={(item) => {
                    return (
                        <List.Item>{item.body}</List.Item>
                    )
                }}></List>
            </Drawer>
            <Drawer title='Notifications' open={notificationsOpen} onClose={() => {
                setNotificationsOpen(false)
            }} maskClosable>
                <List dataSource={notifications} renderItem={(item) => {
                    return (
                        <List.Item><Typography.Text strong>{item.title}</Typography.Text> has been ordered !</List.Item>
                    )
                }}></List>
            </Drawer>
        </div>
    )
}