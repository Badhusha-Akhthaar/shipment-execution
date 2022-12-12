import axios from "axios";
import PouchDB from 'pouchdb-browser';


export async function initializeData() {
    let _configDB = new PouchDB("_config");
    let _didFetch = await _configDB.get("fetchConfig").then((data)=>{
                                return data;
                            })
                            .catch((err)=> console.log(err));

    if(!_didFetch){
        console.log("Didn't find data, fetching....")
        const BASE_URL = "https://shipmentsrouter-v1.cfapps.eu10.hana.ondemand.com/odata/"
        const ROOT_URL = axios.get(`${BASE_URL}ZTMDRIROOT_C`);
        const STOPITEM_URL = axios.get(`${BASE_URL}ZTMDRISTIT_C`);
        const STOP_URL = axios.get(`${BASE_URL}ZTMDRISTOP_C`);
        const ITEM_URL = axios.get(`${BASE_URL}ZTMDRIITEM_C`);
        const ENTITY_URLS  = [ROOT_URL,STOPITEM_URL,STOP_URL,ITEM_URL];
        let fetchStart = Date.now();
        console.log(`Fetch Start ${fetchStart}`)
        return await axios
                    .all(ENTITY_URLS)
                    .then(axios.spread((...responses)=>{
                        let ENTITY_NAMES = ["ROOT","STOPITEM","STOP","ITEM"];
                        let _saveToIndexedDB = [];
                        responses.forEach((response,i)=>{
                            response.data.d.results.forEach(e => {
                                e._id = e.tor_id;
                                delete e.__metadata
                                return e
                            })
                            _saveToIndexedDB.push(writeToIndexedDB(response.data.d.results,ENTITY_NAMES[i]));
                        });
                        return Promise.all(_saveToIndexedDB).then(()=>{
                                    _configDB.put({"_id":"fetchConfig","didFetch":true});
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

function writeToIndexedDB(data,entityName){
    let _appData = new PouchDB(entityName);
    console.log(data);
    return new Promise((resolve,reject)=>{
        _appData.bulkDocs(data).then(()=>{
            resolve();
        })
        .catch((err)=>{
            reject(err);
        })
    });
}

export async function getShipmentsData(){
    let _shipmentsData = new PouchDB('ROOT');
    return _shipmentsData.allDocs({include_docs: true})
                .then((data)=>{
                    return data;
                })
                .catch((err)=>{
                    console.log("PouchDB Read Error")
                });
}

export async function getShipmentData(shipmentid){
    let _stopsDB = new PouchDB('STOP');
    return _stopsDB.get(shipmentid)
                    .then((data)=>{
                        console.log(data)
                    })
                    .catch((err)=>{
                        console.log("PouchDB Read Error"+err)
                    })
}