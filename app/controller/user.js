const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {
        let {account, password} = this.ctx.query
        this.ctx.body = await this.ctx.service.user.login({account, password})
    }
    async find() {
        let {id} = this.ctx.params
        this.ctx.body = await this.ctx.service.user.find(id)
    }
    async list() {
        let query = this.ctx.query
        this.ctx.body = await this.ctx.service.user.list(query)
    }
    async add() {
        let body = this.ctx.request.body
        this.ctx.body = await this.ctx.service.user.add(body)
    }
    async delete() {
        let {id} = this.ctx.params
        this.ctx.body = await this.ctx.service.user.delete(id)
    }
    async update() {
        let body = this.ctx.request.body
        this.ctx.body = await this.ctx.service.user.update(body)
    }
}

module.exports = UserController;