<template>
  <div class="field" 
       v-if='main.fieldsSet'
       :class='{"field--active": active}'>
    <template v-if='active'>
      <router-link class="temp"
                  :to="{ name: 'info', params: {slug: post.slug} }">
                  {{post.title.rendered}} info
                </router-link>
      <!-- info panel -->
      <div class="field__info"
            :class='{"field__info--active": $route.name === "info"}'>
        <p v-html='post.acf.description' />
      </div>
    </template>
    <!-- main content -->
    <div class="field__items"
         ref='field'
         :class='{"field__items--collapsed": this.$route.name === "info"}'>
         <p class='field__items__title'
            v-if='post'
            v-html='post.title.rendered'/>
         <p v-else v-html='"post undefined"' />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'field',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['main']),
    active() {
      this.$route.params.slug === this.post.slug
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.temp {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
}

.field {
  color: black;
  width: 100%;
  height: 100%;
  padding: 20px;
  cursor: pointer;
  background: $white;
  transition: background 0.3s ease-in;

  &--active {
    background-color: red;
  }

  &:hover {
    background: rgb(255, 247, 232);
  }

  &__items {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease-in;
    padding: 20px;

    &__image {
      position: absolute;
      width: 40px;
      height: 40px;
    }

    &__title {
      width: 100%;
      text-align: center;
    }

    &--collapsed {
      width: 50%;
      right: 0;
    }
  }

  &__info {
    position: absolute;
    width: 50%;
    height: 100%;
    background: $white;
    top: 0;
    left: -50%;
    transition: left 0.3s ease-in;
    z-index: 9999999;

    &--active {
      left: 0;
    }
  }
}
</style>
