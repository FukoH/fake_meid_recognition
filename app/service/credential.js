const Service = require('egg').Service;

/**
 * 凭证相关Service
 */
class ProofService extends Service {
    /**
     * 生成凭证
     * @param {*} obj 
     */
    async add(obj) {
        try {
            let res = await this.app.mysql.insert('app_credential', {
                
            });
            return createResponse(res.insertId, res.affectedRows === 1, res.affectedRows === 1 ? '' : '创建凭证数据失败');
        } catch (err) {
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
                status: obj.status
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
module.exports = ProofService;