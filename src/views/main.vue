<template>
  <div class="main">
    <headbar />
    <router-link v-if='main.posts.length'
          v-for='(post, index) in main.posts'
          tag='div'
          class="main__cluster"
          :to='{name: "single", params: {slug: post.slug}}'
          :key='post.id'
          :class='"main__cluster--" + (post.index)'>
          <a v-html='post.title.rendered' @click.prevent/>
    </router-link>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import headbar from '../components/headbar'

export default {
  name: 'main',
  components: {
    headbar
  },
  computed: {
    ...mapState(['main'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_grid.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';
@import '../style/_main.scss';
</style>
