import fs from 'fs'
import path from 'path'

import { app } from 'electron'
import { EncryptedPassword, encrypt, decrypt } from './crypto'

import IUserAccount from '../interface/IUserAccount'

const { Database } = require('sqlite3').verbose()
const dbFolder = app.getPath('userData')
const dbPath = path.join(dbFolder, 'db/db.sqlite3')

if (!fs.existsSync(dbPath)) {
  console.log('Database not found, creating a new one...')
  fs.mkdirSync(path.join(dbFolder, 'db'), { recursive: true })
}

const db = new Database(dbPath)

export function createTable() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS UserAccounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_name TEXT,
      username TEXT,
      password TEXT,
      salt TEXT,
      tag TEXT,
      icon TEXT,
      isFavorite BOOLEAN,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`)
  })
}

export function dropTable() {
  db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS UserAccounts;`)
  })
}

export function insertIntoUserAccount(
  account_name: string,
  username: string,
  icon: string,
  unpassword: string,
  isFavorite: boolean
) {
  db.serialize(() => {
    const time = new Date()

    // encrypt the password
    const { password, salt, tag } = encrypt(unpassword)

    db.run(
      `INSERT INTO UserAccounts (account_name, username, password, salt, tag, icon, isFavorite, created_at, modified_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [account_name, username, password, salt, tag, icon, isFavorite, time, time],
      (err) => err && console.log(err)
    )
  })
}

export function updateUserAccount(
  id: number,
  account_name: string,
  username: string,
  icon: string,
  unpassword: string,
  isFavorite: boolean
) {
  db.serialize(() => {
    // TODO: Check for the password before updating
    // WARN: This will update the password even if the password is not changed

    const time = new Date()
    const { password, salt, tag } = encrypt(unpassword)

    db.run(
      `UPDATE UserAccounts SET account_name = ?, username = ?, password = ?, salt = ?, tag = ?, icon = ?, isFavorite = ?, modified_at = ? WHERE id = ?;`,
      [account_name, username, password, salt, tag, icon, isFavorite, time, id],
      (err) => err && console.log(err)
    )
  })
}

export type UserAccount = IUserAccount & EncryptedPassword

export function selectAllFromUserAccount(): Promise<UserAccount[]> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(`SELECT * FROM UserAccounts;`, (err, rows: UserAccount[]) => {
        if (err) {
          return reject(err)
        }

        rows.forEach((row) => {
          row.password = decrypt({
            salt: row.salt,
            tag: row.tag,
            password: row.password
          })
        })

        resolve(rows)
      })
    })
  })
}

export function selectFromUserAccount(id: number): Promise<UserAccount> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.get(`SELECT * FROM UserAccounts WHERE id = ?;`, [id], (err, row: UserAccount) => {
        if (err) {
          return reject(err)
        }

        row.password = decrypt({
          salt: row.salt,
          tag: row.tag,
          password: row.password
        })

        // @ts-ignore FIX: Converts the isFavorite from 0/1 to boolean
        row.isFavorite = Boolean(row.isFavorite)

        resolve(row)
      })
    })
  })
}

export function removeUserAccount(id: number) {
  db.serialize(() => {
    db.run(
      `DELETE FROM UserAccounts WHERE id = ?;`, //
      [id],
      (err) => err && alert(err)
    )
  })
}

createTable()
