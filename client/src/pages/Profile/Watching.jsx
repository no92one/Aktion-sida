import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../contexts/Globalcontext.jsx"

export default function Watching() {
  const { user } = useContext(GlobalContext)
  const [productsList, setProductsList] = useState([])

  useEffect(() => {
    console.log(user);
    const getProducts = async () => {
      await user.watching.map(async (productId) => {
        const response = await fetch(`/api/products/${productId}`)

        if (response.ok) {
          const result = await response.json()
          console.log("result - ", result)
          setProductsList(...productsList, result)
        }
      })
    }

    getProducts()
  }, [])
  return <>
    {
      productsList.length < 1 ?
        <h2>Följer inga</h2>
        :
        <h2>Följer {productsList.length}</h2>
    }
  </>
}
