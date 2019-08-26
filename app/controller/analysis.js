const Controller = require('egg').Controller;

class AnalaysisController extends Controller {
    async login() {
        let {account, password} = this.ctx.query
        this.ctx.body = this.ctx.service.user.login({account, password})
    }
}

module.exports = AnalaysisController;