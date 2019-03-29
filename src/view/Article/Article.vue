<template>
  <wrapper>
    <div class="article" slot="content">
      <Card>
        <Form inline :label-width="80">
          <FormItem label="所属分类">
            <Select v-model="query.category_type" style="width: 180px">
              <Option v-for="item in categoryData" :value="item.category_type" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="文章类型">
            <Select v-model="query.article_type" style="width: 180px">
              <Option v-for="item in articleTypes" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="文章标题">
            <Input placeholder="文章标题" type="text" style="width: 200px"/>
          </FormItem>
          <FormItem label="发布时间">
            <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary">查询</Button>
          </FormItem>
        </Form>
        <Button type="primary" @click="addArticle">新增文章</Button>
      </Card>
      <div class="table-content">
        <Table :columns="columns" width="100%" :data="dataSource"></Table>
        <div class="page-wrapper">
          <Page :total="page.total" show-sizer />
        </div>
      </div>
      <Modal v-model="visible" loading width="1000px" title="新增" @on-ok="save">
        <div class="markdown-edit" v-if="visible">
          <div class="markdown-form">
            <Form ref="form" :label-width="70" :model="formData" :rules="rules">
              <FormItem label="标题" prop="articleTitle">
                <Input v-model="formData.articleTitle" placeholder="文章标题"/>
              </FormItem>
              <FormItem label="文章类型" prop="article_type">
                <Select v-model="formData.article_type" style="width: 200px" @on-change="setCategory">
                  <Option v-for="item in articleTypes" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="所属分类" prop="first_type" v-if="formData.article_type === 1">
                <Select v-model="formData.first_type" style="width: 200px" @on-change="setCategory">
                  <Option v-for="item in firstCategory" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <span v-if="secondCategory.length > 0" style="margin: 0 10px">-</span>
                <Select v-if="secondCategory.length > 0" v-model="formData.second_type" style="width: 200px"
                        @on-change="setSecondCategory">
                  <Option v-for="item in secondCategory" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="简介" prop="articleDesc">
                <Input v-model="formData.articleDesc" type="textarea" placeholder="文章描述"/>
              </FormItem>
              <FormItem label="封面" prop="imgSrc">
                {{formData.imgSrc}}
                <blog-upload @response="response" v-model="formData.imgSrc"></blog-upload>
              </FormItem>
              <FormItem :label-width="0" prop="markdownContent">
                <mavon-editor code-style="github"
                              ref="md"
                              :subfield="subField"
                              @subfieldToggle="subFieldToggle"
                              @save="save"
                              @change="change"
                              @imgAdd="imgAdd"
                              v-model="formData.markdownContent"
                              style="min-height: 500px"
                ></mavon-editor>
              </FormItem>
            </Form>
          </div>
        </div>
      </Modal>
      <Modal v-model="delVisible" title="删除分类" loading @on-ok="deleteData">
        <p>是否删除当前文章？点击确认删除</p>
      </Modal>
    </div>
  </wrapper>
</template>

<script>
  import Wrapper from '../../components/Wrapper/Wrapper'
  import BlogUpload from '../../components/BlogUpload/BlogUpload'
  import Columns from './columns'
  import {formatDate} from '../../utils/format'

  const FORM_DATA = {
    articleTitle: '',
    articleDesc: '',
    imgSrc: '',
    first_type: '',
    second_type: '',
    category_type: '',
    markdownContent: '',
    article_type: ''
  }
  export default {
    name: "Article",
    data() {
      return {
        query: {
          article_type: '',
          category_type: ''
        },
        category_text: '',
        visible: false,
        subField: true,
        markdownContent: '',
        formData: FORM_DATA,
        dataSource: [],
        columns: Columns(this),
        categoryData: [],
        firstCategory: [],
        secondCategory: [],
        isChange: false,
        currentData: null,
        markdown: '',
        content: '',
        rules: {
          articleTitle: [
            {required: true, message: '请输入文章标题'},
          ],
          articleDesc: [
            {required: true, message: '请输入文章描述'},
          ],
          article_type: [
            {required: true, message: '请选择文章类型'},
          ],
          imgSrc: [
            {required: false, message: '请上传封面图片'},
          ],
          first_type: [
            {required: true, message: '请选择所属分类'},
          ],
          markdownContent: [
            {required: true, message: '请输入文章内容'},
          ]
        },
        page: {
          pageSize: 10,
          page: 1,
          total: 0
        },
        articleTypes: [
          {id: 1, name: '技术'},
          {id: 2, name: '随记'},
        ],
        delVisible: false,
      }
    },
    created() {
      this.getArticle()
      this.getCategoryList()
    },
    methods: {
      addArticle() {
        this.visible = true
        this.isChange = false
        this.formData = FORM_DATA
      },
      subFieldToggle(status, value) {
        this.subField = status
      },
      response(data) {
        this.formData.imgSrc = data.image
      },
      getArticle() {
        const {page, pageSize} = this.page
        const opt = {
          page: page,
          page_size: pageSize
        }
        this.$store.dispatch('article/article', {
          body: opt
        }).then(res => {
          this.dataSource = res.data
          this.page.total = res.page.total
        })
      },
      imgAdd(pos, file) {
        const formData = new FormData()
        formData.append('image', file)
        this.upload(pos, formData)
      },
      upload(pos, formData) {
        this.$store.dispatch('article/upload', formData).then(res => {
          this.$emit('response', res.data)
          if (res.state === 0) {
            this.$Message.success('上传成功')
            this.$refs.md.$img2Url(pos, res.data.image)
          }
        })
      },
      save(value = this.markdown, render = this.content) {
        this.$refs.form.validate(valid => {
          if (valid) {
            const payload = {
              title: this.formData.articleTitle,
              desc: this.formData.articleDesc,
              content: render,
              markdown: value,
              img_src: this.formData.imgSrc,
              article_type: this.formData.article_type,
              category_type: this.category_text,
            }
            if (this.formData.article_type === 2) {
              payload.category_type = '随记'
            }
            if (this.isChange) {
              payload.id = this.currentData.id
              for (let key in payload) {
                if (!payload[key]) delete payload[key]
              }
              payload.update_time = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
            } else {
            }
            this.$store.dispatch('article/article', {
              method: this.isChange ? 'PATCH' : 'POST',
              body: payload
            }).then(res => {
              this.visible = false
              this.getArticle()
              this.$Message.success(res.message)
            })
          }
        })
      },
      getCategoryList() {
        this.$store.dispatch('article/category').then(res => {
          this.categoryData = res.data
          this.firstCategory = res.data.filter(item => item.category_type === 1)
        })
      },
      setCategory(value) {
        const data = this.categoryData.filter(item => item.id === value)
        this.category_text = data[0].name
        this.secondCategory = data[0].sub_category
      },
      setSecondCategory(value) {
        const name = this.secondCategory.filter(item => item.id === value)[0].name
        this.category_text += `,${name}`
      },
      modifyArticle(row) {
        this.visible = true
        this.isChange = true
        this.formData = {
          articleTitle: row.title,
          articleDesc: row.desc,
          imgSrc: row.img_src,
          first_type: row.id,
          category_type: row.category_type,
          article_type: row.article_type
        }
        this.formData.markdownContent = row.markdown
        this.currentData = row
      },
      deleteArticle(row) {
        this.delVisible = true
        this.currentData = row
      },
      deleteData() {
        this.$store.dispatch('article/article', {
          method: 'DELETE',
          body: {
            id: this.currentData.id
          }
        }).then(res => {
          this.$Message.success(res.message)
          this.getArticle()
          this.delVisible = false
        })
      },
      change(value, render) {
        this.markdown = value
        this.content = render
      },
      originalChange(row) {
        this.$store.dispatch('article/article', {
          method: 'PATCH',
          body: {
            id: row.id,
            original: !row.original
          }
        }).then(res => {
          this.$Message.success(res.message)
          this.getArticle()
        })
      }

    },
    components: {
      Wrapper,
      BlogUpload
    }

  }
</script>

<style lang="less" scoped>
  .article {
    /deep/.m-content {
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      white-space: normal;
      margin: 10px;
    }
  }
</style>
