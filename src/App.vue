<template>
  <router-view/>
  <FooterMusic/>
</template>

<script>
import FooterMusic from './components/item/FooterMusic.vue';
export default{
  components:{
    FooterMusic
  }
}

</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: 25px;
  height: 25px;
}
.a{
  color: #3f3f3f;
}
</style>
