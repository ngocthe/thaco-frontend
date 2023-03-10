
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: [
      {
        id: 1,
        code: 'admin',
        name: 'Admin ',
        permissions: [
          'wh_adjustment.list',
          'wh_adjustment.create',
          'wh_adjustment.view',
          'wh_adjustment.edit',
          'plant_wh_inventory_log.list',
          'plants.list',
          'plants.create',
          'plants.view',
          'plants.edit',
          'plants.delete'
        ]
      }
    ],
    introduction: 'I am a admin inventory',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: [
      {
        id: 2,
        code: 'admin_in',
        name: 'Admin Inventory',
        permissions: [
          'wh_adjustment.list',
          'wh_adjustment.view',
          'wh_adjustment.edit'
        ]
      }
    ],
    introduction: 'I am admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        status: true,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        status: true,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        status: true,
        data: 'success'
      }
    }
  }
]
