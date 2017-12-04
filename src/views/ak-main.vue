<template>
  <div class="main">
    <div class="main__compilation">
      <compilation/>
      <compilation/>
      <compilation/>
    </div>
    <div class="main__headbar">
      <headBar/>
    </div>
  </div>
</template>

<script>
import compilation from '../components/compilation'
import headBar from '../components/head-bar'
export default {
  name: 'ak-main',
  components: {
    compilation,
    headBar
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.main {
  color: red;
  clear: both;

  &__compilation {
    position: relative;
    width: 100vmin;
    height: 100vmin;
    background: black;
    float: left;
    overflow-y: scroll;

    @include hide-scroll;
  }

  &__headbar {
    height: 100vh;
    width: 50vh;
    text-align: right;
    float: left;
    background: -moz-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 40%);
    background: -webkit-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 40%);
    background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 40%);
    filter: progid:dximagetransform.microsoft.gradient(startColorstr='#000000', endColorstr='#00ffffff', GradientType=0);
  }
}
</style>
