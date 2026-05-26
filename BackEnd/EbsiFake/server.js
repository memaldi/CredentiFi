const express = require('express');
const app = express();

const didDocuments = {
    'did:ebsi:z21Bs13TqhZV7RY727hX22XF': {
        "@context": [
            "https://www.w3.org/ns/did/v1",
            "https://w3id.org/security/suites/jws-2020/v1"
        ],
        "controller": [
            "did:ebsi:z21Bs13TqhZV7RY727hX22XF"
        ],
        "id": "did:ebsi:z21Bs13TqhZV7RY727hX22XF",
        "verificationMethod": [
            {
                "controller": "did:ebsi:z21Bs13TqhZV7RY727hX22XF",
                "id": "did:ebsi:z21Bs13TqhZV7RY727hX22XF#_bQu28sgqr1qnjSjJEKBGnRDilhlz7AtYYp5mMg83r0",
                "publicKeyJwk": {
                    "kty": "EC",
                    "x": "Qk_Y4oc5koNuIRcuQgWF4089cNPkEkAGmn5PGbhZBDk",
                    "y": "HEGgwaSkBn058JOpu_Xc0PLieNkfTSXA36S8Azwrx90",
                    "crv": "P-256"
                },
                "type": "JsonWebKey2020"
            }
        ],
        "authentication": [
            "did:ebsi:z21Bs13TqhZV7RY727hX22XF#_bQu28sgqr1qnjSjJEKBGnRDilhlz7AtYYp5mMg83r0"
        ],
        "assertionMethod": [
            "did:ebsi:z21Bs13TqhZV7RY727hX22XF#_bQu28sgqr1qnjSjJEKBGnRDilhlz7AtYYp5mMg83r0"
        ],
        "capabilityInvocation": [
            "did:ebsi:z21Bs13TqhZV7RY727hX22XF#_bQu28sgqr1qnjSjJEKBGnRDilhlz7AtYYp5mMg83r0"
        ],
        "capabilityDelegation": [],
        "keyAgreement": []
    },
    'did:ebsi:z2B8dYp4g8f4XW6Q9kVw3N7mR5tJc1Hs': {
        "@context": [
            "https://www.w3.org/ns/did/v1",
            "https://w3id.org/security/suites/jws-2020/v1"
        ],
        "controller": [
            "did:ebsi:z2B8dYp4g8f4XW6Q9kVw3N7mR5tJc1Hs"
        ],
        "id": "did:ebsi:z2B8dYp4g8f4XW6Q9kVw3N7mR5tJc1Hs",
        "verificationMethod": [
            {
                "controller": "did:ebsi:z2B8dYp4g8f4XW6Q9kVw3N7mR5tJc1Hs",
                "id": "did:ebsi:z2B8dYp4g8f4XW6Q9kVw3N7mR5tJc1Hs#wXEiglCrW_xhPEnAC9Px2mzfZ_TKqQlmT2-JpefQAls",
                "publicKeyJwk": {
                    "kty": "EC",
                    "x": "V_YjS_wCXRaekKKD_ObaxXxD8DtVTWKRLzgCDUlkbh4",
                    "y": "Dg2akRLtTu7_y8rmlGeEOGBlFv9ztNJdPpogQTSgG40",
                    "crv": "P-256"
                },
                "type": "JsonWebKey2020"
            }
        ],
        "authentication": [
            "did:ebsi:z2B8dYp4g8f4XW6Q9kVw3N7mR5tJc1Hs#wXEiglCrW_xhPEnAC9Px2mzfZ_TKqQlmT2-JpefQAls"
        ],
        "assertionMethod": [
            "did:ebsi:z2B8dYp4g8f4XW6Q9kVw3N7mR5tJc1Hs#wXEiglCrW_xhPEnAC9Px2mzfZ_TKqQlmT2-JpefQAls"
        ],
        "capabilityInvocation": [
            "did:ebsi:z2B8dYp4g8f4XW6Q9kVw3N7mR5tJc1Hs#wXEiglCrW_xhPEnAC9Px2mzfZ_TKqQlmT2-JpefQAls"
        ],
        "capabilityDelegation": [],
        "keyAgreement": []
    }
};


app.get('/did-registry/v5/identifiers/:did', (req, res) => {
    const did = req.params.did;
    console.log(`Petición de DID recibida: ${did}`);
    const doc = didDocuments[did];
    if (doc) {
        res.json(doc);
    } else {
        res.status(404).send('DID not found');
    }
});
app.get('/', (req, res) => {
    console.log('Petición recibida a la ruta raíz /');
    res.send('Hola desde el backend');
});

app.listen(2000, () => {
    console.log('Fake EBSI DID Registry running at http://localhost:2000');
});
