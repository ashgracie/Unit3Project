import sendRequest from '../../utilities/send-request'


/*
Create
Read (Index & Show)
Update
Destroy
*/
import { useState, useEffect } from 'react'
//import { checkout } from '../../../routes/api/orders'


export default function NewOrderPage (props){
    const [orders, setOrders] = useState(null)
    const [items, setItems] = useState([])
    const [foundOrder, setFoundOrder] = useState(null) //create, update, delete
    const [foundItems, setFoundItems] = useState(null)
    const [newOrder, setNewOrder] = useState({
        name: '',
        readyToEat: false,
        color: ''
    })
    // index Items
    const getItems = async () => {
        try {
            const response = await sendRequest('/api/items')
            // const response = await fetch('/api/orders/cart')
            const data = await response
            console.log("Items",data);
            setItems(data)
        } catch (error) {
            console.error(error)
        }
    }
    // index
    const getOrders = async () => {
        try {
            const response = await sendRequest('/api/orders/cart')
            // const response = await fetch('/api/orders/cart')
            const data = await response
            console.log("Orders:",orders);
            setOrders(data)
        } catch (error) {
            console.error(error)
        }
    }
    const addItemToOrder= async (itemId) => {
        try {
            const response = await sendRequest(`/api/orders/cart/items/${itemId}`, "POST")
            // const response = await fetch('/api/orders/cart')
            const data = await response
            console.log("item added to cart ", itemId);
            getOrders()
        } catch (error) {
            console.error(error)
        }
    }
    const deleteItemFromOrder= async (itemId) => {
        try {
            const response = await sendRequest(`/api/orders/cart/items/delete/${itemId}`, "POST")
            // const response = await fetch('/api/orders/cart')
            const data = await response
            console.log("item added to cart ", itemId);
            getOrders()
        } catch (error) {
            console.error(error)
        }
    }
    const setItemQtyForOrder = async (itemId) => {
        let num = prompt("Please enter the new Quantity")
        num = parseInt(num)
        if (isNaN(num)) {
            alert("Please enter a number when setting the quantity!")
            return
        }
        Math.abs(num)
        num = Math.abs(num)
        try {
            const response = await sendRequest(`/api/orders/cart/qty`, "PUT", {itemId:itemId, newQty:num})
            // const response = await fetch('/api/orders/cart')
            const data = await response
            console.log("new qty set to ", num);
            getOrders()
        } catch (error) {
            console.error(error)
        }
    }
    //chekcout
    const checkout = async (itemId) => {
        try {
            const response = await sendRequest(`/api/orders/cart/checkout`, "POST")
            // const response = await fetch('/api/orders/cart')
            const data = await response
            console.log("checkout");
            getOrders()
        } catch (error) {
            console.error(error)
        }
    }
    // delete
    const deleteOrder = async (id) => {
        try {
            const response = await sendRequest(`/api/orders/${id}`,"DELETE")
            /*const response = await fetch(`/api/orders/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })*/
            const data = await response
            setFoundOrder(data)
        } catch (error) {
            console.error(error)
        }
    }
    // update
    const updateOrder = async (id, updatedData) => {
        try {
            const response = await sendRequest(`/api/orders/${id}`,"PUT")

            /*const response = await fetch(`/api/orders/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...updatedData})
            })*/
            const data = await response
            setFoundOrder(data)
        } catch (error) {
            console.error(error)
        }
    }
    // create
        const createOrder = async () => {
            try {
                const response = await sendRequest(`/api/orders/`,"POST",newOrder)

                /*const response = await fetch(`/api/orders`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...newOrder})
                })*/
                const data = await response
                setFoundOrder(data)
                setNewOrder({
                    name: '',
                    readyToEat: false,
                    color: ''
                })
            } catch (error) {
                console.error(error)
            }
        }

    const handleChange = (evt) => {
        setNewOrder({...newOrder, [evt.target.name]: evt.target.value})
    }
    useEffect(()=> {
        console.log("Effect Triggered");
        getOrders()
        getItems()
//        console.log("Effect Triggered OVER");
    }, [foundOrder,foundItems])

    let currentCategory = "";
    function checkCategory(cat){
//        console.log(cat)
        if(cat != currentCategory){
            currentCategory = cat
            return true
        }
        return false
    }
    function checkOrders(){
        return orders
    }
    return (
        <>
            {
                checkOrders() ? (<><ul>
                    {
                        orders.lineItems.map((lineItem) => {
                            return (
                                <ItemComponent item={lineItem.item} delete={true} lineItem={lineItem}></ItemComponent>
                            )
                        })
                    }
                </ul><div>Total: ${orders.orderTotal.toFixed(2)} <br/>How many Items: {orders.totalQty}</div><button onClick={() => checkout()}>Checkout</button></>): <h1>No Orders</h1>
            }
            <hr/>
            {items && items.length ? (<ul>
                    {
                        items.sort((itemA,itemB)=>{
                            return itemA.category.sortOrder<itemB.category.sortOrder
                        }).map((item) => {
                            return (
                                <>
                                {checkCategory(item.category.name) ? (<h4 style={{textIndent:"-1em"}}>{item.category.name}</h4>):""}
                                <ItemComponent item={item} add={true}></ItemComponent>
                                </>
                            )
                        })
                    }
                </ul>): <h1>No Items Add one to the Database</h1>
            }

        </>
    )
    function ItemComponent(props) {
        let item = props.item
        let lineItem = props.lineItem
        return (<>
        
        <li key={item._id} style={{listStyle: "none",
            marginLeft: 0,
            paddingLeft: "0",
            textIndent: "0"}}>
            {lineItem ? (`${lineItem.qty}-`) :""  }

            {item.emoji ? item.emoji:"❓"}:{item.name} ${item.price} {item.size}
            {props.add || true ? <button style={{paddingLeft:".75em",paddingRight:".75em"}} onClick={() => addItemToOrder(item._id)}>+</button>:""}
            {props.delete ? <button onClick={() => deleteItemFromOrder(item._id)}>—</button>:""}
            {props.delete ? <button onClick={() => setItemQtyForOrder(item._id)}>Set</button>:""}
        </li>
        
        </>);
    }
}
