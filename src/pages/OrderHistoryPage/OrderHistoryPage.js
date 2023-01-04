import { useState, useEffect } from 'react'
import sendRequest from '../../utilities/send-request'

export default function OrderHistoryPage(props){
    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        try {
            const response = await sendRequest('/api/orders/history')
            // const response = await fetch('/api/orders/cart')
            const data = await response
            console.log("History:",data);
            setOrders(data)
        } catch (error) {
            console.error(error)
        }
    }
    const deleteOrder = async (orderId) => {
        try {
            const response = await sendRequest(`/api/orders/history/${orderId}`,"DELETE")
            // const response = await fetch('/api/orders/cart')
            const data = await response
            console.log("History:",data);
            setOrders(data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=> {
        console.log("Effect Triggered");
        getOrders()
//        console.log("Effect Triggered OVER");
    }, [])

    return (<>
        {
            orders && orders.length>0 ? (<><div><hr/>
                {
                    orders.map((order)=>{
                        return (<>
                            Ordered on {(new Date(order.createdAt)).toString()}<br/>
                            {
                                order.lineItems.map(lineItem=>{
                                    let item = lineItem.item
                                    return (
                                        <li key={item._id} style={{listStyle: "none",
                                            marginLeft: 0,
                                            paddingLeft: "0",
                                            textIndent: "0"}}>
                                            {lineItem ? (`${lineItem.qty}-`) :""  }
            
                                            {item.emoji ? item.emoji:"❓"}:{item.name} ${item.price} {item.size}
                                        </li>
                                    )
                                    
                                })
                            }
                            <button onClick={() => deleteOrder(order._id)}>Delete This Order</button>
                            <hr/>

                        </>)
                    })
                    
                }
            </div></>): <h1>No Orders</h1>
        }
        </>
    )
}

/*
                {
                    orders.map((order)=>{
                        return (<>
                            {
                            order.lineItems.map((lineItem) => {
                            let item = lineItem.item
                            return (
                                <li key={item._id} style={{listStyle: "none",
                                    marginLeft: 0,
                                    paddingLeft: "0",
                                    textIndent: "0"}}>
                                    {lineItem ? (`${lineItem.qty}-`) :""  }
    
                                    {item.emoji ? item.emoji:"❓"}:{item.name} ${item.price} {item.size}
                                </li>
                            )
                            }
                        })
                        </>)

                    })
                    
                }
*/