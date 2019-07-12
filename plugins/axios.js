/**
 * redirect the admin panel to the homepage in-case of token expiry
 * @param  {[type]} options.$axios   [description]
 * @param  {[type]} options.redirect [description]
 * @return {[type]}                  [description]
 */
export default function({ $axios, redirect }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 500 && error.response.data.message === 'Token has expired') {
      redirect('/')
    }
  })
}
