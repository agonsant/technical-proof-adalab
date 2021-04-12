import { ReactElement } from 'react';

import Styles from './page-layout.module.scss';

/**
 * Component that wraps the page Layout. It include its items inside
 */
const PageLayout: React.FC<unknown> = (props): ReactElement => {
  return (
    <div className={Styles.page}>
      <div className={Styles['corner-top-left']}></div>
      <div className={Styles['corner-top-right']}></div>
      <div className={Styles['corner-bottom-left']}></div>
      <div className={Styles['corner-bottom-right']}></div>
      <main className={Styles.container}>{props.children}</main>
    </div>
  );
};

export default PageLayout;
