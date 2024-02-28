import  sqlite3  from "sqlite3";
import { open }   from 'sqlite3'

sqlite3.verbose();
export async function openDb () {
  return open ({})
};
