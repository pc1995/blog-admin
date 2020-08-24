<template>
  <div slot="content">
    <Card>
      <Form inline :label-width="100">
        <FormItem label="时间">
          <DatePicker placeholder="选择时间"></DatePicker>
        </FormItem>
        <FormItem label="用户名">
          <Input placeholder="用户名" />
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary">查询</Button>
        </FormItem>
      </Form>
    </Card>
    <div class="table-content">
      <Table :columns="columns" width="100%" :data="dataSource"></Table>
    </div>
  </div>
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
      this.getCommentList();
    },
    methods: {
      async getCommentList() {
        const res = await this.$axios('/v1/api/comments');
        this.dataSource = res.data
      },
      replay(row) {

      },
      async delete(row) {
        const res = await this.$axios('/v1/api/comments', {
          method: 'DELETE',
          params: {
            id: row.id
          }
        })
        if (res.state === 0) {
          this.$Message.success(res.message)
        } else {
          this.$Message.error(res.message)
        }
        this.getCommentList();
      }
    },
    components: {
      Wrapper,
    }
  }
</script>

<style scoped>

</style>
