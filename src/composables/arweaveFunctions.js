import axios from "axios";

export async function getRecentTxs() {

    const endpoint = "https://arweave.net/graphql";
    const headers = {
        "content-type": "application/json",
    };
    const graphqlQuery = {
            query: `{
    transactions(tags: [{ name: "ArrTorrent", values: "" }]) {
        edges {
        node {
            id
        }
        }
    }
    }`,
    };

    try {
        let res = await axios({
            url: endpoint,
            method: "POST",
            headers: headers,
            data: graphqlQuery,
        });

        let data = res.data;
        return data;
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}