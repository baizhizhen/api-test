import expandRow from './component/expandRow.vue'

export const projectRows = [
  {
    id: 10000000,
    name: '数尊塔',
    description: '数尊塔是用于风控的决策',
    createTime: '2017-11-12 12:20:00',
    author: '白志珍',
    rootPath: '/api',
    servers: [
      {
        id: 20001,
        name: '10.105.53.1:8080'
      },
      {
        id: 20002,
        name: '11.105.53.1:8080'
      }
    ],
    apis: [
      {
        id: 10001,
        name: '/task/'
      },
      {
        id: 10002,
        name: '/engine/'
      }
    ]
  },
  {
    id: 20000000,
    name: '数据链',
    description: '',
    createTime: '2017-11-12 13:11:00',
    author: 'Jason',
    rootPath: '/api',
    servers: [],
    apis: [
      {
        id: 10001,
        name: '/task/'
      },
      {
        id: 10002,
        name: '/engine/'
      }
    ]
  }
]

export const servers = [
  {
    id: 20001,
    name: '11.105.53.1:8080'
  }, {
    id: 20002,
    name: '11.105.53.1:8080'
  }
]

export const projectCols = [
  {
    type: 'expand',
    width: 50,
    render: (h, params) => {
      return h(expandRow, {
        props: {
          row: params.row
        },
        on: {
          'on-row-change': (row) => {//考虑怎样传递到父组件
            // this.$emit('on-row-change', row)
          }
        }
      })
    }
  },
  {
    title: '名称',
    align: 'center',
    key: 'name',
    width: 300,
    editable: true
  },
  {
    title: '接口',
    align: 'center',
    key: 'apis',
    render: (h, params) => {
      return h('span', {}, params.row.apis.length + '条')
    }
  },
  {
    title: '服务',
    align: 'center',
    key: 'servers',
    render: (h, params) => {
      return h('Poptip', {
        props: {
          trigger: 'hover',
          title: params.row.servers.length + '台服务',
          placement: 'bottom'
        }
      }, [
        h('Tag', {
          props: {
            color: params.row.servers.length > 0 ? 'green' : 'yellow'
          }
        }, params.row.servers.length + '台'),
        h('div', {
          slot: 'content'
        }, [
          h('ul', params.row.servers.map(item => {
            return h('li', {
              style: {
                textAlign: 'center',
                padding: '4px'
              }
            }, item.name)
          }))
        ])
      ])
    }
  },
  {
    title: '创建时间',
    align: 'center',
    key: 'createTime',
    width: 300
  },
  {
    title: '创建人',
    align: 'center',
    key: 'author'
  },
  {
    title: '操作',
    align: 'center',
    width: 200,
    key: 'handle',
    handle: ['delete']
  }
]

export default {projectRows, projectCols, servers}