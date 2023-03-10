/** When your routing table is too long, you can split it into small modules**/

import i18n from '@/i18n'
import Layout from '@/layout'
const asyncAdminRoutes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index'),
        name: i18n.t('dashboard'),
        meta: { title: i18n.t('dashboard'), icon: 'dashboard1' }
      }
    ]
  },
  {
    path: '/master',
    component: Layout,
    redirect: '/master/part-list',
    name: 'Master',
    meta: {
      title: 'Master',
      icon: 'inventory'
    },
    children: [
      {
        path: 'part-list',
        component: () => import('@/views/Master/PartList/index'),
        name: 'PartList',
        meta: { title: i18n.t('part_list'), model: 'part.list' }
      },
      {
        path: 'part-group',
        component: () => import('@/views/Master/PartGroupList/index'),
        name: 'PartGroup',
        meta: { title: i18n.t('part_group_list'), model: 'partGroup.list' }
      },
      {
        path: 'part-color',
        component: () => import('@/views/Master/PartColor/index'),
        name: 'PartColorList',
        meta: { title: i18n.t('part_color_list'), model: 'partColor.list' }
      },
      {
        path: 'bom',
        component: () => import('@/views/Master/Bom/index'),
        name: 'BOMList',
        meta: { title: i18n.t('bom_list'), model: 'bom.list'
        }
      },
      {
        path: 'ecn',
        component: () => import('@/views/Master/ECN/index'),
        name: 'ECN',
        meta: {
          title: i18n.t('ecn_list'), model: 'ecn.list'
        }
      },
      {
        path: '/msc-list',
        component: () => import('@/views/Master/MSCList/index'),
        name: 'MSCList',
        meta: { title: i18n.t('msc_list'), model: 'msc.list' }
      },
      {
        path: 'supplier-list',
        component: () => import('@/views/Master/SupplierList/index'),
        name: 'SupplierList',
        meta: { title: i18n.t('supplier_list'), model: 'supplier.list'
        }
      },
      {
        path: '/box-type-list',
        component: () => import('@/views/Master/BoxTypeList/index'),
        name: 'BoxTypeList',
        meta: { title: i18n.t('box_type_title'), model: 'boxType.list' }
      },
      {
        path: '/vehicle-color',
        component: () => import('@/views/Master/VehicleColor/index'),
        name: 'VehicleColor',
        meta: { title: i18n.t('vehicle_color_list'), model: 'vehicleColor.list' }
      },
      {
        path: 'procurement-list',
        component: () => import('@/views/Master/ProcurementList/index'),
        name: 'ProcurementList',
        meta: { title: i18n.t('procurement_list'), model: 'procurement.list' }
      },
      {
        path: '/user-list',
        component: () => import('@/views/Master/UserList/index'),
        name: 'UserList',
        meta: { title: i18n.t('user_list'), model: 'admin.list' }
      }
    ]
  },
  {
    path: '/mrp',
    component: Layout,
    redirect: '/mrp/parts-usage-result',
    name: i18n.t('mrp'),
    meta: {
      title: 'MRP',
      icon: 'mrp'
    },
    children: [
      {
        path: 'week-calendar',
        component: () => import('@/views/MRP/WeekCalendar/index'),
        name: 'WeekCalendar',
        meta: { title: i18n.t('mrp_week_definition_calendar'), model: 'mrpWeekDefinition.list'
        }
      },
      {
        path: 'production-plant-list',
        component: () => import('@/views/MRP/ProductionPlan/index'),
        name: 'ProductionPlanList',
        meta: { title: i18n.t('production_plan'), model: 'productionPlan.list'
        }
      },
      {
        path: 'parts-usage-result',
        component: () => import('@/views/MRP/PartsUsageResult/index'),
        name: 'PartsUsageResult',
        meta: { title: i18n.t('parts_usage_result'), model: 'partUsageResult.list' }
      },
      // {
      //   path: 'bom_list',
      //   component: () => import('@/views/example/list'),
      //   name: 'Bom List',
      //   meta: { title: 'Bom List' }
      // },
      // {
      //   path: 'ecn_list',
      //   component: () => import('@/views/example/list'),
      //   name: 'ECN List',
      //   meta: { title: 'ECN List' }
      // },
      {
        path: 'result',
        component: () => import('@/views/MRP/MRPResult/index'),
        name: 'Result',
        meta: { title: 'MRP Result', model: 'mrpResult.list' }
      },
      {
        path: 'order',
        component: () => import('@/views/MRP/OrderList/index'),
        name: 'Order',
        meta: { title: i18n.t('order_title'), model: 'mrpResult.list' }
      },
      {
        path: 'delivering-order',
        component: () => import('@/views/MRP/DeliveringOrder/index'),
        name: 'DeliveringOrder',
        meta: { title: i18n.t('delivering_order_title'), model: 'mrpResult.list' }
      },
      {
        path: 'logical-inventory',
        component: () => import('@/views/MRP/LogicalInventory/index'),
        name: 'LogicalInventory',
        meta: { title: i18n.t('logical_inventory_title'), model: 'logicalInventory.list' }
      },
      {
        path: '/ordering-calendar-list',
        component: () => import('@/views/MRP/OrderingCalendar/index'),
        name: 'OrderingCalendar',
        meta: { title: i18n.t('ordering_calendar_title'), model: 'mrpOrderCalendar.list' }
      },
      {
        path: 'shortage-part',
        component: () => import('@/views/MRP/ShortagePart/index'),
        name: 'ShortagePart',
        meta: { title: i18n.t('shortage_part_title'), model: 'shortagePart.list' }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/

  {
    path: '/inventory-control',
    component: Layout,
    redirect: '/inventory-control/warehouse-inventory-summary',
    name: 'Inventory Control',
    meta: {
      title: i18n.t('inventory_control'),
      icon: 'inventory'
    },
    children: [
      {
        path: 'warehouse-inventory-summary',
        component: () => import('@/views/InventoryControl/WarehouseInventorySummary/index'),
        name: 'WarehouseInventorySummary',
        meta: { title: i18n.t('warehouse_inventory_summary'), model: 'whInventorySummary.list' }
      },
      {
        path: 'in-transit-inventory-log',
        component: () => import('@/views/InventoryControl/IntransitInventoryLog/index'),
        name: 'InTransitInventoryLog',
        meta: { title: i18n.t('in_transit_inventory_log'), model: 'inTransitInventoryLog.list' }
      },
      {
        path: 'bwh-inventory-log',
        component: () => import('@/views/InventoryControl/BWHInventoryLog/index'),
        name: 'BWHInventoryLog',
        meta: { title: i18n.t('bwh_inventory_log'), model: 'bwhInventoryLog.list' }
      },
      {
        path: 'vietnam-source-log',
        component: () => import('@/views/InventoryControl/VietnamSourceLog/index'),
        name: 'VietnamSourceLog',
        meta: { title: i18n.t('vietnam_source_log'), model: 'inTransitInventoryLog.list' }
      },
      {
        path: 'upkwh-inventory-log',
        component: () => import('@/views/InventoryControl/UPKWHInventoryLog/index'),
        name: 'UPKWHInventoryLog',
        meta: { title: i18n.t('UPKWH_inventory_log'), model: 'upkwhInventoryLog.list' }
      },
      // {
      //   path: 'supplier_list3s',
      //   component: () => import('@/views/example/list'),
      //   name: 'UPK WH Inventory Log',
      //   meta: { title: 'UPK WH Inventory Log' }
      // },
      {
        path: 'plant-wh-inventory-log',
        component: () => import('@/views/InventoryControl/PlantWHInventoryLog/index'),
        name: 'PlantWHInventoryLog',
        meta: { title: i18n.t('plant_WH_inventory_log'), model: 'plantInventoryLog.list' }
      },
      {
        path: 'wh-adjustment',
        component: () => import('@/views/InventoryControl/WhAdjustment/index'),
        name: i18n.t('wh_adjustment'),
        // meta: { title: i18n.t('warehouse_adjustment'), model: 'wh_adjustment.list' }
        meta: { title: i18n.t('wh_adjustment'), model: 'warehouseSummaryAdjustment.list' }
      },
      {
        path: 'master',
        name: i18n.t('inventory_control_master'),
        component: () => import('@/views/InventoryControl/Master/index'),
        meta: { title: i18n.t('inventory_control_master') },
        children: [
          {
            path: 'plant_list',
            component: () => import('@/views/InventoryControl/Master/Plant/index'),
            name: i18n.t('plant_code_list'),
            meta: { title: i18n.t('plant_code_list'), model: 'plant.list' }
          },
          {
            path: 'warehouse',
            component: () => import('@/views/InventoryControl/Master/Warehouse/index'),
            name: i18n.t('warehouse_code_list'),
            meta: { title: i18n.t('warehouse_code_list'), model: 'warehouse.list' }
          },
          {
            path: 'wh-location',
            component: () => import('@/views/InventoryControl/Master/WHLocation/index'),
            name: i18n.t('wh_location_code_list'),
            meta: { title: i18n.t('wh_location_code_list'), model: 'warehouseLocation.list' }
          },
          {
            path: 'upkwh-order-point-control',
            component: () => import('@/views/InventoryControl/Master/UPKWHOrderPointControl/index'),
            name: 'UPKWHOrderPointControl',
            meta: { title: i18n.t('UPKWH_order_point_control') },
            children: [
              {
                path: 'ordering-point-control',
                component: () => import('@/views/InventoryControl/Master/UPKWHOrderPointControl/OrderingPointControl/index'),
                name: 'OrderingPointControl',
                meta: { title: i18n.t('ordering_point_control'), model: 'orderPointControl.list' }
              },
              {
                path: 'bwh-order-request',
                component: () => import('@/views/InventoryControl/Master/UPKWHOrderPointControl/BwhOrderRequest/index'),
                name: 'BwhOrderRequest',
                meta: { title: i18n.t('bwh_order_request'), model: 'bwhOrderRequest.list' }
              }
            ]
          }
        ]
      }
    ]
  },

  {
    path: '/import',
    component: Layout,
    name: 'Import',
    children: [
      {
        path: '',
        component: () => import('@/views/Import/index'),
        name: 'Import',
        meta: { title: i18n.t('import'), icon: 'import' }
      },
      {
        path: '/import/view-detail',
        component: () => import('@/views/Import/viewDetail'),
        name: 'ViewDetail',
        hidden: true
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    name: 'Setting',
    children: [
      {
        path: '',
        component: () => import('@/views/Setting/index'),
        name: 'Setting',
        meta: { title: i18n.t('Setting'), icon: 'setting', model: 'setting.list' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
export default asyncAdminRoutes
