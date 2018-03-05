<template>
  <div class="main">
    <!-- <headbar /> -->
      <div v-for='(field, index) in fields'
           class="main__cluster"
           :class='"main__cluster--" + (index + 1)'>
           <div v-if='index < main.posts.length'
                class="main__cluster__field"
                :id='field.id'
                :style='{
                  zIndex: field.zIndex,
                  top: "-" + field.top + "px",
                  left: "-" + field.left + "px",
                  width: field.width,
                  height: field.height
                  }'
                @click='handleClick'>
                <field :post='main.posts[index]' />
           </div>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import field from '../components/field'
import headbar from '../components/headbar'

export default {
  name: 'main-new',
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
    handleClick(event) {
      if (this.$route.name === 'new') {
        if (!this.inTransition) {
          this.inTransition = true
          // find element and change data accordingly
          const rect = event.currentTarget.getBoundingClientRect()
          // loop through the fields and set styles on the current target
          this.fields.map((field) => {
            if (field.id === event.currentTarget.id) {
              if (this.activeField === 'none') {
                this.activeField = field.id
                field.zIndex = 999
                field.top = rect.top
                field.left = rect.left
                field.width = '100vw'
                field.height = '100vh'
              } else {
                this.activeField = 'none'
                field.zIndex = 0
                field.top = 0
                field.left = 0
                field.width = '100%'
                field.height = '100%'
              }
            }
          })
          this.$router.push({name: 'new single', params: {slug: event.currentTarget.id}})
          window.setTimeout(() => {
            this.inTransition = false
          }, 310)
        }
      }
    }
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
