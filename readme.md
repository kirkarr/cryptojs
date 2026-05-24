# CryptoModuleBrowser

A comprehensive cryptographic library for browser environments that provides secure key management, digital signatures, and hybrid encryption (ECIES + AES + HMAC) using SECP256k1 elliptic curve cryptography.

## Features

- **Key Generation**: Create SECP256k1 key pairs (compatible with Bitcoin/ Ethereum)
- **Digital Signatures**: Sign and verify messages using ECDSA
- **BIP39 Mnemonics**: Convert between private keys and 24-word mnemonic phrases
- **Base58 Encoding**: Encode/decode hexadecimal data to Base58 format
- **Hybrid Encryption**: ECIES-style encryption combining:
  - Elliptic curve Diffie-Hellman for key exchange
  - AES-256-CBC for message encryption
  - HMAC-SHA256 for message authentication

## Prerequisites

Include the required libraries in your HTML:

```html
<!-- Elliptic curve library -->
<script src="https://cdn.jsdelivr.net/npm/elliptic@6.5.4/dist/elliptic.min.js"></script>

<!-- CryptoJS for hashing and encryption -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

<!-- Your module -->
<script src="crypto.js"></script>
```

## Usage

### Initialization

```javascript
const crypto = new CryptoModuleBrowser();
```

### Key Management

#### Generate Key Pair

```javascript
const { privateKey, publicKey } = crypto.generateKeyPair();
console.log('Private key:', privateKey);
console.log('Public key:', publicKey);
```

#### Convert Private Key to Mnemonic

```javascript
const privateKey = 'your_256bit_private_key_hex';
const mnemonic = crypto.privateKeyToMnemonic(privateKey);
console.log('24-word mnemonic:', mnemonic);
```

#### Convert Mnemonic to Private Key

```javascript
const mnemonic = 'abandon ability able ... (24 words)';
const privateKey = crypto.mnemonicToPrivateKey(mnemonic);
console.log('Private key:', privateKey);
```

### Digital Signatures

#### Sign a Message

```javascript
const message = 'Hello, world!';
const privateKey = crypto.generateKeyPair().privateKey;
const signature = crypto.signText(message, privateKey);
console.log('Signature:', signature);
```

#### Verify a Signature

```javascript
const message = 'Hello, world!';
const signature = 'der_signature_hex';
const publicKey = crypto.generateKeyPair().publicKey;
const isValid = crypto.verifySignature(message, signature, publicKey);
console.log('Is valid:', isValid);
```

### Base58 Encoding/Decoding

```javascript
const hexData = '00112233445566778899aabbccddeeff';
const base58 = crypto.toBase58(hexData);
console.log('Base58:', base58);

const decodedHex = crypto.fromBase58(base58);
console.log('Decoded hex:', decodedHex);
```

### Hybrid Encryption (ECIES)

#### Encrypt a Message

```javascript
const plaintext = 'Secret message for recipient';
const recipientPublicKey = 'recipient_public_key_hex';
const senderPrivateKey = 'sender_private_key_hex';

const encryptedPackage = crypto.encryptMessage(
    plaintext,
    recipientPublicKey,
    senderPrivateKey
);

console.log('Encrypted package:', encryptedPackage);
```

#### Decrypt as Recipient

```javascript
const encryptedPackage = '...'; // JSON string from encryptMessage
const recipientPrivateKey = 'recipient_private_key_hex';

const decryptedMessage = crypto.decryptAsRecipient(
    encryptedPackage,
    recipientPrivateKey
);
console.log('Decrypted message:', decryptedMessage);
```

#### Decrypt as Sender

```javascript
const encryptedPackage = '...'; // JSON string from encryptMessage
const senderPrivateKey = 'sender_private_key_hex';

const decryptedMessage = crypto.decryptAsSender(
    encryptedPackage,
    senderPrivateKey
);
console.log('Decrypted message:', decryptedMessage);
```

## API Reference

### Key Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `generateKeyPair()` | Generates a new SECP256k1 key pair | `{ privateKey, publicKey }` |
| `signText(text, privateKeyHex)` | Signs text using private key | Signature in DER hex format |
| `verifySignature(text, signatureHex, publicKeyHex)` | Verifies a signature | Boolean |
| `privateKeyToMnemonic(privateKeyHex)` | Converts private key to BIP39 mnemonic | String (24 words) |
| `mnemonicToPrivateKey(mnemonic)` | Converts mnemonic to private key | Hex string |
| `toBase58(hex)` | Encodes hex to Base58 | String |
| `fromBase58(base58)` | Decodes Base58 to hex | Hex string |
| `sha256(data)` | Computes SHA-256 hash | Hex string |

### Encryption Methods

| Method | Description |
|--------|-------------|
| `encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)` | Encrypts message with hybrid encryption |
| `decryptAsRecipient(encryptedPackageJson, myPrivateKeyHex)` | Decrypts as intended recipient |
| `decryptAsSender(encryptedPackageJson, myPrivateKeyHex)` | Decrypts as original sender |

## Security Features

- **SECP256k1** elliptic curve (same as Bitcoin/ Ethereum)
- **AES-256-CBC** for symmetric encryption
- **HMAC-SHA256** for message authentication
- **Ephemeral key pairs** for each encryption session (ECDH)
- **BIP39** compliant mnemonic generation

## Error Handling

All methods include error handling with descriptive messages:

```javascript
try {
    const privateKey = crypto.mnemonicToPrivateKey(invalidMnemonic);
} catch (error) {
    console.error('Invalid mnemonic:', error.message);
}
```

## Browser Support

Works in all modern browsers that support:
- ES6 (ECMAScript 2015)
- CryptoJS
- Elliptic library
- Web Crypto API (for random number generation)

## Dependencies

- [Elliptic](https://github.com/indutny/elliptic) - SECP256k1 implementation
- [CryptoJS](https://github.com/brix/crypto-js) - Hashing and AES encryption

## License

MIT

## Security Notes

- Store private keys securely (never expose them in client-side code in production)
- Use HTTPS for transmission of encrypted messages
- Consider additional authentication mechanisms for production use
- The BIP39 wordlist included is truncated for brevity - use the complete 2048-word list for production