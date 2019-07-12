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
          Update Article
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="updateArticle(id)">
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
              Update Article
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
      id: '',
      article_title: '',
      article_description: ''
    }
  },
  mounted() {
    this.id = this.$route.params.id // id of the article
    this.fetchArticle(this.id)
  },
  methods: {
    /**
     * used to fetch the article to updated
     * @return {[type]} [description]
     */
    fetchArticle(id) {
      const token = sessionStorage.getItem('token')
      const URL = `https://hidden-depths-47488.herokuapp.com/api/article/${id}`
      this.$axios({
        method: 'get',
        url: URL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          // eslint-disable-next-line
          const { article_title, article_description } = res.data.data
          // eslint-disable-next-line
          this.article_title = article_title
          // eslint-disable-next-line
          this.article_description = article_description
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err)
        })
    },
    /**
     * [updateArticle used to Update Article]
     */
    updateArticle(id) {
      // eslint-disable-next-line
      const { article_title, article_description } = this
      const data = { article_title, article_description }
      const token = sessionStorage.getItem('token')
      const URL = `https://hidden-depths-47488.herokuapp.com/api/article/${id}`
      this.$axios({
        method: 'put',
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
