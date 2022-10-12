import fetch from 'node-fetch'


export async function get( {params} ) {
  const {code} = params;
  
  return fetch("https://shadowverse-master.blade-wing.workers.dev/generate/" + code);
}

// curl -X POST "https://shadowverse-portal.com/api/v1/deck_code/publish?format=json&lang=en" -d "hash=3.7.7ZSC2.7ZSC2.7ZSC2.7Vc62.7Vc62.7Vc62.7ZSRg.7ZSRg.7ZSRg.7LNJy.7LNJy.7LNJy.7ZUeI.7ZUeI.7ZUeI.7K7UQ.7K7UQ.gk9cI.gk9cI.7ZNJi.7ZNJi.7ZNJi.7RpwC.7RpwC.7RpwC.7ZNJY.7ZNJY.7ZNJY.7ZUeS.7ZUeS.7ZUeS.7LKti.7LKti.7LKti.7VgVc.7VgVc.7VgVc.7K9Bo.7K9Bo.7K9Bo&csrf_token=" -H "Content-Type: application/x-www-form-urlencoded"