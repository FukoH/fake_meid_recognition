const Controller = require('egg').Controller;

class ProofController extends Controller {
    async add() {
        let body = this.ctx.request.body
        this.ctx.body = this.ctx.service.credential.add(body)
    }
    async update () {
        let body = this.ctx.request.body
        this.ctx.body = this.ctx.service.credential.update(body)
    }
    async list () {

    }
    async delete() {

    }
}

module.exports = ProofController;