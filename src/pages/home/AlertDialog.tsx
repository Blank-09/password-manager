import React from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../../components/ui/alert-dialog'

import { useParams } from 'react-router-dom'

export const AlertDialogDemo: React.FC<{
  cb: (success: boolean, id: number) => void
}> = (props) => {
  const [open, setOpen] = React.useState<boolean>(true)
  const params = useParams<{ id: string }>()

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          props.cb(false, -1)
          setTimeout(() => history.back(), 100)
        }
        setOpen(open)
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => props.cb(true, parseInt(params.id || '-1'))}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
