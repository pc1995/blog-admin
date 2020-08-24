<template>
  <div slot="content">
    <Card>
      <Button type="primary" @click="addCategory">新增分类</Button>
    </Card>

    <div class="table-content">
      <Table :columns="columns" width="100%" :data="dataSource"></Table>
    </div>
    <Modal v-model="visible" title="新增分类" loading @on-ok="submit">
      <Form :label-width="80" ref="form" :model="formData" :rules="rules" v-if="visible">
        <FormItem label="分类名称" prop="name">
          <Input v-model="formData.name" placeholder="分类名称" />
        </FormItem>
        <FormItem label="栏目图标" prop="icon">
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
        <FormItem label="排序">
          <Input v-model="formData.sort" placeholder="排序" />
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="delVisible" title="删除分类" @on-ok="deleteData">
      <p>是否删除当前分类？点击确认删除分类</p>
    </Modal>
  </div>
</template>

<script>
  import Wrapper from '../../components/Wrapper/Wrapper'
  import Columns from './columns'
  import icons from '../../utils/icon.name'

  const FORM_DATA = {
    name: '',
    icon: '',
    sort: 1,
  }
  export default {
    name: "Category",
    data() {
      return {
        visible: false,
        formData: {...FORM_DATA},
        rules: {
          name: [
            {required: true, message: '请输入分类名称'},
          ],
          icon: [
            { required: true, message: '请选择栏目图标' },
          ],
        },
        parent_types: [],
        dataSource: [],
        columns: Columns(this),
        delVisible: false,
        currentData: null,
        isEdit: false,
        icons,
        iconVisible: false
      }
    },
    created() {
      this.getCategoryList()
    },
    methods: {
      addCategory() {
        this.visible = true
      },
      submit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            const opt = {
              ...this.formData,
              category_type: Number(this.formData.category_type)
            }
            const payload = this.isEdit ? {
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
            this.$store.dispatch('article/category', payload).then(res => {
              this.$Message.success(res.message)
              this.getCategoryList()
              this.visible = false
              this.formData = {...FORM_DATA}
            })
          }
        })
      },
      deleteCategory(row) {
        this.currentData = row
        this.delVisible = true
      },
      editCategory(row) {
        this.formData.name = row.name
        this.formData.category_type = row.category_type
        this.formData.parent_category = row.parent_category
        this.currentData = row
        this.visible = true
        this.isEdit = true
        this.changeType(row.category_type)
      },
      deleteData() {
        this.$store.dispatch('article/category', {
          method: 'DELETE',
          params: {
            id: this.currentData.id
          }
        }).then(res => {
          this.$Message.success('删除分类成功')
          this.getCategoryList()
          this.delVisible = false
        })
      },
      changeType(value) {
        console.log('value', value)
        if (value === 2) {
          this.$store.dispatch('article/category', {
            method: 'GET',
            body: {
              category_type: 1
            }
          }).then(res => {
            this.parent_types = res.data
          })
        }
      },
      getCategoryList() {
        this.$store.dispatch('article/category').then(res => {
          this.dataSource = res.data
        })
      }
    },
    components: {
      Wrapper
    }
  }
</script>

<style lang="less" scoped>
  .icon-tab {
    display: flex;
    justify-content: space-between;
  }
</style>
