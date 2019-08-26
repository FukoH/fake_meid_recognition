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

    }

    /**
     * 修改用户信息
     * @param {*} obj 
     */
    async update(obj) {

    }

    /**
     * 删除用户信息
     * @param {*} id 
     */
    async delete(id) {

    }
    /**
     * 根据id查询用户信息
     * @param {*} id 用户id
     */
    async find(id) {

    }
    /**
     * 
     * @param {*} page 
     */
    async list(page = 1, pageSize = 10) {
        return await this.app.mysql.select('course',{
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
        return await this.app.mysql.select('course',{
            limit: 10,
            offset: 0
        })
    }
}
module.exports = UserService;