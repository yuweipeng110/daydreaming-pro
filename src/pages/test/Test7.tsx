import { useEffect } from 'react';
import './index.less';

export default () => {
  useEffect(() => {
    const a = null;
    if (a === -1) {
      console.log('xxxx');
    }
  }, []);

  return (
    <>
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    </>
  );
};
