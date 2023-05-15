import { DATASET_ID, API_KEY } from '@env';

async function fetchDataFromFluree() {
    const query ={
        select: [
          "*",
          "videoUri",
          {
            "user": ["*"],
            "song": ["*"],
          }
        ],
        from: "post"
      };
    const networkName = "fluree";
    const datasetID = DATASET_ID;
    const APIKey = API_KEY;
  
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
  