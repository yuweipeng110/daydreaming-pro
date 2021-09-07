import './index.less';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2795224_xwzbo4ety.js',
});
export default () => {
  return (
    <>
      <div>
        <IconFont type="icon-grid" style={{fontSize: 25}} />
      </div>
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
