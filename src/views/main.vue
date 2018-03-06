<template>
  <div class="main">
    <!-- <headbar /> -->
      <div v-for='(field, index) in fields'
           class="main__cluster"
           :class='"main__cluster--" + (index + 1)'>
           <router-link tag='div'
                :to='{name: "single", params: {slug: main.posts[index].slug}}'
                v-if='index < main.posts.length'
                class="main__cluster__field"
                :id='field.id'
                :ref='main.posts[index].slug'
                :style='{
                  zIndex: field.zIndex,
                  top: "-" + field.top + "px",
                  left: "-" + field.left + "px",
                  width: field.width,
                  height: field.height
                  }' >
                <field :post='main.posts[index]' />
           </router-link>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import field from '../components/field'
import headbar from '../components/headbar'

export default {
  name: 'main',
  components: {
    field,
    headbar
  },
  data() {
    return {
      inTransition: false,
      rectTop: 0,
      rectLeft: 0,
      activeField: 'none',
      fields: [
        {id: 'f1', zIndex: 0, top: 0, left: 0, width: '100%', height: '100%'},
        {id: 'f2', zIndex: 0, top: 0, left: 0, width: '100%', height: '100%'},
        {id: 'f3', zIndex: 0, top: 0, left: 0, width: '100%', height: '100%'},
        {id: 'f4', zIndex: 0, top: 0, left: 0, width: '100%', height: '100%'},
        {id: 'f5', zIndex: 0, top: 0, left: 0, width: '100%', height: '100%'},
        {id: 'f6', zIndex: 0, top: 0, left: 0, width: '100%', height: '100%'},
        {id: 'f7', zIndex: 0, top: 0, left: 0, width: '100%', height: '100%'},
        {id: 'f8', zIndex: 0, top: 0, left: 0, width: '100%', height: '100%'},
        {id: 'f9', zIndex: 0, top: 0, left: 0, width: '100%', height: '100%'}
      ]
    }
  },
  computed: {
    ...mapState(['main'])
  },
  methods: {
    updateSizes() {
      if (this.$route.name !== 'main') {
        const rect = document.getElementById(this.activeField).parentNode.getBoundingClientRect()
        this.fields.map((field) => {
          if (field.id === this.activeField) {
            field.top = rect.top
            field.left = rect.left
          }
        })
      }
    }
  },
  watch: {
    '$route'(to, from) {
      switch (to.name) {
        case ('main'):
          console.log('main!')
          this.fields.forEach(field => {
            this.activeField = 'none'
            field.zIndex = 0
            field.top = 0
            field.left = 0
            field.width = '100%'
            field.height = '100%'
          })
          break
        case ('single'):
          console.log('single!')
          const slug = this.$route.params.slug
          // some ugly dark magic to get the element
          const target = this.$refs[slug][0].$el
          // find the rect of the parent, because that always stays the same
          const rect = target.parentNode.getBoundingClientRect()
          // loop through the fields and set styles on the current target
          this.fields.map((field) => {
            if (field.id === target.id) {
              this.activeField = field.id
              field.zIndex = 999
              field.top = rect.top
              field.left = rect.left
              field.width = '100vw'
              field.height = '100vh'
            }
          })
          break
        case ('info'):
          break
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateSizes)
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_grid.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.main {
  background: $white;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0;
  grid-template-rows: repeat(10, 1fr);

  &__cluster {
    position: relative;
    transition: transform 0.3s ease-out;

    @include cluster-modifiers;

    &__field {
      background: $white;
      position: absolute;
      width: 100%;
      height: 100%;
      transition: all 0.3s ease-out;

      @include no-select;

      &--zoom {
        position: absolute;
        width: 100vw;
        height: 100vh;
      }

      &__image {
        width: 10%;
        height: auto;
      }
    }

    &--zoom {
      transform: scale(5);
    }
  }
}
</style>
