const Mock = require('mockjs')

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}

const ListAdjustment = []

for (let i = 0; i < count; i++) {
  ListAdjustment.push(Mock.mock({
    id: '@increment',
    warehouse_code: 'BWH',
    warehouse_description: 'Boned WH Area-1',
    part_code: 'KW019219',
    part_color_code: '01',
    quantity: 900000,
    plant_code: 'TMAC'
  }))
}

const ListProcurement = []

for (let i = 0; i < count; i++) {
  ListProcurement.push(Mock.mock({
    no: '@increment',
    part_no: 'KW2356720B',
    part_color_code: '01',
    minimum: '1000',
    standard_number: '10',
    parts_quantity_in_box: '100',
    unit: 'PIECES',
    procurement_supplier_code: 'MC',
    contract_no: 'VN-2107JM\tVN',
    plant_code: 'TMAC'
  }))
}

const PartsUsageResult = []

for (let i = 0; i < count; i++) {
  PartsUsageResult.push(Mock.mock({
    no: '@increment',
    parts_used_date: '04/01/2022',
    part_no: 'KW2356720B',
    part_color_code: '\t01',
    parts_used_quantity: '100',
    plant_code: 'TMAC'
  }))
}

const PartList = []

for (let i = 0; i < count; i++) {
  PartList.push(Mock.mock({
    no: '@increment',
    part_no: 'KW2356720B',
    part_name: 'PANEL ASSY-INST1',
    part_group: 'FP',
    ecn_no_in: '2C12345999',
    ecn_no_in_date: '03/11/2021',
    ecn_no_out: '2C123456000',
    ecn_no_out_date: '03/11/2021',
    plant_code: 'TMAC'
  }))
}

const ProductionPlan = []

for (let i = 0; i < count; i++) {
  ProductionPlan.push(Mock.mock({
    no: '@increment',
    planned_production_date: '31/05/2022',
    msc: 'D436AB3',
    exterior_color_code: '46G',
    production_volume: '30',
    input_file_name: 'input_file_20220520.xlsx'
  }))
}

const UPKWHInventory = []

for (let i = 0; i < count; i++) {
  UPKWHInventory.push(Mock.mock({
    id: '@increment',
    case_no: '376-RA-01',
    bl_no: 'VN-2107JM1',
    container_no: 'TCNU2343940',
    contract_no: 'VN-2107JM\tVN',
    invoice_no: 'VN-2107JM1',
    part_no: 'KW2356720B',
    part_color_code: '\t01',
    box_type_code: '',
    number_of_boxes_received_BWH: '9999',
    number_of_boxes_shipped_assembly_plant: '9999',
    date_box_shipped_assembly_plant: '29/11/2021',
    date_case_received: '29/11/2021',
    location_code: '4A-A-200',
    plant_code: 'TMAC'
  }))
}

const SupplierList = []

for (let i = 0; i < count; i++) {
  SupplierList.push(Mock.mock({
    id: '@increment',
    procurement_supplier_code: 'MCJPN',
    procurement_supplier_code_description: 'Osaka Rashi Hanbai',
    address_procurement_supplier: '3-1 Town, City, Prefecture, Japan',
    phone_no_procurement_supplier: '+81 06 1234567'
  }))
}

const ListSummary = []
for (let i = 0; i < count; i++) {
  ListSummary.push(Mock.mock({
    no: '@increment',
    warehouse_code: 'BWH-1',
    part_no: 'KW2356720B',
    part_color_code: '01',
    quantity: '900000',
    unit: 'PIECES',
    plant_code: 'TMAC'
  }))
}
const PlantWHList = []

for (let i = 0; i < count; i++) {
  PlantWHList.push(Mock.mock({
    no: '@increment',
    part_no: 'KW2356720B',
    part_color_code: '\t01',
    date_received_at_assembly_plant: '03/11/2021',
    box_type_code: '',
    parts_quantity_in_box: '\t9999\t',
    unit: 'PIECES',
    warehouse_code: 'TMACTCF-0'
  }))
}

const IntransitInventoryList = []

for (let i = 0; i < count; i++) {
  IntransitInventoryList.push(Mock.mock({
    no: '@increment',
    case_no: '376-RA-01',
    bl_no: 'VN-2107JM1',
    container_no: 'TCNU2343940',
    contract_no: 'VN-2107JM\tVN',
    invoice_no: 'VN-2107JM1',
    part_no: 'KW2356720B',
    part_color_code: '\t01',
    quantity_of_box: '\t9999\t',
    procurement_supplier_code: 'MCJPN\t',
    date_container_supplied: '29/11/2021',
    date_container_received: '29/11/2021',
    plant_code: 'TMAC'
  }))
}

const BWHInventoryList = []

for (let i = 0; i < count; i++) {
  BWHInventoryList.push(Mock.mock({
    no: '@increment',
    contract_no: 'VN-2107JM\tVN',
    bl_no: 'VN-2107JM1',
    container_no: 'TCNU2343940',
    case_no: '376-RA-01',
    invoice_no: 'VN-2107JM1',
    part_no: 'KW2356720B',
    part_color_code: '\t01',
    quantity_of_box: '\t9999\t',
    procurement_supplier_code: 'MCJPN\t',
    date_devanned: '29/11/2021',
    date_case_stored: '29/11/2021',
    location_code: '\t4A-A-200\t',
    date_shipped_upkwh: '29/11/2021',
    plant_code: 'TMAC'
  }))
}

const ShortagePartList = []

for (let i = 0; i < count; i++) {
  ShortagePartList.push(Mock.mock({
    no: '@increment',
    part_no: 'KW2356720A',
    part_color_code: '01',
    data: [
      { title: '01/05/2022', value: 0 },
      { title: '02/05/2022', value: 0 },
      { title: '03/05/2022', value: 0 },
      { title: '04/05/2022', value: 0 },
      { title: '05/05/2022', value: 10 },
      { title: '06/05/2022', value: 10 }
    ]
  }))
}

const UPKWHOrderPointControl = []

for (let i = 0; i < count; i++) {
  UPKWHOrderPointControl.push(Mock.mock({
    no: '@increment',
    part_no: 'KW2356720B',
    part_color_code: '\t01',
    standard_stock_part_box: '999',
    plant_code: 'TMAC'
  }))
}

const UserList = []

for (let i = 0; i < 1; i++) {
  UserList.push(Mock.mock({
    user_code: 'TMAC001',
    user_name: 'taro yamada',
    company: 'TMAC',
    role_name: 'PE Adminstrator'
  }))
}
for (let i = 1; i < count; i++) {
  UserList.push(Mock.mock({
    user_code: 'TMAC001',
    user_name: 'taro yamada1',
    company: 'TMAC',
    role_name: 'User'
  }))
}

const MSCList = []

for (let i = 1; i < count; i++) {
  MSCList.push(Mock.mock({
    no: '@increment',
    MSC: 'D436AB3',
    MSC_description: 'Macda CX5 Deluxe',
    interior_color_description: 'Soul Red',
    car_name: 'CX5',
    model_grade_name: 'CX5 Deluxe',
    body_description: '4SD',
    engine_description: 'CE2.0L',
    TM_description: '6AT',
    plant_code: 'TMAC',
    MSC_effective_date_in: '29/11/2022',
    MSC_effective_date_out: '01/12/2022'
  }))
}

const ProductionPlanList = []

for (let i = 1; i < count; i++) {
  ProductionPlanList.push(Mock.mock({
    no: '@increment',
    planned_production_date: '31/05/2022',
    msc: 'D436AB3',
    exterior_color_code: '46G',
    production_volume: '30',
    input_file_name: 'input_file_20220520.xlsx'
  }))
}

const BoxTypeList = []

for (let i = 1; i < count; i++) {
  BoxTypeList.push(Mock.mock({
    no: '@increment',
    part_no: 'KW2356720B',
    box_type_code: 'LLLTMAC',
    box_type_description: 'LL',
    box_weight_gram: '9999',
    size_box_x_mm: '9999',
    size_box_y_mm: '9999',
    size_box_z_mm: '9999',
    part_quantity_in_box: '9999',
    unit: 'PIECES',
    plant_code: 'TMAC'
  }))
}

module.exports = [
  {
    url: '/api/wh-adjustments',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = ListAdjustment.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/supplier-list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = SupplierList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/wh-inventory-summary',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = ListSummary.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/shortage-part-list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = ShortagePartList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/select',
    type: 'get',
    response: config => {
      return {
        'status': true,
        'message': 'Success',
        'data': [
          {
            'id': 1,
            'code': 'BWH-1'
          },
          {
            'id': 2,
            'code': 'BWH-2'
          },
          {
            'id': 3,
            'code': 'BWH-3'
          }
        ]
      }
    }
  },
  {
    url: '/api/bwh-inventory',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = BWHInventoryList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/procurement-list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = ListProcurement.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/parts-usage-result',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = PartsUsageResult.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/upkwh-inventory',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = UPKWHInventory.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'code': 20000,
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/upkwh-order-point-control',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = UPKWHOrderPointControl.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/part-list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = PartList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/production-plan-list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = ProductionPlan.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/plant-wh-list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = PlantWHList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'code': 20000,
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/user-list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = UserList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'code': 20000,
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/msc-list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = MSCList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'code': 20000,
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/production-plan-list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = ProductionPlanList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'code': 20000,
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/in-transit-inventory-log',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = IntransitInventoryList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'code': 20000,
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/api/box-type-list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, per_page = 20, sort } = config.query

      let mockList = BoxTypeList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

      return {
        'code': 20000,
        'status': true,
        'message': 'Success',
        'data': pageList,
        'pagination': {
          'total': 100,
          'total_page': 5,
          'per_page': per_page,
          'current_page': page
        }
      }
    }
  },
  {
    url: '/vue-element-admin/article/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        status: true,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            status: true,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/pv',
    type: 'get',
    response: _ => {
      return {
        status: true,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        status: true,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        status: true,
        data: 'success'
      }
    }
  }
]

