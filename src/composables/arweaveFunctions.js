import axios from "axios";
import Arweave from 'arweave';

const arweave = Arweave.init({});

const endpoint = "https://arweave.net/graphql";
const headers = {
    "content-type": "application/json",
};

export async function getRecentTxIds() {

    let txidArray = []

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

    for (let index = 0; index < res.data.data.transactions.edges.length; index++) {
        const element = res.data.data.transactions.edges[index].node.id;
        txidArray.push(element)        
    }

    return txidArray
}

export async function getTxFromId(txid) {

    var data = await arweave.transactions.getData(txid)
    console.log(atob(data))
    return atob(data)

}