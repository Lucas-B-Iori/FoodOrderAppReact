export async function getMeals() {
    const response = await fetch("http://localhost:3000/meals")
    const data = await response.json()
    return data
}

export async function postOrders(data) {
    const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}