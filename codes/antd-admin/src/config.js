/**
 * 定义整个项目的全局配置
 */
module.exports = {
  name: 'OOXX管理后台',  // 项目的名字
  footer: '<a target="_blank" href="https://github.com/atlantis1024/react-step-by-step">Victor Zhang</a>版权所有 © 2017',  // footer中显示的字, 可以嵌入html标签

  debug: false,  // 是否开启debug模式, 不会请求后端接口, 使用mock的数据

  tabMode: {  // tab模式相关配置
    enable: false,  // 是否开启tab模式
    allowDuplicate: false,  // 同一个菜单项只允许一个tab
  },

  api: {  // 对后端请求的相关配置
    host: 'http://localhost:9527',  // 调用ajax接口的地址, 默认值空, 如果是跨域的, 服务端要支持CORS
    path: '/api',  // ajax请求的路径
    timeout: 15000,  // 请求的超时时间, 单位毫秒
  },

  login: {  // 登录相关配置
    check: '/check',  // 后端必须要提供接口校验当前用户的身份, 如果拿不到用户信息, 才会尝试登录

    // 登录有两种情况:

    // 1. 使用sso登录, 直接跳转就可以了
    sso: '',  // 是否使用单点登录? 是的话我会把地址encode后加到后面, 然后跳转, 如果这个是空字符串, 说明不使用单点登录
    // 2. 不使用sso, 使用我提供的一个登录界面
    login: '/login',  // 校验用户信息, 表单的submit地址. 如果登录成功, 必须返回用户名

    logout: '/logout',  // 退出的url, 用户点击退出时, 浏览器会直接跳转到这个链接
  },

  sidebar: {  // 侧边栏相关配置
    collapsible: true,  // 是否显示折叠侧边栏的按钮
    autoMenuSwitch: true,  // 只展开一个顶级菜单, 其他顶级菜单自动折叠
  },

  // 以下一些辅助的函数, 不要修改
  // 不能使用箭头函数, 会导致this是undefined

  /**
   * 是否要跨域请求
   *
   * @returns {boolean}
   */
  isCrossDomain() {

    if (this.api.host && this.api.host !== '') {
      console.debug("是跨域请求");
      return true;
    }
    return false;
  },

  /**
   * 是否单点登录
   *
   * @returns {boolean}
   */
  isSSO() {
    if (this.login.sso && this.login.sso !== '') {
      return true;
    }
    return false;
  },

  /**
   * 获得api请求的路径
   *
   * @returns {*}
   */
  getAPIPath() {
    if (this.tmpApiPath) { // 缓存
      return this.tmpApiPath;
    }

    const paths = [];

    // js的字符串处理真是麻烦
    if (this.isCrossDomain()) {
      // 去除结尾的'/'
      const tmp = this.api.host;
      let index = tmp.length - 1;
      // 如果超出指定的 index 范围，charAt返回一个空字符串
      while (tmp.charAt(index) === '/') {
        index--;
      }
      if (index < 0) {
        paths.push('');
      } else {
        paths.push(tmp.substring(0, index + 1));
      }
    } else {
      paths.push('');
    }

    if (this.api.path) {
      const tmp = this.api.path;
      let begin = 0;
      let end = tmp.length - 1;

      while (tmp.charAt(begin) === '/') {
        begin++;
      }
      while (tmp.charAt(end) === '/') {
        end--;
      }
      if (begin > end) {
        paths.push('');
      } else {
        paths.push(tmp.substring(begin, end + 1));
      }
    } else {
      paths.push('');
    }

    const tmpApiPath = paths.join('/');
    this.tmpApiPath = tmpApiPath;
    return tmpApiPath;
  },

};
