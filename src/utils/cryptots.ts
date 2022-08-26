import CryptoJS from 'crypto-js'

/**
 * CryptoJS 加密
 *
 * @param {String} encryptData  需要加密数据
 * @returns 加密后的数据
 * @memberof Utils
 */
export const encrypt = (encryptData: string) => {
    var key = CryptoJS.enc.Utf8.parse('as-Crypto-js')
    var srcs = CryptoJS.enc.Utf8.parse(encryptData)
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
}

/**
 * CryptoJS 解密
 *
 * @param {String} encryptData  需要加密数据
 * @returns 解密后的数据
 * @memberof Utils
 */
export const decrypt = (encryptData: string) => {
    var key = CryptoJS.enc.Utf8.parse('as-Crypto-js')
    var decrypt = CryptoJS.AES.decrypt(encryptData, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

