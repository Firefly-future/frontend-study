import { useCallback, useEffect, useState } from "react"
import { listApi, delUserApi, exportApi } from "@/services"
import type { FilterSearch, userInfo } from "@/services/type"
import { Space, Table, Button, Modal, message, Tag } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import style from "./consumerlist.module.scss"
import Password from "./components/password/Password"
import Filter from "./components/filter/Filter"
import { ExclamationCircleFilled } from "@ant-design/icons"
import Edit from "./components/edit/Edit"
import * as XLSX from "xlsx"

const ConsumerList = () => {
  const { confirm } = Modal
  const showConfirm = (id: string) => {
    confirm({
      title: `确定要删除用户${id}吗？`,
      icon: <ExclamationCircleFilled />,
      centered: true,
      content: "删除后将无法恢复，是否继续？",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        handleDel(id)
      },
      onCancel() {
        message.info(`已取消删除用户${id}`)
      },
    })
  }
  const handleDel = async (id: string) => {
    try {
      setLoading(true)
      await delUserApi(id)
      await getListData()
      const isLastPage =
        pagination.page === Math.ceil((total || 0) / pagination.pagesize)
      const isLastRecord = list.length === 1
      // 如果是最后一页最后一条，且当前页码大于1，则跳转到上一页
      if (isLastPage && isLastRecord && pagination.page > 1) {
        setPagination((prev) => ({
          ...prev,
          page: prev.page - 1,
        }))
      } else {
        // 否则刷新当前页数据
        await getListData()
      }
      // 同步更新全量数据
      await getAllListData()
      message.success(`删除用户${id}成功`)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const sexMap = {
    1: "男",
    0: "女",
  }
  const columns: TableColumnsType<userInfo> = [
    {
      title: "序号",
      dataIndex: "no",
      align: "center",
      render: (_, _record) => _record.no,
    },
    {
      title: "用户id",
      dataIndex: "id",
      align: "center",
      render: (_, _record) => _record.id,
    },
    {
      title: "用户名",
      dataIndex: "username",
      align: "center",
      render: (_, _record) => _record.username,
    },
    {
      title: "年龄",
      dataIndex: "age",
      align: "center",
      render: (_, _record) => _record.age,
    },
    {
      title: "性别",
      dataIndex: "sex",
      align: "center",
      render: (_, _record) => {
        return (
          <Tag color={_record.sex === 1 ? "green" : "error"}>
            {sexMap[_record.sex as 1 | 0]}
          </Tag>
        )
      },
    },
    {
      title: "邮箱",
      dataIndex: "email",
      align: "center",
      render: (_, _record) => _record.email,
    },
    {
      title: "密码",
      dataIndex: "password",
      align: "center",
      // render: (_, _record) => _record.password,
      render: (_, _record) => <Password password={_record.password} />,
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (_, _record) => {
        return (
          <Space>
            <Button
              type="link"
              onClick={() => {
                setOpen(true)
                setEditRecord(_record) // 传递编辑记录
              }}
            >
              编辑
            </Button>
            <Button type="link" onClick={() => showConfirm(_record.id)}>
              删除
            </Button>
          </Space>
        )
      },
    },
  ]

  const [filterParams, setFilterParams] = useState<FilterSearch>({})
  const [list, setList] = useState<any>([])
  const [originList, setOriginList] = useState<userInfo[]>([]) // 新增
  const [total, setTotal] = useState<number | null>()
  const [loading, setLoading] = useState<boolean>(false)

  const [open, setOpen] = useState(false)
  const [editRecord, setEditRecord] = useState<userInfo | null>(null) // 新增

  const [pagination, setPagination] = useState({
    page: 1,
    pagesize: 5,
  })
  const params = {
    page: pagination.page,
    pagesize: pagination.pagesize,
    ...filterParams,
  }
  const getListData = async () => {
    try {
      setLoading(true)
      const res = await listApi(params)
      // console.log(res)
      setList(res.data.values.list)
      setTotal(res.data.values.total)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
  const handleTableChange: TableProps<userInfo>["onChange"] = (
    paginationConfig
  ) => {
    if (loading) return
    setPagination({
      ...pagination,
      page: paginationConfig.current!,
      pagesize: paginationConfig.pageSize!,
    })
  }
  const handleFilterChange = (params: FilterSearch) => {
    setFilterParams(params)
    // 筛选时重置页码到第一页
    setPagination((prev) => ({ ...prev, page: 1 }))
  }
  useEffect(() => {
    getListData()
  }, [pagination.page, pagination.pagesize, filterParams])

  const getAllListData = async () => {
    try {
      setLoading(true)
      const res = await listApi({ page: 1, pagesize: 10000, ...filterParams })
      const full = res.data.values.list
      setOriginList(full) // 原始备份，永不修改
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getAllListData()
  }, [filterParams])
  const refreshList = useCallback(() => {
    getListData() // 重新拿当前页数据
    getAllListData() // 同时把全量备份也更新一下（Filter 组件会用到）
  }, [pagination.page, pagination.pagesize, filterParams])

  type TableRowSelection<T extends object = object> =
    TableProps<T>["rowSelection"]
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const start = () => {
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }
  const rowSelection: TableRowSelection<userInfo> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const hasSelected = selectedRowKeys.length > 0

  // 前端导出数据表格格式
  // const exportBefore = () => {
  //   const cnList = selectedRowKeys.map((item) => {
  //     const record = originList.find((record) => record.id === item)
  //     if (!record) return {}
  //     return {
  //       序号: record?.no,
  //       用户id: record?.id,
  //       用户名: record?.username,
  //       年龄: record?.age,
  //       性别: record?.sex === 1 ? "男" : record?.sex === 0 ? "女" : "未知",
  //       邮箱: record?.email,
  //       密码: record?.password,
  //     }
  //   })
  //   // 创建一个excel表格
  //   const workbook = XLSX.utils.book_new()
  //   const worksheet1 = XLSX.utils.json_to_sheet(
  //     selectedRowKeys.map((item) =>
  //       originList.find((record) => record.id === item)
  //     )
  //   )
  //   const worksheet2 = XLSX.utils.json_to_sheet(cnList)
  //   XLSX.utils.book_append_sheet(workbook, worksheet1, "用户数据.xlsx")
  //   XLSX.utils.book_append_sheet(workbook, worksheet2, "用户数据中文表头.xlsx")
  //   XLSX.writeFile(workbook, "用户数据列表.xlsx")
  //   message.success("导出成功！")
  // }
  // 导出数据
  // const exportData = () => {
  //   start()
  //   setLoading(true)
  //   setTimeout(() => {
  //     exportBefore()
  //     setSelectedRowKeys([])
  //     setLoading(false)
  //   }, 500)
  // }
  // 后端导出数据表格格式
  const exportData = async () => {
    try {
      setLoading(true)
      const res = await exportApi(selectedRowKeys as string[])
      console.log(res.data)
      const url = window.URL.createObjectURL(res.data)
      console.log(url)
      const link = document.createElement("a")
      link.href = url
      link.download = "用户数据列表.xlsx"
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (e) {
      console.log(e)
    } finally {
      setSelectedRowKeys([])
      setLoading(false)
      message.success("导出成功！")
    }
  }

  return (
    <div>
      {open && (
        <Edit
          setOpen={setOpen}
          open={open}
          onSuccess={refreshList}
          editRecord={editRecord} // 传递创建记录
        />
      )}
      <Space>
        <Filter
          list={originList}
          onFilter={setList}
          onTotal={setTotal}
          onFilterChange={handleFilterChange}
        />
      </Space>
      <div className={style.add}>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setOpen(true)
              setEditRecord(null) // 清空编辑数据，标记为创建态
            }}
          >
            创建用户
          </Button>
          <Button
            onClick={exportData}
            disabled={!hasSelected}
            loading={loading}
          >
            导出数据
          </Button>
          {hasSelected ? `选择了 ${selectedRowKeys.length} 条数据` : null}
        </Space>
      </div>
      <Table<userInfo>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={originList}
        loading={loading}
        scroll={{y:340}}
        size="large"
        rowKey="id"
        onChange={handleTableChange}
        pagination={{
          total: total!,
          size: "small",
          current: pagination.page,
          pageSize: pagination.pagesize,
          showTotal: (total) => `共 ${total} 条数据`,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
          showQuickJumper: true,
        }}
      />
    </div>
  )
}

export default ConsumerList