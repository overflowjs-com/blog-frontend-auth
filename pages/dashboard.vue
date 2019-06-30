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
          Welcome, {{ name }}
        </v-card-title>
        <v-card-text>
          <v-btn @click="logOut">
            Log out
          </v-btn>
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
      name: ''
    }
  },
  mounted() {
    this.fetchUserDetails()
  },
  methods: {
    /**
     * [fetchUserDetails used to fetch user details]
     * @return {[type]} [none]
     */
    fetchUserDetails() {
      const token = sessionStorage.getItem('token')
      const URL = `https://hidden-depths-47488.herokuapp.com/api/user?token=${token}`
      this.$axios({
        method: 'get',
        url: URL,
        headers: {
          Accept: 'application/json'
        }
      })
        .then(res => {
          this.name = res.data.user.name
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err)
        })
    },
    /**
     * [logOut used to logout user]
     * @return {[type]} [none]
     */
    logOut() {
      const token = sessionStorage.getItem('token')
      const URL = `https://hidden-depths-47488.herokuapp.com/api/logout?token=${token}`
      this.$axios({
        method: 'get',
        url: URL,
        headers: {
          Accept: 'application/json'
        }
      })
        .then(_ => {
          sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err)
        })
    }
  }
}
</script>
