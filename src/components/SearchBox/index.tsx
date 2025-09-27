import { memo } from "react"

interface SearchBoxProps {
  onChange: (value: string) => void
}

const SearchBox = ({ onChange }: SearchBoxProps) => {
  return (
    <input
      type='text'
      onChange={e => onChange(e.target.value)}
      placeholder='Search ...'
    />
  )
}

export default memo(SearchBox)