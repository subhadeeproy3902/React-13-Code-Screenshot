import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import useStore from '@/store'
import { fonts } from '@/options'

const FontSelection = () => {

  const fontStyle = useStore((state) => state.fontStyle)

  return (
    <div>
      <label className='block mb-2 text-xs font-medium text-neutral-400'>Font</label>
      <Select value={fontStyle} onValueChange={fontStyle => useStore.setState({ fontStyle })}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Font" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[400px] bg-[#120021]">
          {Object.entries(fonts).map(([id, font]) => (
            <SelectItem key={id} value={id}>
              {font.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FontSelection