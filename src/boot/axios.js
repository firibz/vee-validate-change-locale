import {boot} from 'quasar/wrappers'
import axios from 'axios'
import {notification} from 'src/helpers/notification'
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({baseURL: process.env.API_BASE_URL})

export default boot(({app}) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  /* interceptors.response */
  axios.interceptors.response.use(
    response => {
      return response;
    },
    async (error) => {
      let message;
      if (error.response && error.response.data) {
        if (error.response.data.status_message) {
          message = error.response.data.status_message;
        } else if (error.response.data.errors) {
          message = error.response.data.errors[0];
        } else {
          console.log("axios error.response");
          console.log(error.response);
          message = "An error accrued."
        }
      } else {
        console.log("axios error");
        console.log(error);
        message = "An error accrued."
      }
      notification.showErrorMessage(message)
      return Promise.reject(error);
    },
  );

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export {api}
