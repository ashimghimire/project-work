# AES Encryption Standard

Advanced Encryption Standard (AES): Advanced Encryption Standards (AES) are
block chippers. The data is encrypted progressively. Encryption and decryption
can be done independently. It has the same key for both encryption and decryption. It
performs all of its computation in bytes rather than bits. With such encryption, we can
encode the data in the mobile application.

AES is based on the Feistel cipher. It is based on the round of computation where
encryption is applied in various rounds. The number of rounds depends upon the
length of the key. AES uses 10 rounds for a 128-bit key length.

![aes_structure.jpg](AES%20Encryption%20Standard%2093a8914ba2e44191ae7ddab4b1729338/aes_structure.jpg)

# **Encryption**

A key size of 128 bits is chosen to accommodate 10 rounds of encryption. The key expansion algorithm handles the division of a key from a cipher key. After completion the ciphertext is obtained. Each round of encryption consists of 4 steps of modification which are.

![first_round_process.jpg](AES%20Encryption%20Standard%2093a8914ba2e44191ae7ddab4b1729338/first_round_process.jpg)

### **Byte Substitution (SubBytes)**

The 16 input bytes are substituted by looking up a fixed table (S-box) given in design. The result is in a matrix of four rows and four columns.

### **Shiftrows**

Each of the four rows of the matrix is shifted to the left. Any entries that ‘fall off’ are re-inserted on the right side of row. Shift is carried out as follows −

- First row is not shifted.
- Second row is shifted one (byte) position to the left.
- Third row is shifted two positions to the left.
- Fourth row is shifted three positions to the left.
- The result is a new matrix consisting of the same 16 bytes but shifted with respect to each other.

### **MixColumns**

Each column of four bytes is now transformed using a special mathematical function. This function takes as input the four bytes of one column and outputs four completely new bytes, which replace the original column. The result is another new matrix consisting of 16 new bytes. It should be noted that this step is not performed in the last round.

### **Addroundkey**

The 16 bytes of the matrix are now considered as 128 bits and are XORed to the 128 bits of the round key. If this is the last round then the output is the ciphertext. Otherwise, the resulting 128 bits are interpreted as 16 bytes and we begin another similar round.

# De**cryption**

The process of decryption of an AES ciphertext is similar to the encryption process in the reverse order. Each round consists of the four processes conducted in the reverse order −

- Add round key
- Mix columns
- Shift rows
- Byte substitution

Since sub-processes in each round are in reverse manner, unlike for a Feistel Cipher, the encryption and decryption algorithms needs to be separately implemented, although they are very closely related.

---

# System analogy diagram.

![ji.drawio.png](AES%20Encryption%20Standard%2093a8914ba2e44191ae7ddab4b1729338/ji.drawio.png)

Therefore we can obtain a fully encrypted end-to-end protected chat messaging system. The generation of the key will be on the server side.