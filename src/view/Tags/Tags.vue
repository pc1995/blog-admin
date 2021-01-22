<template>
  <div class="tags-wrapper">
    <Card>
      <Form>
        <FormItem>
          <Button type="primary" @click="add">新增标签</Button>
        </FormItem>
      </Form>
    </Card>
    <div class="table-content">
      <Table :columns="columns" :data="dataSource">

      </Table>
    </div>
    <Modal v-model="visible" title="新增分类" loading @on-ok="submit">
      <Form :label-width="120" ref="form" :model="formData" :rules="rules" v-if="visible">
        <FormItem label="标签名称" prop="name">
          <Input v-model="formData.name" placeholder="标签名称" />
        </FormItem>
         <FormItem label="标签类型(英文)" prop="type">
          <Input v-model="formData.type" placeholder="标签类型(英文)" />
        </FormItem>
        <FormItem label="标签图标" prop="icon">
          <Select v-model="formData.icon" style="width: 160px">
            <Option v-for="(item, index) in icons" :value="item" :label="item" :key="index">
              <div class="icon-tab">
                <span>{{item}}</span>
                <span class="iconfont" :class="item"></span>
              </div>
            </Option>
          </Select>

          <span class="iconfont" :class="formData.icon"></span>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import columns from "./columns";
  import icons from '../../utils/icon.name'

  const FORM_DATA = {
    name: '',
    icon: '',
    type: ''
  }
  export default {
    name: "Tags",
    data() {
      return {
        columns: columns(this),
        dataSource: [],
        visible: false,
        icons,
        type: 'add',
        formData: JSON.parse(JSON.stringify(FORM_DATA)),
        rules: {
          name: [
            {required: true, message: '请输入标签名称'},
          ],
           type: [
            {required: true, message: '请输入标签类型'},
          ],
          icon: [
            { required: true, message: '请选择标签图标' },
          ],
        },
        currentData: null
      }
    },
    created() {
      this.getTagList();
    },
    watch: {
      visible(visible) {
        if (!visible) {
          this.type = 'add'
        }
      }
    },
    methods: {
      getTagList() {
        this.$store.dispatch('article/tags').then(res => {
          this.dataSource = res.data
        })
      },
      add() {
        this.visible = true;
        this.type = 'add';
      },
      editTag(row) {
         this.visible = true;
        this.type = 'edit';
        this.formData = row;
        this.currentData = row;
      },
      deleteTag() {},
      submit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            const opt = {
              ...this.formData,
            }
            const payload = this.type === 'edit' ? {
              method: 'PATCH',
              body: {...opt, id: this.currentData.id}
            } : {
              method: 'POST',
              body: opt
            }
            Object.keys(payload.body).map(key => {
              if (!payload.body[key] && typeof payload.body[key] !== 'number') {
                delete payload.body[key]
              }
            })
            this.$store.dispatch('article/tags', payload).then(res => {
              this.$Message.success(res.message)
              this.getTagList()
              this.visible = false
              this.formData = {...FORM_DATA}
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
