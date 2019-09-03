const Service = require('egg').Service;
const STATUS = {
    NEW: 0, // 待确认
    CONFIRM: 1,  // 已确认
    APPEAL: 2, // 申诉中
    APPEAL_DONE: 3, // 申诉已同意
    APPEAL_REFUSE: 4, // 申诉已拒绝
    FILE: 5, // 凭证已归档
}
const createResponse = require('../utils/model.js').createResponse
/**
 * 凭证相关Service
 */
class CredentialService extends Service {
    /**
     * 生成凭证
     * @param {*} obj 
     */
    async add(obj) {
        let conn = await this.app.mysql.beginTransaction();
        try {
            let res = await this.app.mysql.insert('app_credential', {
                organization_id: obj.organizationId,
                money: obj.money,
                status: STATUS.NEW,
                create_time: Date.now(),
                create_user: obj.userId,
            });
            // throw new Error()
            let credential_id = res.insertId
            let promises = []
            obj.recognitions.forEach(item => {
                promises.push(this.app.mysql.insert('app_credential_recognition', {
                    credential_id
                }));
            })
            await Promise.all(promises);
            conn.commit();
            return createResponse(res.insertId);
        } catch (err) {
            conn.rollback();
            return createResponse(null, false, '创建凭证数据失败' + err);
        }
    }

    /**
     * 更新凭证状态
     * @param {*} obj 
     */
    async update(obj) {
        try {
            let res = await this.app.mysql.update('app_credential', {
                id: obj.id,
                status: obj.status,
                description: obj.description
            });
            return createResponse('', res.affectedRows === 1, res.affectedRows === 1 ? '' : '更新凭证数据失败：凭证不存在');
        } catch (err) {
            return createResponse(null, false, '更新凭证数据失败:' + err);
        }
    }
    /**
     * 查询凭证列表
     * @param {*} page 
     */
    async list({page = 1, pageSize = 10, ...queryParams}) {
        try {
            let res = await await this.app.mysql.select('app_credential', {
                where: queryParams,
                limit: 10,
                offset: page * pageSize,
            })
            return createResponse(res);
        } catch (err) {
            return createResponse(null, false, '查询凭证数据失败:' + err);
        }
    }
    /**
     * 删除凭证信息
     * @param {*} id 凭证id
     */
    async delete(id) {
        try {
            let res = await this.app.mysql.delete('app_credential', { id });
            return createResponse('', res.affectedRows === 1, res.affectedRows === 1 ? '' : '删除凭证数据失败：凭证不存在');
        } catch (err) {
            return createResponse(null, false, '删除凭证数据失败:' + err);
        }
    }
}
module.exports = CredentialService;