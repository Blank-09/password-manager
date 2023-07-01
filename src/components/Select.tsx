import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from './ui/select'

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by (default)" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Sort by</SelectLabel> */}
          <SelectItem value="a-z">A-Z (default)</SelectItem>
          <SelectItem value="z-a">Z-A (DES)</SelectItem>
          <SelectItem value="date (asc)">Created Date (ASC)</SelectItem>
          <SelectItem value="date (des)">Created Date (DES)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
