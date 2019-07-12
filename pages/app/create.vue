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
      <v-card width="400px">
        <v-card-title class="headline">
          Create Article
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="addArticle">
            <v-text-field
              v-model="article_title"
              label="Article Heading"
              required
            />
            <v-text-field
              v-model="article_description"
              label="Article Description"
              required
            />
            <v-btn type="submit">
              Add Article
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      article_title: '',
      article_description: ''
    }
  },
  methods: {
    /**
     * [addArticle used to Add Article]
     */
    addArticle() {
      // eslint-disable-next-line
      const { article_title, article_description } = this
      const data = { article_title, article_description }
      const token = sessionStorage.getItem('token')
      const URL = 'https://hidden-depths-47488.herokuapp.com/api/article'
      this.$axios({
        method: 'post',
        url: URL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: data
      })
        .then(_ => {
          this.$router.push('/app')
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err)
        })
    }
  }
}
</script>
