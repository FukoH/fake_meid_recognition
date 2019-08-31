const Controller = require('egg').Controller;

class ProofController extends Controller {
    async login() {
        let {account, password} = this.ctx.query
        this.ctx.body = this.ctx.service.user.login({account, password})
    }
}

module.exports = ProofController;