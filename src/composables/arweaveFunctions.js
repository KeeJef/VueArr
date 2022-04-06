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

    let res = await axios({
        url: endpoint,
        method: "POST",
        headers: headers,
        data: graphqlQuery,
    });
    return res.data
}