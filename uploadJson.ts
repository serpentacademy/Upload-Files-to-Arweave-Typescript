
import * as fs from 'fs';
import Arweave from 'arweave';


(async () => {

    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
        timeout: 20000,
        logging: false,
    });

    // Upload image to Arweave
    const data = fs.readFileSync('./ape-punk.png');
    
    const transaction = await arweave.createTransaction({
        data: data
    });
    
    transaction.addTag('Content-Type', 'image/png');
    let wallet_object;

    const wallet =await fs.readFileSync('./wallet.json', 'utf8');
    console.log(wallet);
   



    // Upload metadata to Arweave
var imageUrl = "https://arweave.net/--56hNXqVLfji9q_qNfUowCv26UVlQlbv0jFfRogj6s?ext=png";
    let metadata:String = `{
        "name": "Bird Ape King",
        "symbol": "NFTPro",
        "description": "Ape Bird Punk created by a BAD AI. Mixing genes of birds and apes and trying to produce a high conscious being that could patrol difficult planets. Owning this NFT has a 3 % more rewards on serpent academy.Coming soon.",
        "seller_fee_basis_points": 1000,
        "image": "${imageUrl}",
        "attributes": [{
            "trait_type": "Eyes",
            "value": "Red Glow"
        }, {
            "trait_type": "Status",
            "value": "Ape Bird"
        }],
        "properties": {
            "files": [{
                "uri": "${imageUrl}",
                "type": "image/png"
            }],
            "category": "image",
            "creators": [{
                "address": "9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9",
                "verified": true,
                "share": 100
            }]
        }
    }`;
    

    metadata = metadata.trim();

    console.log(metadata);
    const metadataRequest = JSON.parse(JSON.stringify(metadata));
    
    const metadataTransaction = await arweave.createTransaction({
        data: metadataRequest
    });
    
    metadataTransaction.addTag('Content-Type', 'application/json');
    
    await arweave.transactions.sign(metadataTransaction, );
    
    let response = await arweave.transactions.post(metadataTransaction);
    console.log(response);
})();
