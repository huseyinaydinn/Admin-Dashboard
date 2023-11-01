export const getOrders = async () => {
    return (
        await fetch('https://dummyjson.com/carts/1')
            .then(res => res.json())
    )
}

export const getRevenue = async () => {
    return (
        await fetch('https://dummyjson.com/carts')
            .then(res => res.json())
    )
}

export const getInventory = async () => {
    return (
        await fetch('https://dummyjson.com/products')
            .then(res => res.json())
    )
}

export const getUSers = async () => {
    return (
        await fetch('https://dummyjson.com/users')
            .then(res => res.json())
    )
}

export const getComment = async () => {
    return (
        fetch('https://dummyjson.com/comments')
            .then(res => res.json())
    )
}