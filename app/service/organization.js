const Service = require('egg').Service;
const {createResponse, createSQL} = require('../utils/model.js')

/**
 * 平台信息Service
 */
class OrganizationService extends Service {
    /**
     * 添加用户信息
     * @param {*} obj 
     */
    async add(obj) {
        try {
            let res = await this.app.mysql.insert('app_organization', { 
                name: obj.name,
                phone: obj.phone,
                contactor: obj.contactor,
                province: obj.province,
                city: obj.city,
                collaborate_start: obj.startTime,
                collaborate_end: obj.endTime
             });
            return createResponse('', res.affectedRows === 1, res.affectedRows === 1 ? '' : '创建组织失败');
        } catch (err) {
            return createResponse(null, false, '创建组织失败:' + err);
        }
    }

    /**
     * 修改用户信息
     * @param {*} obj 
     */
    async update(obj) {
        try {
            let res = await this.app.mysql.update('app_organization', obj);
            return createResponse('', res.affectedRows === 1, res.affectedRows === 1 ? '' : '更新组织数据失败：用户不存在');
         } catch (err) {
             return createResponse(null, false, '更新组织数据失败:' + err);
         }
    }
    /**
     * 根据id查询用户信息
     * @param {*} id 用户id
     */
    async find(id) {
        try {
            let res = await this.app.mysql.select('app_organization',{
                where: { id }
            })
            return createResponse(res[0]);
        } catch (err) {
            return createResponse(null, false, '查询组织数据失败:' + err);
        }
    }
    /**
     * 
     * @param {*} page 
     */
    async list({page = 0, pageSize = 10, ...queryParams}) {
        try {
            let total = await this.app.mysql.count('app_organization',{
                ...queryParams,
            })
            let sql = createSQL('select * from app_organization', {
                where: queryParams,
                limit: pageSize,
                offset: page * pageSize,
                like: ['name'],
            });
            console.log(sql);
            let res = await this.app.mysql.query(sql);
            return createResponse({list: res, pagination: {currentPage: page, pageSize: pageSize, total}});
        } catch (err) {
            return createResponse(null, false, '查询组织数据失败:' + err);
        }
    }
    /**
     * 
     * @param {*} page 
     */
    async delete(id) {
        try {
            let res = await this.app.mysql.delete('app_organization', { 
                id,
             });
            return createResponse('', res.affectedRows === 1, res.affectedRows === 1 ? '' : '删除组织数据失败：用户不存在');
        } catch (err) {
            return createResponse(null, false, '删除组织数据失败:' + err);
        }
    }
}
module.exports = OrganizationService;