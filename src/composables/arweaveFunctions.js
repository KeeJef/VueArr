import axios from "axios";
import Arweave from 'arweave';

const arweave = Arweave.init({
  host: '188.166.200.45',
  port: 1984,
  protocol: 'http'
});

const endpoint = "https://arweave.net/graphql";
const headers = {
    "content-type": "application/json",
};

let stopWordArray = ["", "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"]

// eslint-disable-line no-unused-vars

export async function getRecentTxIds() {

    let txidArray = []

    const graphqlQuery = {
        query: `{
    transactions(tags: [{ name: "Arr", values: "" }]) {
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

    try {
        console.log("txid: " + txid)
        var data = await arweave.transactions.getData(txid)
        data = JSON.parse(atob(data))
    } catch (error) {
        console.log(error)
        return
    }

    return data
}

export async function getSeedersAndLeechers(magnetLink) {
    console.log(magnetLink)
    let response = await axios.get('https://cryptocommit.org/m/single?magnet=' + magnetLink);
    console.log(await response)
    return response.data
}

export async function validateInfo(magnetLink) {

    if (magnetLink.match(/magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32}/i)) {
        return true
    } else {
        return false
    }

}

function getDate() {
    let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //As January is 0.
    var yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return (mm + '/' + dd + '/' + yyyy);
}

export async function generateTx(magnetLink, contentTitle, contentType) {

    let arweaveTxData = []
    arweaveTxData.push(magnetLink, contentTitle, contentType, getDate())
    arweaveTxData = JSON.stringify(arweaveTxData);

    try {

        var tx = await arweave.createTransaction({
            data: arweaveTxData
        });

    } catch (error) {
        console.log(error)
        return "Failed to create TX"
    }

    //remove numbers and special characters from the contentTitle replace periods with spaces, remove trailing and leading spaces
    let contentTitleLowerCase = contentTitle.toLowerCase()
    contentTitleLowerCase.replace(/[^a-zA-Z\s.]/g, "").replace(/\./g, " ").trim()
    let contentTitleArray = contentTitleLowerCase.split(" ")

    //filter out words in stop word array
    contentTitleArray = contentTitleArray.filter(function (val) {
        return stopWordArray.indexOf(val) == -1;
    });

    tx.addTag('Arr')
    tx.addTag('category', contentType)

    for (let index = 0; index < contentTitleArray.length; index++) {
        const element = contentTitleArray[index];

        tx.addTag('name', element)
    }

    try {

        var signedTransaction = await window.arweaveWallet.sign(tx);
        console.log(signedTransaction);
        
    } catch (error) {
        console.log(error)
        return "TX signature failed"
    }

    try {
        var submittedTransaction = await arweave.transactions.post(signedTransaction);
        console.log(submittedTransaction);
    } catch (error) {
        console.log(error)
        return "TX post failed"
    }

    return "TX success"

}


export async function searchTx(searchPhrase) {
    let txidArray = []
    searchPhrase = searchPhrase.toLowerCase()
    let namesArray = searchPhrase.split(" ")
    namesArray = JSON.stringify(namesArray)

    let query = `query {
        transactions(
        tags: [
            { name: "Arr", values: [""] }
            { name: "name", values: `+ namesArray + ` }
        ]
        ) {
        edges {
            node {
            id
            }
        }
        }
    }`

    let res = await axios({
        url: endpoint,
        method: "POST",
        headers: headers,
        data: JSON.stringify({
            query,
        }),
    });

    console.log("finished lookup")

    for (let index = 0; index < res.data.data.transactions.edges.length; index++) {
        const element = res.data.data.transactions.edges[index].node.id;
        txidArray.push(element)
    }

    return txidArray;
}