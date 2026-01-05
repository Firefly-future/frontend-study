import type { userInfo } from "@/services/type"
import { useEffect, useState } from "react"
import { createApi, updateApi } from "@/services"
import { Input, Modal, Form, Select, message, InputNumber } from "antd"
type EditProps = {
  setOpen: (open: boolean) => void
  open: boolean
  onSuccess: () => void
  editRecord?: userInfo | null
}

const Edit = ({
  setOpen,
  open,
  onSuccess,
  editRecord,
}: EditProps) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  }
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [create, setCreate] = useState<userInfo>()
  const isEdit = !!editRecord
  const modalTitle = isEdit ? "编辑用户" : "创建用户"
  useEffect(() => {
    if (open) {
      if (isEdit) {
        // 编辑态：回显用户数据（注意类型转换，如sex转字符串适配Select）
        form.setFieldsValue({
          username: editRecord?.username,
          password: editRecord?.password, // 可选：密码是否回显（建议不回显，只让修改）
          age: editRecord?.age?.toString(), // InputNumber需字符串/数字
          sex: editRecord?.sex?.toString(), // Select的value是字符串
          email: editRecord?.email,
        })
      } else {
        // 创建态：清空表单
        form.resetFields()
      }
    }
  }, [open, isEdit, editRecord, form])

  const handleOk = () => {
    const values = form.getFieldsValue()
    if (
      !values.username ||
      !values.password ||
      !values.age ||
      !values.sex ||
      !values.email
    ) {
      message.error(
        `请填写完整信息：${!values.username ? "用户名、" : ""}${
          !values.password ? "密码、" : ""
        }${!values.age ? "年龄、" : ""}${!values.sex ? "性别、" : ""}${
          !values.email ? "邮箱" : ""
        }`
      )
      return
    } else {
      if (!isEdit) {
        const newUser = {
          ...values,
          sex: Number(values.sex),
          age: Number(values.age),
        }
        setCreate(newUser)
        setConfirmLoading(true)
        console.log(values)
        const getCreate = async () => {
          try {
            const res = await createApi(newUser)
            console.log(res)
            if (res.data.code === -1) {
              message.error(res.data.msg)
              setConfirmLoading(false)
              return
            } else {
              onSuccess()
              setTimeout(() => {
                setOpen(false)
                setConfirmLoading(false)
                message.success("创建成功")
              }, 2000)
            }
          } catch (e) {
            console.log(e)
          }
        }
        getCreate()
      } else {
        const values = form.getFieldsValue()
        const updateUser = {
          ...values,
          sex: Number(values.sex),
          age: Number(values.age),
          id: editRecord?.id,
        }
        setConfirmLoading(true)
        const getUpdate = async () => {
          try {
            const res = await updateApi(updateUser)
            console.log(res)

            if (res.data.code === -1) {
              message.error(res.data.msg)
              setConfirmLoading(false)
              return
            } else {
              onSuccess()
              setTimeout(() => {
                setOpen(false)
                setConfirmLoading(false)
                message.success("编辑成功")
              }, 2000)
            }
          } catch (e) {
            console.log(e)
          }
        }
        getUpdate()
      }
    }
  }
  const handleCancel = () => {
    setOpen(false)
    if (!isEdit) {
      message.error("取消创建")
    } else {
      message.error("取消编辑")
    }
  }
  return (
    <div>
      <Modal
        title={modalTitle}
        open={open}
        okText="确认"
        cancelText="取消"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          {...formItemLayout}
          form={form}
          style={{ width: "100%" }}
          initialValues={{ variant: "outlined" }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名!", min: 3, max: 12 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!", min: 3, max: 12 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="年龄"
            name="age"
            rules={[
              { required: true, message: "请输入年龄!"},
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={1} max={120} />
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            rules={[{ required: true, message: "请选择性别!" }]}
          >
            <Select
              options={[
                {
                  value: "1",
                  label: "男",
                },
                {
                  value: "0",
                  label: "女",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: "请输入正确格式的邮箱!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Edit
