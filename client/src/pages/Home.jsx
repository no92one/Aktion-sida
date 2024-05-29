import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import getAllProducts from "../services/products/getAllProducts.jsx"

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const { response, result } = await getAllProducts()

      if (result.length > 0) {
        setProducts(result)
      } else {
        console.log(response.status, response.message);
      }
    }

    getProducts()
  }, [])

  return <>
    <h1 className="">Auktion sida</h1>
    {products.length == 0 ? <h2>Inga produkter tillgängliga</h2> :
      <section className="grid grid-cols-3 gap-5">
        {
          products.map(item => {
            return <Link to={`product/${item._id}`} className="bg-blue-300 p-2 rounded-lg shadow-custom flex flex-col justify-between" key={item._id}>
              <p className="text-lg text-center">{item.name}</p>
              <img className="" src={item.images[0]} alt="Bild" />
              <div>
                <p>Start bud: {item.startBid}</p>
                <p>Nuvarande bud: {item.activeBid.amount}</p>
                <p>Slut tid: {item.endTime.split()}</p>
              </div>
            </Link>
          })
        }
      </section>
    }

  </>
}

