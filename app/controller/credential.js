const Controller = require('egg').Controller;

class CredentialController extends Controller {
    async add() {
        let body = this.ctx.request.body
        this.ctx.body = await this.ctx.service.credential.add(body)
    }
    async update () {
        let body = this.ctx.request.body
        this.ctx.body = await this.ctx.service.credential.update(body)
    }
    async find () {
        let {id} = this.ctx.params
        this.ctx.body = await this.ctx.service.credential.find(id)
    }
    async list () {
        let query = this.ctx.query
        this.ctx.body = await this.ctx.service.credential.list(query)
    }
    async delete() {
        let {id} = this.ctx.params
        this.ctx.body = await this.ctx.service.credential.delete(id)
    }
}

module.exports = CredentialController;