import dbF from "../src/firebase"
import React, { useEffect, useState } from "react"

import "../styles/PlanScreen.module.css"

function PlanScreen() {
    const [products, setProduct] = useState([])

    useEffect(() => {
        dbF.collection('products')
            .where('active', '==', true)
            .get()
            .then((querySnapshot) => {
                const products = {}
                querySnapshot.forEach(async productDoc => {
                    products[productDoc.id] = productDoc.data()
                    const priceSnap = await productDoc.ref.collection
                    ('prices').get()
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        }
                    })
                })
                setProducts(products)
            })
    }, [])

    console.log(products)

    return (
        <div className="planScreen">

        </div>
    )
}

export default PlanScreen