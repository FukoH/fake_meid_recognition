const Controller = require('egg').Controller;

class OrganizationController extends Controller {
    async add() {
        let body = this.ctx.request.body
        this.ctx.body = await this.ctx.service.organization.add(body)
    }
    async update () {
        let body = this.ctx.request.body
        this.ctx.body = await this.ctx.service.organization.update(body)
    }
    async list () {
        let query = this.ctx.query
        this.ctx.body = await this.ctx.service.organization.list(query)
    }
    async find () {
        let {id} = this.ctx.params
        this.ctx.body = await this.ctx.service.organization.find(id)
    }
    async delete() {
        let {id} = this.ctx.params
        this.ctx.body = await this.ctx.service.organization.delete(id)
    }
}

module.exports = OrganizationController;