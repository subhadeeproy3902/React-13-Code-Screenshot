import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import useStore from '@/store'
import { themes } from '@/options'
import { cn } from '@/lib/utils'

const ThemeSelection = () => {

  const theme = useStore(state => state.theme)

  return (
    <div>
      <label id="theme" className='block mb-2 text-xs font-medium text-neutral-400'>Theme</label>
      <Select value={theme} onValueChange={theme => useStore.setState({ theme })}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Theme" />
        </SelectTrigger>
        <SelectContent className="dark bg-[#120021]">
          {Object.entries(themes).map(([name, theme]) => (
            <SelectItem key={name} value={name}>
              <div className='flex gap-2 items-center'>
                <div className={cn("h-4 w-4 rounded-full border-violet-50 border", theme.background)} />
                <span className='capitalize'>{name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default ThemeSelection