import style from "./filter.module.scss"
import type { FilterSearch, userInfo } from "@/services/type"
import {
  Button,
  Form,
  Input,
  Space,
  type FormProps,
  Select,
  Flex,
  InputNumber,
} from "antd"

type FieldType = {
  username?: string
  age?: number
  sex?: 0 | 1
  email?: string
}

type FilterProps = {
  list: userInfo[]
  onFilter: (list: userInfo[]) => void
  onTotal: (total: number) => void
  onFilterChange: (params: FilterSearch) => void
}

const Filter = ({ list, onFilter, onTotal, onFilterChange }: FilterProps) => {
  const [form] = Form.useForm()
  const allList = list

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // console.log("Success:", values)
    const filterParams: FilterSearch = {
      username: values.username,
      age: values.age,
      sex: values.sex,
      email: values.email,
    }
    onFilterChange(filterParams)

    const filteredList = list.filter((item) => {
      const usernameMatch = values.username
        ? item.username?.toLowerCase().includes(values.username.toLowerCase())
        : true
      const ageMatch =
        values.age !== undefined ? item.age === Number(values.age) : true
      const sexMatch =
        values.sex !== undefined ? item.sex === Number(values.sex) : true
      const emailMatch = values.email
        ? item.email?.toLowerCase().includes(values.email.toLowerCase())
        : true
      return usernameMatch && ageMatch && sexMatch && emailMatch
    })
    onFilter(filteredList)
    onTotal(filteredList.length)
  }
  const onReset = () => {
    form.resetFields()
    onFilterChange({})
    onFilter(allList)
    onTotal(allList.length)
  }

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <div className={style.filter}>
      <Form
        form={form}
        layout="inline"
        // labelCol={{ span: 8 }}
        wrapperCol={{ span: 18 }}
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Flex style={{ padding: "0 100px" }}>
          <Form.Item<FieldType>
            label="姓名"
            name="username"
            style={{ flex: "1" }}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="年龄" name="age" style={{ flex: "1" }}>
            <InputNumber style={{ width: "100%" }} min={1} max={120} />
          </Form.Item>
          <Form.Item<FieldType> label="性别" name="sex" style={{ flex: "1" }}>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="请选择性别"
              allowClear
              options={[
                { label: "男", value: 1 },
                { label: "女", value: 0 },
              ]}
            />
          </Form.Item>
          <Form.Item<FieldType> label="邮箱" name="email" style={{ flex: "1" }}>
            <Input />
          </Form.Item>
        </Flex>
        <Form.Item style={{ flex: "1", padding: "20px 0 0 100px" }}>
          <Space>
            <Button
              type="primary"
              size="large"
              style={{ marginRight: 10, width: "100px" }}
              htmlType="submit"
            >
              搜索
            </Button>
            <Button
              htmlType="button"
              size="large"
              onClick={onReset}
              style={{ marginRight: 10, width: "100px" }}
            >
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Filter
