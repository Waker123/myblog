
function parse(str: string | null) {
    let value
    if (str) {
        value = JSON.parse(str)
    } else {
        value = null
    }
    return value
}

function stringify(obj: JSON) {
    let value
    try {
        value = JSON.stringify(obj)
    } catch {
        value = null
    }
    return value
}

// 通过构造useLocalStorage工具类来存储拿出本地存储的数据
export default function useLocalStorage() {
    function setItem(key: string, value: any) {
        value = stringify(value)
        window.localStorage.setItem(key, value)
    }
    function getItem(key: string) {
        let value = parse(window.localStorage.getItem(key))
        return value
    }
    return {
        setItem,
        getItem
    }
}

// 专门用来存取用户名的 可以动态增加的localStorage来存储用户信息
export function loginLocalStorage() {
    function setItem(key: string, loginKey: string, loginValue: Array<string>) {
        let value = getItem(key);//先获取以前的值
        if (value === null) value = {};//防止之前localStorage中没有值报错
        value[loginKey] = loginValue;//属性为加密后的用户名，属性值为加密后的密码和isLoading组成的数组
        value = stringify(value);
        window.localStorage.setItem(key, value)
    }
    function getItem(key: string) {
        let value = parse(window.localStorage.getItem(key))
        return value
    }
    return {
        setItem,
        getItem
    }
}