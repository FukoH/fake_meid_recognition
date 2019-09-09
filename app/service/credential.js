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
            let res = await conn.insert('app_credential', {
                organization_id: obj.organizationId,
                money: obj.money,
                status: STATUS.NEW,
                create_time: this.app.mysql.literals.now,
                create_user: obj.userId,
            });
            let credential_id = res.insertId
            let promises = [];
            // 时间类型需要转换后处理
            obj.recognitions.forEach(item => {
                promises.push(conn.insert('app_credential_recognition', {
                    credential_id,
                    ...item,
                    period: item.period ? new this.app.mysql.literals.Literal(`str_to_date(${item.period}, 'Y%-m%-d%')`): '',
                }));
            });
            // 执行玩所有内容
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
    async list({page = 0, pageSize = 10, ...queryParams}) {
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
     * 根据id查询凭证信息
     * @param {*} id 用户id
     */
    async find(id) {
        try {
            // 查询凭证信息和凭证下的串码信息
            let res = await this.app.mysql.select('app_credential',{
                where: { id }
            })
            return createResponse(res[0]);
        } catch (err) {
            return createResponse(null, false, '查询凭证数据失败:' + err);
        }
    }
    /**
     * 删除凭证信息
     * @param {*} id 凭证id
     */
    async delete(id) {
        let conn = await this.app.mysql.beginTransaction();
        try {
            let res = await conn.delete('app_credential', { id });
            // 删除掉关联的凭证串码信息
            await conn.delete('app_credential_recognition', { 
                credential_id: id,
            });
            conn.commit();
            return createResponse('', res.affectedRows === 1, res.affectedRows === 1 ? '' : '删除凭证数据失败：凭证不存在');
        } catch (err) {
            conn.rollback();
            return createResponse(null, false, '删除凭证数据失败:' + err);
        }
    }
}
module.exports = CredentialService;