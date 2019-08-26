'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  /**
   * 用户
   */
  router.post('/login', controller.user.login)
  router.get('/user/:id', controller.user.find)
  router.get('/user', controller.user.list)
  router.post('/user', controller.user.add)
  router.put('/user', controller.user.update)
  router.delete('/user/:id', controller.user.delete)
  // 凭证
  // 串码
  // 平台信息
  // 数据统计
};
