// 用于加工数据，把从端口接收到的数据中的/n改为<br/>
export default function processData(data: string) {
    return data.replaceAll('/n', "<br/>");
}