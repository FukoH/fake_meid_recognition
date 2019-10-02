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
/**
 * 用于拼接SQL条件
 * like用户需要模糊匹配的字段
 * alias用户表中别名的替换
 */
function createSQL(sql, {where, limit, offset, like=[], alias=[], order=[]}) {
    let q = ''
    if (where) {
        let params = []
        for (let key in where) {
            if (where.hasOwnProperty(key) && where[key]) {
                if (like.includes(key)) { // 需要模糊匹配的字段
                    params.push(`${alias[key] || key} like '%${where[key]}%'`)
                } else {
                    params.push(`${alias[key] || key}='${where[key]}'`);
                }
            }
        }
        // 判断如果where条件存在数据再进行叠加
        if (params.length > 0) {
            q = ' where ' + params.join(' and ');
        }
    }
    if (order.length > 0) {
        q += ` order by ${order.join(',')}`
    }
    if (limit) {
        q += ` limit ${limit} `;
    }
    if (offset) {
        q += ` offset ${offset} `;
    }
    return sql + q
}
module.exports  = {
    createResponse,
    createSQL
}