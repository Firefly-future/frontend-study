import axios from 'axios'

// 电影列表
export const getFilmList = ({
  pageNum = 1,
  pageSize = 10,
  type = 1
} = {}) => {
  return axios.get('https://m.maizuo.com/gateway', {
    params: {
      cityId: 110100,
      pageNum,
      pageSize,
      type,
      k: 4892903
    },
    headers: {
      'x-client-info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"17406486386215998793318401"}',
      'x-host': 'mall.film-ticket.film.list'
    }
  })
}

// 电影详情
export const getFilmDetail = (filmId) => {
  return axios.get('https://m.maizuo.com/gateway', {
    params: {
      filmId,
      k: 9583944
    },
    headers: {
      'x-client-info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"17406486386215998793318401"}',
      'x-host': 'mall.film-ticket.film.info'
    }
  })
}

// 影院列表
export const getCinemaList = ({ ticketFlag = 1 } = {}) => {
  return axios.get('https://m.maizuo.com/gateway', {
    params: {
      cityId: 110100,
      ticketFlag,
      k: 3865988
    },
    headers: {
      'x-client-info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"17406486386215998793318401"}',
      'x-host': 'mall.film-ticket.cinema.list'
    }
  })
}
