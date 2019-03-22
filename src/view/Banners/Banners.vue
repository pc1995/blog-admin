<template>
  <wrapper>
    <div slot="content">
      <Card>
        <Form :label-width="80" inline>
          <FormItem label="归属产品">
            <Select v-model="query.product" style="width: 200px">
              <Option v-for="item in products" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="上传日期">
            <DatePicker type="date" placeholder="选择日期"></DatePicker>
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary">查询</Button>
          </FormItem>
        </Form>
        <Button type="primary" @click="addBanner">新增轮播图</Button>
      </Card>
      <div class="table-content">
        <Table :columns="columns" width="100%" :data="dataSource"></Table>
      </div>
      <Modal title="新增轮播图" width="560" loading v-model="visible" @on-cancel="cancel" @on-ok="addSubmit">
        <Form v-if="visible" :label-width="90" ref="form" :model="formData" :rules="rules">
          <FormItem label="归属产品" prop="product_name">
            <Select v-model="formData.product_name" style="width: 100%">
              <Option v-for="item in products" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="轮播图片" prop="image">
            <blog-upload v-model="formData.image" @response="response"></blog-upload>
          </FormItem>
          <FormItem label="关联ID">
            <Checkbox v-model="isId">
              是否关联本站
            </Checkbox>
          </FormItem>
          <FormItem v-if="isId" label="选择关联ID" prop="pid">
            <Select v-model="formData.pid" style="width: 100%">
              <Option v-for="item in articleList" :key="item.id" :value="item.id">{{item.title}}</Option>
            </Select>
          </FormItem>
          <FormItem label="链接" prop="link">
            <Input v-model="formData.link" placeholder="填写链接后关联ID将不会起作用" />
          </FormItem>
        </Form>
      </Modal>
      <Modal v-model="delVisible" loading @on-ok="submitDelete" title="删除轮播图">
        <p>是否删除当前轮播图？点击确认删除</p>
      </Modal>
    </div>
  </wrapper>
</template>

<script>
  import Wrapper from '../../components/Wrapper/Wrapper'
  import BlogUpload from '../../components/BlogUpload/BlogUpload'
  import Columns from './columns'

  const FORM_DATA = {
    product_name: '',
    image: '',
    pid: '',
    link: ''
  }
  export default {
    name: "Banners",
    data() {
      return {
        isId: false,
        products: [
          {
            label: '音乐',
            value: 'music'
          },
          {
            label: '文章',
            value: 'article'
          },
        ],
        query: {
          product: ''
        },
        formData: FORM_DATA,
        rules: {
          product_name: [
            {required: true, message: '请选择归属产品'},
          ],
          image: [
            {required: true, message: '请上传轮播图'},
          ],
          pid: [
            {required: true, message: '请选择关联的产品ID'},
          ],
        },
        visible: false,
        delVisible: false,
        articleList: [],
        dataSource: [],
        currentData: null,
        columns: Columns(this),
        isChange: false
      }
    },
    created() {
      this.getBannerList()
    },
    methods: {
      addBanner() {
        this.visible = true
      },
      getArticleList() {
        this.$store.dispatch('article/article').then(res => {
          this.articleList = res.data
        })
      },
      cancel() {
        this.visible = false
        this.formData = FORM_DATA
        this.isChange = false
        this.isId = false
      },
      refresh(res) {
        this.$Message.success(res.message)
        this.delVisible = false
        this.visible = false
        this.currentData = null
        this.formData = FORM_DATA
        this.isChange = false
        this.getBannerList()
      },
      addSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            const payload = {
              method: 'POST',
              body: this.formData
            }
            if (this.isChange) {
              payload.method = 'PATCH'
              payload.body = {
                ...this.formData,
                id: this.currentData.id
              }
            }
            Object.entries(payload.body).map(([key, value]) => {
              if (!value) delete payload.body[key]
            })
            this.$store.dispatch('banners/banners', payload).then(res => {
              if (res.state === 0) {
               this.refresh(res)
              }
            })
          }
        })
      },
      getBannerList() {
        this.$store.dispatch('banners/banners').then(res => {
          this.dataSource = res.data
        })
      },
      response(data) {
        this.formData.image = data.image
      },
      deleteBanner(row) {
        this.currentData = row
        this.delVisible = true
      },
      submitDelete() {
        this.$store.dispatch('banners/banners', {
          method: 'DELETE',
          body: {id: this.currentData.id}
        }).then(res => {
          if (res.state === 0) {
            this.refresh(res)
          }
        })
      },
      editBanner(row) {
        this.visible = true
        this.isChange = true
        this.currentData = row
        if (!!row.pid && row.pid !== null) {
          this.isId = true
        }
        Object.keys(this.formData).map(key => {
          if (key in row) {
            this.$set(this.formData, key, row[key])
          }
        })
      }
    },
    watch: {
      isId(val) {
        if (val) {
          this.getArticleList()
        }
      }
    },
    components: {
      Wrapper,
      BlogUpload
    }
  }
</script>

<style lang="less" scoped>
  /deep/.banner-img {
    width: 80px;
    height: 40px;
    display: block;
    margin: 10px auto;
  }
</style>
