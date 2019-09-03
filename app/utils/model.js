/**
 * 处理mysql操作返回结果，其中mysql-egg操作返回结果
 * {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 304,
    "serverStatus": 2,
    "warningCount": 1,
    "message": "",
    "protocol41": true,
    "changedRows": 0
    }
 */
function handleDBData(data) {
    return {

    }
}
/**
 * 生成统一的响应数据结果
 */
function createResponse(data, success = true, errMsg = '') {
    return {
        data,
        success,
        errMsg,
    }
}
module.exports  = {
    createResponse
}