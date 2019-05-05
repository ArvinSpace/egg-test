'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-04-29 14:29
 * Description:
 */

const Service = require('egg').Service;

class NewsService extends Service {
    
    /**
     * 查询列表
     * @param page
     * @returns {Promise.<Array>}
     */
    async list(page = 1) {
        // 读取配置
        const {serverUrl, pageSize} = this.config.news;
        
        // 通过HTTP客户端读取API数据
        const {data} = await this.ctx.curl(`${serverUrl}/nm9e4`, {
            data: {
                orderBy: '"$key"',
                startAt: `"${pageSize * (page - 1)}"`,
                endAt: `"${pageSize * page - 1}"`,
            },
            dataType: 'json'
        });
        
        const codeList = data.data;
        
        
        this.ctx.logger.info(`codeList: ${JSON.stringify(codeList)}`);
        
        // 并行获取详情数据
        const newsList = await Promise.all(
            codeList.map(code => {
                const url = `${serverUrl}/${code}`;
                
                this.ctx.logger.info(`${code} detail: ${url}`);
                
                return this.ctx.curl(url, {dataType: 'json'});
            })
        );
        
        return newsList.map(res => {
            this.ctx.logger.info(`res data: ${JSON.stringify(res.data)}`);
            
            return res.data;
        });
    }
    
    /**
     * 通过code查询详情
     * @param code
     * @returns {Promise.<*>}
     */
    async detail(code) {
        
        const url = `${this.config.news.serverUrl}/${code}`;
        const {data: result} = await this.ctx.curl(url, {dataType: 'json'});
        
        result.fromNow = this.ctx.helper.relativeTime(1540043086118);
        
        return result;
    }

}

module.exports = NewsService;
