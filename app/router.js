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
  // 组织信息
  router.get('/organization/:id', controller.organization.find)
  router.get('/organization', controller.organization.list)
  router.post('/organization', controller.organization.add)
  router.put('/organization', controller.organization.update)
  router.delete('/organization/:id', controller.organization.delete)
  // 数据统计
};
