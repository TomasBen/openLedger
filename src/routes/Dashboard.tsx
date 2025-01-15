import Database from "@/lib/database"

export default function Dashboard(){
  const data = {
    code: 'bce2ff5e-e3f4-4728-a5b6-79829dd242bb',
    name: 'Cattail Hearts',
    description: 'Nullam porttitor lacus at turpis.',
    price: 924.18,
    currency: 'USD',
    entity_assoc: 'gonzalo'
  }

  const handleClick = async () => {
    console.time('db insert')
    try {
      const result = await Database.createProduct(data)
      console.log(result)
      console.timeEnd('db insert')
    } catch (errr) {
      console.log(errr)
      console.timeEnd('db insert')
    }
  }

  return (
    <button
      style={{ height: "50px", width: "auto", margin: "auto" }}
      onClick={() => handleClick()}
    >
      this is a button in the center
    </button>
  )
}
