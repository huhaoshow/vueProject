<template>
  <div class="editPersonal">
    <div class="head">
        <myHeader title="编辑资料">
            <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
        </myHeader>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/myHeader.vue'
export default {
  // 注册组件对象
  components: { myHeader }
}
</script>

<style lang='less' scoped>
</style>
