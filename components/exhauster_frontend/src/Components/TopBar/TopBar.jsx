import clsx from 'clsx';
import PropTypes from 'prop-types';

import './TopBar.css';

function TopBar({ className, children, LogoComponent, RightSideRenderFn }) {
  return (
    <div className={clsx(['top_bar', className])}>
      {LogoComponent}
      <div className="top_bar__body">{children}</div>
      {RightSideRenderFn ? (
        <div className="top_bar__right">{RightSideRenderFn()}</div>
      ) : null}
    </div>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  LogoComponent: PropTypes.node,
  RightSideRenderFn: PropTypes.func,
};

TopBar.defaultProps = {
  className: undefined,
  children: undefined,
  LogoComponent: undefined,
  RightSideRenderFn: undefined,
};

export default TopBar;
