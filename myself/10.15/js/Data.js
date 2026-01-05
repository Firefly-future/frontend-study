

const random=(min,max)=>Math.floor(Math.random()*(max-min+1)+min)
const firstName=['张','陈','刘','李','宋','孟','周','杨','艾','柳','白']
const lastName=['云长','翼德','孟德','玄德','伯符','仲达','孔明','卧龙','凤雏','银屏','孟起','汉生','子龙']


const createData=(length)=>{
    const res=[]
    for(let i=0;i<length;i++){
     res.push({
        name:firstName[Math.floor(Math.random()*(firstName.length))]+lastName[Math.floor(Math.random()*(lastName.length))],
        age:random(18,24),
        id:i,
        UID:Date.now()+1,
        gender:random(0,1),
        score:random(0,100),
     })  
    }
    return res
}
const data=createData(100)