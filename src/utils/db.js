import Dexie from "dexie";

const db = new Dexie('shipment-execution');
db.version(1).stores({
    root: '++id,tor_id',
    stop: '++id,tor_id,stop_id',
    config: '++id,didFetch'
})

export default db;