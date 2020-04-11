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
                  v-model="queryParam.status"
                  placeholder="Select service"
                >
                  <a-select-option value="0">Facebook</a-select-option>
                  <a-select-option value="1">Amazon</a-select-option>
                  <a-select-option value="2">Google</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)"
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
        rowKey="key"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
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
        },
        {
          title: 'Action',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' },
        },
      ],
      loadData: (parameter) => {
        console.log('loadData.parameter', parameter)
        return new Promise((res) => {
          setTimeout(
            () =>
              res({
                total: 100,
                results: [
                  {
                    id: 1,
                    seller: 'admin',
                    amount: 1,
                    price: 1,
                    service: 'google',
                  },
                ],
              }),
            1000
          )
        })
      },
    }
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
