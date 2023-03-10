import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// import { statusFileImport } from '@/utils/constant'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 600000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }

    if (!navigator.onLine) {
      Message.closeAll()
      Message({
        message: 'No Internet Connection.',
        type: 'error',
        duration: 5 * 1000
      })
      return false
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (response.data) {
      const res = response.data
      return res
    }
    // if (res.status !== true) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //
    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    // }
  },
  error => {
    if (error.response && error.response.status) {
      if (error.response.status === 400 && error.response.data?.message === 'Too Many Attempts.') {
        Message.closeAll()
        Message({
          message: 'Too Many Attempts.',
          type: 'error',
          duration: 5 * 1000
        })
      }
      if (error.response.status === 422) {
        Message.closeAll()
        Message({
          message: error.response.data.message,
          type: 'error',
          duration: 5 * 1000
        })
        setTimeout(() => {
          location.reload()
        }, 100)
        // eslint-disable-next-line eqeqeq
      } else if (error.response.data.message == 'Unauthenticated.') {
        Message.closeAll()
        // to re-login
        Message({
          message: 'Logout',
          type: 'error',
          duration: 5 * 1000
        })
        store.dispatch('user/removeAuth').then(() => {
          setTimeout(() => {
            location.reload()
          }, 100)
        })
      } else if (error.response.status === 401) {
        Message.closeAll()
        Message({
          message: error.response.data.message,
          type: 'error',
          duration: 5 * 1000
        })
        // eslint-disable-next-line no-undef
      } else if (error.response.status === 403) {
        Message.closeAll()
        Message({
          message: error.response.data.message,
          type: 'error',
          duration: 5 * 1000
        })
        // eslint-disable-next-line no-undef
      } else if (error.response.status === 500 && error.response.data.message !== 'Database is currently locked. Please try again later.') {
        Message.closeAll()
        Message({
          message: error.response.data.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(error.response.data)
    }
    return Promise.reject()
  }
)

export default service
