import { useContext, useEffect, useState } from "react"
import { Link, useLoaderData } from "react-router-dom"
import { GlobalContext } from "../contexts/Globalcontext.jsx"
import FollowSVG from "/Follow.svg"
import UnfollowSVG from "/Unfollow.svg"
import getDateAndTime from "../utils/getDateAndTime.jsx"
import bidOnProduct from "../services/products/bidOnProduct.jsx"
import watchProduct from "../services/products/watchProduct.jsx"
import getUserInfo from "../services/users/getUserInfo.jsx"

export default function ProductPage() {
  const [product, setProduct] = useState(useLoaderData())
  const [watching, setWatching] = useState(null)
  const [newBid, setNewBid] = useState(0)
  const [highetBidId, setHighetBidId] = useState(null)
  const { user } = useContext(GlobalContext)

  async function bid(e) {
    e.preventDefault()

    if (newBid < product.activeBid.amount || newBid < product.startBid) {
      return alert("För lågt bud.")
    }

    const { response, result } = await bidOnProduct(product._id, newBid)

    if (response.status === 201) {
      setProduct(result.product)
    } else {
      alert(result.message)
    }
  }

  async function toogleWatching() {
    const { response, result } = await watchProduct(product._id)

    if (response.status === 201) {
      setWatching(result.watching)
    } else {
      alert(result.message)
    }
  }

  useEffect(() => {
    if (user) {
      const isFollowing = async () => {
        const { response, result } = await getUserInfo(user.id)
        if (response.status === 200) {
          if (result.watching.find(id => id === product._id)) {
            setWatching(true)
          } else {
            setWatching(false)
          }
        } else {
          alert(result.message)
        }
      }

      isFollowing()
    }
  }, [])

  useEffect(() => {
    if (product.activeBid.userId !== "") {
      setHighetBidId(product.activeBid.userId)
    }
  }, [highetBidId])

  return <>
    <div className="flex justify-between items-center gap-5 my-10">
      <section className="bg-blue-900 rounded-xl p-5 text-white grow">
        <section className="flex-col items-center gap-5">
          <h1>{product.name}</h1>
          {
            user ?
              <h2>Säljare - {user.id === product.owner._id ? "Du" : product.owner.username}</h2>
              :
              <h2>Säljare - {product.owner.username}</h2>
          }

          {
            !user ? null :
              <img className={`w-10 h-10 p-1 rounded-lg ${watching ? "bg-green-400" : "bg-red-400"}`} src={watching ? FollowSVG : UnfollowSVG} onClick={toogleWatching} />
          }
        </section>
        {
          product.startBid > product.activeBid.amount ?
            <p>Lägg första budet - minst {product.startingBid} kr.</p>
            :
            <p className="">Högsta budet är - {product.activeBid.amount} kr</p>
        }
        {
          !user ?
            <Link to="/login">Logga in för att buda.</Link>
            :
            highetBidId === user.id ?
              <p>Ditt bud</p>
              :
              <form className="flex flex-col gap-5" onSubmit={bid}>
                <input className="border-black border-2 p-4 rounded-lg shadow-custom text-black" id="newBid" placeholder="Nytt bud" onChange={(event) => setNewBid(event.target.value)} min={0} required></input>
                <button className="bg-blue-800 text-white text-lg py-4 px-10 rounded-lg shadow-custom">Buda</button>
              </form>

        }
        <table className="text-left divide-y divide-gray-200 border w-[500px] my-5">
          <thead className="block">
            <tr className="flex">
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wider w-1/3" scope="col">Användare</th>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wider w-1/3" scope="col">Bud</th>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wider w-1/3" scope="col">Tid</th>
            </tr>
          </thead>
          <tbody className="block max-h-[500px] overflow-y-auto">
            {
              [...product.bidHistory].reverse().map((bid, index) => (
                <tr className={index % 2 === 0 ? "flex bg-blue-800" : "flex bg-blue-900"} key={index}>
                  <td className="px-6 py-4 whitespace-nowrap w-1/3" scope="row">{bid.user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap w-1/3">{bid.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap w-1/3">{new Date(bid.time).toLocaleString('sv-SE', {
                    hour: '2-digit',
                    minute: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour12: false
                  })}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <p>{product.description}</p>
      </section>
      <img className="max-w-[50%]" src={product.imageURL} alt="Bild" />
    </div>
  </>
}
