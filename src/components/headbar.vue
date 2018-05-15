<template>
  <div class="headbar main__cluster main__cluster--home"
       @mouseover='showAll'
       @mouseout='hideAll'>
    <a  class='headbar__top'
        :class='{"headbar__top--expanded": showLinks}'
        href='https://www.youtube.com/user/artyomkocharyan'>
      Burial Artyomovich
    </a>
    <router-link  class='headbar__item'
                  tag='a'
                  :to="{ name: 'main' }">
      Artyom Kocharyan
    </router-link>
    <a  class='headbar__bottom'
        :class='{"headbar__bottom--expanded": showLinks}'
        href='https://www.instagram.com/burial_artyomovich/'>
      Instagram
    </a>
  </div>
</template>

<script>
export default {
  name: 'headbar',
  data() {
    return {
      showLinks: false
    }
  },
  methods: {
    showAll() {
      if (this.$route.name === 'main') this.showLinks = true
    },
    hideAll() {
      if (this.$route.name === 'main') this.showLinks = false
    }
  }
}
</script>

<style lang="scss">
@import '../style/_variables.scss';

$head-line: 24px;

.headbar {
  flex-direction: column;
  text-align: center;
  position: relative;
  line-height: $head-line;

  &__top,
  &__bottom {
    opacity: 0;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;

    &--expanded {
      opacity: 1;
    }
  }

  &__top {
    height: 0;

    &--expanded {
      height: $head-line;
    }
  }

  &__bottom {
    margin-top: calc(-1 * #{$head-line});
    height: $head-line;

    &--expanded {
      margin-top: 3px;
    }
  }
}
</style>
