import axios from "axios";

export const sendGet = async (key) => {
    let url = process.env.REACT_APP_SEND_GET_URL + key;
    try {
        const response = await axios.get(url);
        // console.log("Get response: ", response.data);
    }
    catch (error) {
        // console.error("Error: ", error);
    }
};


export const sendPost = async (key, value) => {
    let data = { "id": key, "value": value };
    let url = process.env.REACT_APP_SEND_POST_URL;
    try {
        const response = await axios.post(
            url,
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        // console.log("Get response: ", response.data);
    }
    catch (error) {
        // console.error("Error: ", error);
    }
};