<template>
  <wrapper>
    <div slot="content">
      <div class="table-content">
        <Table :columns="columns" width="100%" :data="dataSource"></Table>
      </div>
    </div>
  </wrapper>
</template>

<script>
  import Wrapper from '../../components/Wrapper/Wrapper'
  import columns from "./columns";
  export default {
    name: "Comment",
    data() {
      return {
        columns: columns(this),
        dataSource: []
      }
    },
    created() {
      this.getCommentList()
    },
    methods: {
      async getCommentList() {
        const res = await this.$axios('/v1/api/comments');
        this.dataSource = res.data
      },
      replay(row) {

      }
    },
    components: {
      Wrapper,
    }
  }
</script>

<style scoped>

</style>
