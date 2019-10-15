const Service = require('egg').Service;
const {createResponse, createSQL} = require('../utils/model.js')
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
                create_time: this.app.mysql.literals.now,
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
            console.log(obj)
           let res = await this.app.mysql.update('app_user', {
                id: obj.id,
                account: obj.account,
                name: obj.name,
                role: obj.role,
                phone: obj.phone,
                organization_id: obj.organization_id,
            });
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
            return createResponse(null, false, '删除用户数据失败:' + err);
        }
    }
    /**
     * 批量删除用户数据
     * @param {*} obj 
     */
    async batchDelete(obj) {
        try {
            if (obj.ids) {
                let res = await this.app.mysql.query(`delete from app_user where id in(${obj.ids.join(',')})`)
                return createResponse('', res.affectedRows === obj.ids.length, res.affectedRows === obj.ids.length ? '' : '批量删除失败');
            } else {
                return createResponse('', false, '批量删除失败');
            }
        } catch (err) {
            return createResponse(null, false, '批量删除失败:' + err);
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
    async list({page = 0, pageSize = 10, ...queryParams}) {
        try {
            let total = await this.app.mysql.count('app_user',{
                ...queryParams,
            })
            let sql = createSQL('select au.*, ao.name as organization_name, ao.id as organization_id from app_user au left join app_organization ao on au.organization_id = ao.id', {
                where: queryParams,
                limit: pageSize,
                offset: page * pageSize,
                like: ['name', 'account'],
                alias: {'name': 'au.name', 'account': 'au.account'},
                order: ['au.create_time desc']
            });
            console.log(sql);
            let res = await this.app.mysql.query(sql);
            return createResponse({list: res, pagination: {currentPage: page, pageSize: pageSize, total}});
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
            if (res.length == 1 && res[0].password === user.password) {
                return createResponse(res[0])
            } else {
                return createResponse('', false, '登陆失败:账号名和密码不匹配')
            }
        } catch (err) {
            return createResponse(null, false, '登陆失败:' + err);
        }
    }
    /**
     * 修改个人密码
     * @param {*} obj 
     */
    async updatePwd(obj) {
        try {
            // 查询用户当前id
            let list = await this.app.mysql.select('app_user', {
                where: {id: obj.id}
            });
            if (list[0].password === obj.originalPwd && obj.newPassword === obj.confirmPassword) {
                let res = await this.app.mysql.update('app_user', {
                    id: obj.id,
                    password: obj.newPassword
                });
                return createResponse('', res.affectedRows === 1, res.affectedRows === 1 ? '' : '更新密码失败：用户不存在');
            } else {
                return createResponse('', false, '更新密码失败：密码不匹配');
            }
        } catch (err) {
            return createResponse(null, false, '更新密码失败:' + err);
        }
    }
    /**
     * 重置个人密码
     * @param {*} obj 
     */
    async resetPwd(obj) {
        try {
            // 存在数据信息，则重置密码
            let res = await this.app.mysql.update('app_user', {
                id: obj.id,
                password: '123456'
            });
            return createResponse('', res.affectedRows === 1, res.affectedRows === 1 ? '' : '重置密码成功：用户不存在');
        } catch (err) {
            return createResponse(null, false, '重置密码成功:' + err);
        }
    }
}
module.exports = UserService;