import { memo } from "react"

interface SearchBoxProps {
  onChange: (value: string) => void
}

const SearchBox = ({ onChange }: SearchBoxProps) => {
  console.log('re-render SearchBox')

  return (
    <input
      type='text'
      onChange={e => onChange(e.target.value)}
      placeholder='Search ...'
    />
  )
}

export default memo(SearchBox)