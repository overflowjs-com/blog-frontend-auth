<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-xs-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Register Here
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="registerUser">
            <v-text-field
              v-model="name"
              label="Name"
              required
            />
            <v-text-field
              v-model="email"
              label="Email"
              required
            />
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            />
            <v-btn type="submit">
              Sign Up
            </v-btn>
            Already Have a account? Login <nuxt-link to="/login">
              here
            </nuxt-link>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    /**
     * [registerUser used to register the user]
     * @return {[type]} [none]
     */
    registerUser() {
      const { name, email, password } = this
      const data = { name, email, password }
      const URL = 'https://hidden-depths-47488.herokuapp.com/api/register'
      this.$axios({
        method: 'post',
        url: URL,
        headers: {
          Accept: 'application/json',
          Content: 'application/json'
        },
        data: data
      })
        .then(res => {
          sessionStorage.setItem('token', res.data.token)
          this.$router.push('/dashboard')
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err)
        })
    }
  }
}
</script>
