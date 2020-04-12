<template>
  <page-view>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="Service">
                <a-select
                  allowClear
                  mode="multiple"
                  v-model="queryParam.services"
                  placeholder="Select service"
                >
                  <a-select-option value="Facebook">Facebook</a-select-option>
                  <a-select-option value="Amazon">Amazon</a-select-option>
                  <a-select-option value="Google">Google</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh()"
                  >Search</a-button
                >
                <a-button
                  style="margin-left: 8px"
                  @click="() => (queryParam = {})"
                  >Reset</a-button
                >
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <Table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="service" slot-scope="text">
          <a-tag :color="text | serviceColor">{{ text }}</a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleBuy(record)">Buy</a>
        </span>
      </Table>
    </a-card>
  </page-view>
</template>

<script>
import { mapGetters } from 'vuex'
import { PageView } from '@layouts'
import Table from '@components/Table'
import { getAccountList } from '@api/accountApi'

export default {
  components: { PageView, Table },
  data() {
    return {
      queryParam: {},
      columns: [
        {
          title: 'Seller',
          dataIndex: 'seller',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
        },
        {
          title: 'Price',
          dataIndex: 'price',
        },
        {
          title: 'Service',
          dataIndex: 'service',
          scopedSlots: { customRender: 'service' },
        },
        {
          title: 'Updated at',
          dataIndex: 'updatedAt',
          sorter: true,
        },
        {
          title: 'Action',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' },
        },
      ],
      loadData: (parameter) => {
        console.log({ ...parameter, ...this.queryParam })
        return getAccountList({ ...parameter, ...this.queryParam }).then(
          (res) => res
        )
      },
    }
  },
  filters: {
    serviceColor(service) {
      return (
        {
          google: 'orange',
          facebook: 'green',
          amazon: 'cyan',
        }[service.toLowerCase()] || 'purple'
      )
    },
  },
  computed: {
    ...mapGetters('user', ['userName']),
  },
  methods: {
    handleBuy() {
      if (!this.userName) {
        this.$confirm({
          content: 'You must login to perform this action',
          onOk: () => {
            this.$router.push({ name: 'Login' })
          },
          onCancel() {},
        })
      }
    },
  },
}
</script>
