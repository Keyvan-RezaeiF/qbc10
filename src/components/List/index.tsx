import { useEffect, useState } from "react"

const List = ({ getItems }: { getItems: () => number[] }) => {
  const [items, setItems] = useState<number[]>([])

  useEffect(() => {
    setItems(getItems())
  }, [getItems])

  return items.map(item => <div key={item}>{item}</div>)
}

export default List