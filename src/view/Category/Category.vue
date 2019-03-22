<template>
  <wrapper>
    <div slot="content">
      <Card>
        <Button type="primary" @click="addCategory">新增分类</Button>
      </Card>

      <div class="table-content">
        <Table :columns="columns" width="100%" :data="dataSource"></Table>
      </div>
      <Modal v-model="visible" title="新增分类" loading @on-ok="submit">
        <Form :label-width="80" ref="form" :model="formData" :rules="rules" v-if="visible">
          <FormItem label="分类等级" prop="category_type">
            <RadioGroup v-model="formData.category_type" @on-change="changeType">
              <Radio :label="1" style="margin-right: 20px">一级分类</Radio>
              <Radio :label="2">二级分类</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="所属分类" prop="parent_category" v-if="formData.category_type === 2">
            <Select v-model="formData.parent_category" style="width: 160px">
              <Option v-for="item in parent_types" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="分类名称" prop="name">
            <Input v-model="formData.name" placeholder="分类名称" />
          </FormItem>
        </Form>
      </Modal>
      <Modal v-model="delVisible" title="删除分类" loading @on-ok="deleteData">
        <p>是否删除当前分类？点击确认删除分类</p>
      </Modal>
    </div>
  </wrapper>
</template>

<script>
  import Wrapper from '../../components/Wrapper/Wrapper'
  import Columns from './columns'

  const FORM_DATA = {
    name: '',
    category_type: 1,
    parent_category: ''
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
          category_type: [
            {required: true, message: '请选择分类等级'},
          ],
          parent_category: [
            {required: true, message: '请选择所属分类'},
          ],
        },
        parent_types: [],
        dataSource: [],
        columns: Columns(this),
        delVisible: false,
        currentData: null,
        isEdit: false
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
            if (this.formData.category_type !== 1) {
              opt['parent_category'] = this.formData.parent_category
            }
            const payload = this.isEdit ? {
                method: 'PATCH',
                body: {...opt, id: this.currentData.id}
              } : {
              method: 'POST',
              body: opt
            }
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
          body: {
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
              category_type: Number(this.formData.category_type) - 1
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

<style scoped>

</style>
