import T from 'ant-design-vue/es/table/Table'

export default {
  data() {
    return {
      needTotalList: [],
      localLoading: false,
      localDataSource: [],
      localPagination: Object.assign({}, this.pagination),
    }
  },
  props: Object.assign({}, T.props, {
    rowKey: {
      type: [String, Function],
      default: 'key',
    },
    data: {
      type: Function,
      required: true,
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    showSizeChanger: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'default',
    },
    showPagination: {
      type: String | Boolean,
      default: 'auto',
    },
    pageURI: {
      type: Boolean,
      default: false,
    },
  }),
  watch: {
    'localPagination.current'(val) {
      this.pageURI &&
        this.$router.push({
          ...this.$route,
          name: this.$route.name,
          params: Object.assign({}, this.$route.params, {
            pageNo: val,
          }),
        })
    },
    pageNum(val) {
      Object.assign(this.localPagination, {
        current: val,
      })
    },
    pageSize(val) {
      Object.assign(this.localPagination, {
        pageSize: val,
      })
    },
    showSizeChanger(val) {
      Object.assign(this.localPagination, {
        showSizeChanger: val,
      })
    },
  },
  created() {
    const { pageNo } = this.$route.params
    const localPageNum =
      (this.pageURI && pageNo && parseInt(pageNo)) || this.pageNum
    this.localPagination =
      (['auto', true].includes(this.showPagination) &&
        Object.assign({}, this.localPagination, {
          current: localPageNum,
          pageSize: this.pageSize,
          showSizeChanger: this.showSizeChanger,
        })) ||
      false
    this.needTotalList = this.initTotalList(this.columns)
    this.loadData()
  },
  methods: {
    refresh(bool = false) {
      bool &&
        (this.localPagination = Object.assign(
          {},
          {
            current: 1,
            pageSize: this.pageSize,
          }
        ))
      this.loadData()
    },
    loadData(pagination, filters, sorter) {
      this.localLoading = true
      const parameter = Object.assign(
        {
          pageIndex:
            ((pagination && pagination.current) ||
              (this.showPagination && this.localPagination.current) ||
              this.pageNum) - 1,
          pageSize:
            (pagination && pagination.pageSize) ||
            (this.showPagination && this.localPagination.pageSize) ||
            this.pageSize,
        },
        (sorter &&
          sorter.field && {
            sortColumnName: sorter.field,
          }) ||
          {},
        (sorter &&
          sorter.order && {
            isAsc: sorter.order === 'ascend',
          }) ||
          {},
        {
          ...filters,
        }
      )
      const result = this.data(parameter)
      if (
        (typeof result === 'object' || typeof result === 'function') &&
        typeof result.then === 'function'
      ) {
        result.then((r) => {
          if (
            r.results.length === 0 &&
            this.showPagination &&
            this.localPagination.current > 1
          ) {
            this.localPagination.current--
            this.loadData()
            return
          }

          try {
            if (
              ['auto', true].includes(this.showPagination) &&
              r.total <= this.pageNum * this.localPagination.pageSize
            ) {
              this.localPagination.hideOnSinglePage = true
            }
          } catch (e) {
            this.localPagination = false
          }
          this.localDataSource = r.results
          this.localLoading = false
        })
      }
    },
    initTotalList(columns) {
      const totalList = []
      columns &&
        columns instanceof Array &&
        columns.forEach((column) => {
          if (column.needTotal) {
            totalList.push({
              ...column,
              total: 0,
            })
          }
        })
      return totalList
    },
  },

  render() {
    const props = {}
    const localKeys = Object.keys(this.$data)
    Object.keys(T.props).forEach((k) => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(
        1
      )}`
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey]
        return props[k]
      }
      this[k] && (props[k] = this[k])
      return props[k]
    })
    const table = (
      <a-table
        {...{ props, scopedSlots: { ...this.$scopedSlots } }}
        onChange={this.loadData}
      >
        {Object.keys(this.$slots).map((name) => (
          <template slot={name}>{this.$slots[name]}</template>
        ))}
      </a-table>
    )

    return <div class='table-wrapper'>{table}</div>
  },
}
