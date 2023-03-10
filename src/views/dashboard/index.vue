<template>
  <div class="app-container">
    <el-row type="flex" class="row-bg flex-item">
      <el-col v-if="show_master" :span="5">
        <router-link :to="{ path: path_master }">
          <el-card class="box-card">
            <div class="body-card">
              <svg-icon icon-class="master" class="symbol" />
              <p class="text">
                {{ $t('master') }}
              </p>
            </div>
          </el-card>
        </router-link>
      </el-col>
      <el-col v-if="show_mrp" :span="5">
        <router-link :to="{ path: path_mrp }">
          <el-card class="box-card">
            <div class="body-card">
              <svg-icon icon-class="mrp" class="symbol" />
              <p class="text">
                {{ $t('MRP') }}
              </p>
            </div>
          </el-card>
        </router-link>
      </el-col>
      <el-col v-if="show_inventory" :span="5">
        <router-link :to="{path: path_inventory}">
          <el-card class="box-card">
            <div class="body-card">
              <svg-icon icon-class="inventory" class="symbol" />
              <p class="text">
                {{ $t('inventory_control') }}
              </p>
            </div>
          </el-card>
        </router-link>
      </el-col>
      <el-col :span="5">
        <router-link :to="{path: '/import'}">
          <el-card class="box-card">
            <div class="body-card">
              <svg-icon icon-class="import" class="symbol" />
              <p class="text">
                {{ $t('import') }}
              </p>
            </div>
          </el-card>
        </router-link>
      </el-col>
      <el-col v-if="show_setting" :span="5">
        <router-link :to="{path: '/setting'}">
          <el-card class="box-card">
            <div class="body-card">
              <svg-icon icon-class="setting" class="symbol" />
              <p class="text">
                {{ $t('setting') }}
              </p>
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg mb40 mr30" justify="end" align="end">
      <img style="width: 186px; height: 27px" src="@/assets/loginLogo.png">
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      show_master: false,
      show_mrp: false,
      show_inventory: false,
      show_import: true,
      show_setting: false,
      path_master: '/',
      path_mrp: '/',
      path_inventory: '/'
    }
  },
  created() {
    console.log(this.$store.state.permission.routes)
    this.$store.state.permission.routes.forEach(e => {
      console.log(e.name)
      console.log(e.hidden)
      if (e.name === 'Master' && e.children.length > 0) {
        this.show_master = true
        this.path_master = e.path + '/' + e.children[0].path
      }

      if (e.name === 'MRP' && e.children.length > 0) {
        this.show_mrp = true
        this.path_mrp = e.path + '/' + e.children[0].path
      }

      if (e.name === 'Inventory Control' && e.children.length > 0) {
        this.show_inventory = true
        this.path_inventory = e.path + '/' + e.children[0].path
      }

      if (e.name === 'Setting' && e.children.length > 0) {
        this.show_setting = true
      }
    })
  }
}
</script>

<style scoped lang="scss">

.app-container {
  display: flex;
  min-height: calc(100vh - 50px);
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}

.flex-item {
  column-gap: 20px;
}

.text {
  font-size: 14px;
}

.box-card {
  height: 208px !important;
  color: white;
  background: #0050B3;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.06), 0px 4px 8px 2px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.body-card{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .symbol {
    width: 28px;
    height: 28px;
  }
}
@media(max-width: 1024px) {
  .flex-item {
    column-gap: 0;
    flex-wrap: wrap;
    >.el-col {
      width: 50%;
    }
  }
}

</style>
