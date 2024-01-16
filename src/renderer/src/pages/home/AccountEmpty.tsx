import React from 'react'

import { Link, useLoaderData } from 'react-router-dom'
import { Plus, Podcast } from 'lucide-react'
import { Button } from '@/components/ui/button'

import IUserAccount from '@/interface/IUserAccount'
import { AccountsDataTable } from './DataTable'

const AccountEmpty: React.FC = () => {
  const data = useLoaderData() as IUserAccount[]

  return (
    <>
      {data.length > 0 ? (
        <AccountsDataTable data={data} />
      ) : (
        <div className="py-3 h-full">
          <div className="flex h-full w-full shrink-0 items-center justify-center rounded-md border border-dashed">
            <div className="mx-auto flex flex-col items-center justify-center text-center">
              <Podcast className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No Accounts added</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                You have not added any Accounts. Add one below.
              </p>
              <Link to="create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AccountEmpty
