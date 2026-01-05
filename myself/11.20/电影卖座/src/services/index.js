import axios from "axios";
// axios.defaults.baseURL='/api'

const getCurrentCityId = () => {
  const city = JSON.parse(localStorage.getItem('currentCity')) || '{}'
  const city1 = JSON.parse(localStorage.getItem('GpsCity'))
  return city?.cityId || city1?.cityId || '110100'
}

// 获取电影列表
export const getFilm = ({ type = 1, pageNum = 1 } = {}) => {
  return axios.get("https://m.maizuo.com/gateway", {
    params: {
      cityId: getCurrentCityId(),
      pageNum,
      pageSize: 10,
      type,
      k: 1164357,
    },
    headers: {
      "x-client-info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"17636232961305730187526145","bc":"110100"}',
      "x-host": "mall.film-ticket.film.list",
    },
  });
};
// 获取影院列表
export const getCinema = ({ ticketFlag = 1 } = {}) => {
  return axios.get("https://m.maizuo.com/gateway", {
    params: {
      cityId: getCurrentCityId(),
      ticketFlag,
      k: 899545,
    },
    headers: {
      "x-client-info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"17636232961305730187526145","bc":"110100"}',
      "x-host": "mall.film-ticket.cinema.list",
    },
  });
};
// 获取影院详情
export const getCinemaDetail = (id) => {
  return axios.get("https://m.maizuo.com/gateway/", {
    params: {
      cinemaId: id,
      k: 8704093,
    },
    headers: {
      "x-client-info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"17636232961305730187526145","bc":"110100"}',
      "x-host": "mall.film-ticket.cinema.info",
    },
  });
};
// 获取电影详情
export const getFilmDetail = (id) => {
  return axios.get("https://m.maizuo.com/gateway", {
    params: {
      filmId: id,
      k: 9766775,
    },
    headers: {
      "x-client-info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"17636232961305730187526145","bc":"110100"}',
      "x-host": "mall.film-ticket.film.info"
    },
  });
};
// 获取影院中的电影
export const getCinemaFilm = (id) => {
  return axios.get("https://m.maizuo.com/gateway/", {
    params: {
      cinemaId: id,
      k: 9766775,
    },
    headers: {
      "x-client-info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"17636232961305730187526145","bc":"110100"}',
      "x-host": "mall.film-ticket.film.cinema-show-film"
    },
  });
};
// 获取影院中电影的播放时间
export const getCinemaFilmTime = ({ cinemaId, filmId, date }) => {
  return axios.get("https://m.maizuo.com/gateway/", {
    params: {
      cinemaId,
      filmId,
      date,
      k: 1638860,
    },
    headers: {
      "x-client-info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"17636232961305730187526145","bc":"110100"}',
      "x-host": "mall.film-ticket.schedule.list"
    },
  });
};

// 获取城市
export const getCity = () => {
  return axios.get('https://m.maizuo.com/gateway', {
    params: {
      k: 925235
    },
    headers: {
      "x-client-info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"17636232961305730187526145","bc":"110100"}',
      "x-host": "mall.film-ticket.city.list"
    }
  })
}

export const getGpsCity = ({ lat, long }) => {
  return axios.get('/api', {
    params: {
      k: 7206473
    },
    headers: {
      "x-client-info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"17636232961305730187526145","bc":"110100"}',
      "x-host": "mall.film-ticket.city.locate",
      latitude: lat,
      longitude: long
    }
  })
}