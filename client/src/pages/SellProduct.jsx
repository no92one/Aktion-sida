import { useState } from "react"
import { useNavigate } from "react-router-dom"
import getDateAndTime from "../utils/getDateAndTime.jsx"

export default function AuctionProduct() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [startBid, setStartBid] = useState("")
  const [endTime, setEndTime] = useState(null)
  const [imageURL, setImageURL] = useState("")

  async function submitForm(e) {
    e.preventDefault()

    const response = await fetch(`api/products`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        endTime: endTime,
        startBid: startBid,
        images: images
      })
    })

    if (response.ok) {
      alert(name + " är ute för auktion.")
      navigate("/")
    } else {
      alert("Något gick fel.")
    }
  }

  return <>
    <h1 className="text-center">Ny försäljning</h1>

    <section className="bg-blue-900 shadow-custom rounded-2xl p-20 self-center mt-4 mb-16">
      <form onSubmit={submitForm} className="grid grid-cols-2 gap-2 items-center">

        <label className="text-white" htmlFor="name">Produkt namn </label>
        <input className="p-2" type="text" id="name" onChange={(event) => setName(event.target.value)} required />
        <label className="text-white" htmlFor="startBid">Start bud i SEK</label>
        <input className="p-2" type="number" id="startBid" onChange={(event) => setStartBid(event.target.value)} min={1} required />
        <label className="text-white" htmlFor="endDate">Slut tid</label>
        <input className="p-2" type="datetime-local" id="endDate" onChange={(event) => setEndTime(event.target.value)} min={getDateAndTime()} required />
        <label className="text-white" htmlFor="images">Bild URL-adress</label>
        <input className="p-2" type="text" id="imageURL" onChange={(event) => setImageURL(event.target.value)} min={getDateAndTime()} />


        <button className="bg-white w-32 p-2 rounded-xl font-semibold shadow-custom transition-colors ease-in-out hover:bg-blue-200 " >Starta auktion</button>
      </form>
    </section>
  </>
}
