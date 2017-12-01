<style lang="less">
    @import '../styles/menu.less';
</style>

<template>
    <i-menu ref="sideMenu"
            :active-name="$route.name"
            :open-names="openNames"
            :theme="menuTheme"
            width="auto"
            @on-select="changeMenu">
        <template v-for="item in menuList">
            <i-menu-item v-if="item.children.length<=1"
                         :name="item.children[0].name"
                         :key="item.path">
                <i-icon :type="item.icon"
                        :size="iconSize"
                        :key="item.path">
                </i-icon>
                <span class="layout-text" :key="item.path">{{ itemTitle(item) }}</span>
            </i-menu-item>

            <i-submenu v-if="item.children.length > 1"
                        :name="item.name"
                        :key="item.path">
                <template slot="title">
                    <i-icon :type="item.icon"
                            :size="iconSize">
                    </i-icon>
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="child in item.children">
                    <i-menu-item :name="child.name"
                                 :key="child.name">
                        <i-icon :type="child.icon"
                                :size="iconSize"
                                :key="child.name">
                        </i-icon>
                        <span class="layout-text" :key="child.name">{{ child.title }}</span>
                    </i-menu-item>
                </template>
            </i-submenu>
        </template>
    </i-menu>
</template>

<script>
  export default {
    name: 'sidebarMenu',
    props: {
      menuList: Array,
      iconSize: Number,
      menuTheme: {
        type: String,
        default: 'dark'
      },
      openNames: {
        type: Array
      }
    },
    methods: {
      changeMenu (active) {
        this.$emit('on-change', active)
      },
      itemTitle (item) {
        if (typeof item.title === 'object') {
          return this.$t(item.title.i18n)
        } else {
          return item.title
        }
      }
    },
    updated () {
      this.$nextTick(() => {
        if (this.$refs.sideMenu) {
          this.$refs.sideMenu.updateOpened()
        }
      })
    }

  }
</script>
