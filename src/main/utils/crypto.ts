import { is } from '@electron-toolkit/utils'
import crypto from 'crypto'
require('dotenv').config()

if (!is.dev && !process.env.ENCRYPT_KEY) {
  // @ts-ignore In production, the ENCRYPT_KEY is set in the env file.
  process.env.ENCRYPT_KEY = '%1DkJD0D5bFQ2#dD$9Eph3v5Dxk!6cf0'
}

export const encrypt = (password: string) => {
  const iv = Buffer.from(crypto.randomBytes(16))
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(process.env.ENCRYPT_KEY), iv)
  const encpass = Buffer.concat([cipher.update(password), cipher.final()])

  return {
    salt: iv.toString('hex'),
    password: encpass.toString('hex'),
    tag: cipher.getAuthTag().toString('hex')
  }
}

export const decrypt = (encpass: EncryptedPassword) => {
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(process.env.ENCRYPT_KEY),
    Buffer.from(encpass.salt, 'hex')
  )

  decipher.setAuthTag(Buffer.from(encpass.tag, 'hex'))

  const decpass = Buffer.concat([
    decipher.update(Buffer.from(encpass.password, 'hex')),
    decipher.final()
  ])

  return decpass.toString()
}

export type EncryptedPassword = ReturnType<typeof encrypt>
