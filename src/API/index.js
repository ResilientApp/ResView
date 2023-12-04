import axios from "axios";

export const sendGet = async () => {
  let key = "key1";
  let url = "http://127.0.0.1:18000/v1/transactions/" + key;
  try {
    const response = await axios.get(url);
    console.log("Get response: ", response.data);
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const sendPost = async () => {
  let key = "key1";
  let value = "value1";
  let data = { id: key, value: value };
  let url = "http://127.0.0.1:18000/v1/transactions/commit";
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log("Get response: ", response.data);
  } catch (error) {
    console.error("Error: ", error);
  }
};