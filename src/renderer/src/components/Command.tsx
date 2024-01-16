import * as React from 'react'
import { Plus, Moon, Inspect, Copy, LucideIcon } from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'

import { NavigateFunction, useNavigate } from 'react-router-dom'
import generateRandomPassword from '@/lib/generatePassword'
import { useTheme } from 'next-themes'

interface CommandGroup {
  heading: string
  type: 'group'
  items: Array<{
    name: string
    shortcut?: string
    icon: LucideIcon
    onSelect: (navigator: NavigateFunction) => void
  }>
}

const groups: [CommandGroup, CommandGroup] = [
  {
    heading: 'Account Manager',
    type: 'group',
    items: [
      {
        name: 'Add Account',
        icon: Plus,
        onSelect: (navigate) => {
          navigate('/accounts/create')
        }
      },
      {
        name: 'Generate Random Password',
        icon: Copy,
        onSelect: () => {
          navigator.clipboard.writeText(
            generateRandomPassword({
              length: 16,
              contains: {
                lowercase: true,
                number: true,
                symbol: true,
                uppercase: true
              },
              itShouldBe: {
                isAllCharacters: true,
                isEasyToRead: true,
                isEasyToSay: true
              }
            })
          )
        }
      }
    ]
  },
  {
    heading: 'Settings',
    type: 'group',
    items: [
      {
        name: 'Dark Mode',
        shortcut: 'Ctrl+D',
        icon: Moon,
        onSelect: () => {
          localStorage.setItem('dark', localStorage.getItem('dark') === '1' ? '0' : '1')
          document.body.classList.toggle('dark')
        }
      },
      {
        name: 'DevTools',
        shortcut: 'Ctrl+Shift+I',
        icon: Inspect,
        onSelect: () => {
          window.electron.ipcRenderer.invoke('win:devtools')
        }
      }
    ]
  }
]

export function CustomCommandDialog() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'p' && e.ctrlKey) {
        setOpen((open) => !open)
      }

      if (e.ctrlKey && e.key === 'd') {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {groups.map((item, i) => (
          <React.Fragment key={'group' + i}>
            <CommandGroup heading={item.heading}>
              {item.items.map((item, i) => (
                <CommandItem
                  key={i}
                  onSelect={() => {
                    item.onSelect(navigate)
                    setOpen(!open)
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.name}</span>
                  {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </React.Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
