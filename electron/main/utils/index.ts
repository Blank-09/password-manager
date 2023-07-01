import { EncryptedPassword, encrypt, decrypt } from './crypto'
const { Database } = require('sqlite3')

import IUserAccount from '../interface/IUserAccount'

const db = new Database('./db/db.sqlite3')

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

export function selectAllFromUserAccount(): Promise<IUserAccount[]> {
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
