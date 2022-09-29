import fetch from 'node-fetch'


export async function get( {params} ) {
  const {code} = params;
  const fullLink = `https://shadowverse-portal.com/api/v1/deck/import?format=json&deck_code=${code}`;
  const response = await fetch(fullLink);
  const json = await response.json();
  
  const data = json.data;
  if(data.errors.length > 0) {
    const errResponse = {
      "error": "Failed to fetch deck code."
    }
    return new Response(JSON.stringify(errResponse), {
      status: 404,
      statusText: 'Not found'
    })
  }

  
  const link = `https://shadowverse-portal.com/deck/${data.hash}`
  const crafts = ['neutral', 'forestcraft', 'swordcraft', 'runecraft', 'dragoncraft', 'shadowcraft', 'bloodcraft',
  'havencraft', 'portalcraft'];

  const classifyReq = await fetch(`https://classify-sv.blade-wing.workers.dev/?deck=${link}`);
  const classifyRes = await classifyReq.json();

  if(classifyRes.errors !== undefined) {
    const errResponse = {
      "error": "Failed to fetch deck."
    }
    console.log("Failed to classify")
    return new Response(JSON.stringify(errResponse), {
      status: 404,
      statusText: 'Not found'
    })
  }

  const goodResponse = {
    "error": null,
    "deckLink": classifyRes.link,
    "craft": crafts[data.clan],
    "archetype": classifyRes.archetype_id
  }
  
  return new Response(JSON.stringify(goodResponse), {
    status: 200
  });
}