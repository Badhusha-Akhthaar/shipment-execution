import axios from "axios";
import db from '../utils/db.js';


export async function initializeData() {
    let _configDB = db.config;
    let _didFetch;
    await _configDB.get(1).then((data)=>{
                                _didFetch =  data;
                            })
                            .catch((err)=> console.log(err));

    if(!_didFetch){
        console.log("Didn't find data, fetching....")
        const BASE_URL = "https://shipmentsrouter-v1.cfapps.eu10.hana.ondemand.com/odata/"
        const ROOT_URL = axios.get(`${BASE_URL}ZTMDRIROOT_C`);
        // const STOPITEM_URL = axios.get(`${BASE_URL}ZTMDRISTIT_C`);
        const STOP_URL = axios.get(`${BASE_URL}ZTMDRISTOP_C`);
        // const ITEM_URL = axios.get(`${BASE_URL}ZTMDRIITEM_C`);
        const ENTITY_URLS  = [ROOT_URL,STOP_URL];
        let fetchStart = Date.now();
        console.log(`Fetch Start ${fetchStart}`)
        return await axios
                    .all(ENTITY_URLS)
                    .then(axios.spread((...responses)=>{
                        let ENTITY_NAMES = ["ROOT","STOP"];
                        let _saveToIndexedDB = [];
                        responses.forEach((response,i)=>{
                            _saveToIndexedDB.push(writeToDexieDB(response.data.d.results,ENTITY_NAMES[i]));
                        });
                        return Promise.all(_saveToIndexedDB).then(()=>{
                                    db.config.put({didFetch: true},[1]);
                                    return new Promise((resolve,reject)=>{
                                        resolve(true);
                                    });
                                })
                                .catch((err)=>{
                                    console.log(`Error : ${err}`);
                                    return new Promise((resolve,reject)=>{
                                        reject(err);
                                    });
                                });
                    }))
                    .catch(err =>{
                        console.log(`Error : ${err}`)
                        return new Promise((resolve,reject)=>{
                            reject(err);
                        });
                    })
                    .finally(()=>{
                        let fetchEnd = Date.now();
                        console.log(`Fetch Start ${fetchEnd}`)
                        console.log(`Time taken ${fetchEnd-fetchStart}`)
                    });
        
    }
    else{
        console.log("Already data present. Skipped Fetching");
        return new Promise((resolve,reject)=>{
            resolve(true);
        });
    }
}

// function writeToIndexedDB(data,entityName){
//     console.log(data);
//     return new Promise((resolve,reject)=>{
//         _appData.bulkDocs(data).then(()=>{
//             resolve();
//         })
//         .catch((err)=>{
//             reject(err);
//         })
//     });
// }

function writeToDexieDB(data,entityName){
    switch (entityName) {
        case 'ROOT':
            return new Promise((resolve,reject)=>{
                db.root.bulkAdd(data).then(()=>{
                    resolve();
                })
                .catch((err)=>{
                    reject(err);
                })
            });
        case 'STOP':
            return new Promise((resolve,reject)=>{
                db.stop.bulkAdd(data).then(()=>{
                    resolve();
                })
                .catch((err)=>{
                    reject(err);
                })
            });
        default:
            break;
    }
}

export async function getShipmentsData(){
    return await db.root.toArray();
}

export async function getShipmentData(shipmentid){

    let shipmentHeader = await db.root.where({tor_id : shipmentid}).toArray().then((d)=>{return d});
    let shipmentStops = await db.stop.where({tor_id : shipmentid}).toArray().then((d)=>{return d});
    return {shipmentHeader,shipmentStops};
}

export async function getStopsData(shipmentid){
    return await db.stop.where({tor_id : shipmentid}).toArray();
}