import { FLUREE_DATASET_ID, FLUREE_API_KEY } from '@env';

async function fetchDataFromFluree(query) {
    const networkName = "fluree";
    const datasetID = FLUREE_DATASET_ID;
    const APIKey = FLUREE_API_KEY;
  
    const url = `https://api.dev.flur.ee/fdb/${networkName}/${datasetID}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${APIKey}`,
    };
  
    try {
      const resp = await fetch(`${url}/query`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(query),
      });
      const data = await resp.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  export default fetchDataFromFluree;
  