import axios from 'axios'

export const getFilmList = ({
  type = 1
} = {}) => {
  return axios.get('https://m.maizuo.com/gateway', {
    params: {
      cityId: 110100,
      pageNum: 1,
      pageSize: 10,
      type,
      k: 4892903
    },
    headers: {
      'x-client-info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"17406486386215998793318401"}',
      'x-host': 'mall.film-ticket.film.list'
    }
  })
}
