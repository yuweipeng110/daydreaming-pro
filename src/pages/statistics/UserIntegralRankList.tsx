import { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import './index.less';
import { IUserTable } from '@/pages/types/user';

export default () => {
  const [userRankListTotal, setUserRankListTotal] = useState<IUserTable[]>([]);
  const [userRankListKiller, setUserRankListKiller] = useState<IUserTable[]>([]);
  const [userRankListDetective, setUserRankListDetective] = useState<IUserTable[]>([]);
  const [userRankListPeople, setUserRankListPeople] = useState<IUserTable[]>([]);

  const loadRankData = () => {
    //
    const userRankList = [];
    setUserRankListTotal(userRankList[0] as IUserTable[]);
    setUserRankListKiller(userRankList[1] as IUserTable[]);
    setUserRankListDetective(userRankList[2] as IUserTable[]);
    setUserRankListPeople(userRankList[3] as IUserTable[]);
  };

  useEffect(() => {
    loadRankData();
  }, []);

  return (
    <div>
      <Carousel autoplay>
        <div className='carousel-content'>
          <h3>1</h3>
        </div>
        <div className='carousel-content'>
          <h3>2</h3>
        </div>
        <div className='carousel-content'>
          <h3>3</h3>
        </div>
        <div className='carousel-content'>
          <h3>4</h3>
        </div>
      </Carousel>
    </div>
  );
}
