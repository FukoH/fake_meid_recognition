const Service = require('egg').Service;
const createResponse = require('../utils/model.js').createResponse
/**
 * 用户相关Service
 */
class UserService extends Service {
    /**
     * 添加用户信息
     * @param {*} obj 
     */
    async add(obj) {
        try {
            let list = await this.app.mysql.select('app_user', {
                where: {account: obj.account}
            });
            if (list.length === 1) {
                return createResponse(null, false, '创建用户数据失败，账号名已存在');
            }
            let res = await this.app.mysql.insert('app_user', {
                account: obj.account,
                password: obj.password,
                name: obj.name,
                create_time: Date.now(),
                role: obj.role,
                phone: obj.phone,
                organization_id: obj.organization_id,
            });
            return createResponse(res.insertId, res.affectedRows === 1, res.affectedRows === 1 ? '' : '创建用户数据失败');
        } catch (err) {
            return createResponse(null, false, '创建用户数据失败' + err);
        }
    }

    /**
     * 修改用户信息
     * @param {*} obj 
     */
    async update(obj) {
        try {
           let res = await this.app.mysql.update('app_user', obj);
           return createResponse('', res.affectedRows === 1, res.affectedRows === 1 ? '' : '更新用户数据失败：用户不存在');
        } catch (err) {
            return createResponse(null, false, '更新用户数据失败:' + err);
        }
    }

    /**
     * 删除用户信息
     * @param {*} id 
     */
    async delete(id) {
        try {
            let res = await this.app.mysql.delete('app_user', { id });
            return createResponse('', res.affectedRows === 1, res.affectedRows === 1 ? '' : '删除用户数据失败：用户不存在');
        } catch (err) {
            return createResponse(null, false, '更新用户数据失败:' + err);
        }
    }
    /**
     * 根据id查询用户信息
     * @param {*} id 用户id
     */
    async find(id) {
        try {
            let res = await this.app.mysql.select('app_user',{
                where: { id }
            })
            return createResponse(res[0]);
        } catch (err) {
            return createResponse(null, false, '查询用户数据失败:' + err);
        }
    }
    /**
     * 
     * @param {*} page 
     */
    async list({page = 0, pageSize = 10}) {
        try {
            console.log(page, pageSize)
            let res = await await this.app.mysql.select('app_user',{
                limit: 10,
                offset: page * pageSize,
            })
            return createResponse(res);
        } catch (err) {
            return createResponse(null, false, '查询用户数据失败:' + err);
        }
    }
    /**
     * 用户登陆
     * @param {*} user 登陆用户信息
     */
    async login(user = {account: '', password: ''}) {
        // 通过用户名查询用户信息
        try {
            let res = await this.app.mysql.select('app_user',{
                where: {
                    account: user.account
                }
            })
            return createResponse('', res[0].password === user.password, res[0].password === user.password ? '' : '登陆失败:账号名和密码不匹配')
        } catch (err) {
            return createResponse(null, false, '登陆失败:' + err);
        }
    }
}
module.exports = UserService;