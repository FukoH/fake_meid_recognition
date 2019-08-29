const Service = require('egg').Service;

/**
 * 用户相关Service
 */
class UserService extends Service {
    /**
     * 添加用户信息
     * @param {*} obj 
     */
    async add(obj) {
        return await this.app.mysql.insert('app_user', {
            account: obj.account,
            password: obj.password,
            name: obj.name,
            create_time: Date.now(),
            role: obj.role,
            phone: obj.phone,
            organization_id: obj.organization_id,
        });
    }

    /**
     * 修改用户信息
     * @param {*} obj 
     */
    async update(obj) {
        return await this.app.mysql.update('app_user', obj);
    }

    /**
     * 删除用户信息
     * @param {*} id 
     */
    async delete(id) {
        return this.app.mysql.delete('app_user', { id });
    }
    /**
     * 根据id查询用户信息
     * @param {*} id 用户id
     */
    async find(id) {
        return await this.app.mysql.select('app_user',{
            where: { id },
            limit: 10,
            offset: 0
        })
    }
    /**
     * 
     * @param {*} page 
     */
    async list(page = 1, pageSize = 10) {
        return await this.app.mysql.select('app_user',{
            limit: 10,
            offset: 0
        })
    }
    /**
     * 用户登陆
     * @param {*} user 登陆用户信息
     */
    async login(user = {account: '', password: ''}) {
        // 通过用户名查询用户信息
        return await this.app.mysql.select('app_user',{
            limit: 10,
            offset: 0
        })
    }
}
module.exports = UserService;