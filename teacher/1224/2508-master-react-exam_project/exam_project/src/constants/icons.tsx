import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'


export const IconEnum = {
  'file-text': <DesktopOutlined />,
  'form': <FileOutlined />
} as const 

export type IconKeys = keyof typeof IconEnum