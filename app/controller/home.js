'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.app.console.warn(this.ctx.query.xss);
        this.ctx.body = 'Hello world';
    }
}

module.exports = HomeController;
