import { ReactElement } from 'react';

import Styles from './page-layout.module.scss';

/**
 * Component that wraps the page Layout. It include its items inside
 */
const PageLayout: React.FC<unknown> = (props): ReactElement => {
  return (
    <div className={Styles.page}>
      <main className={Styles.container}>{props.children}</main>
    </div>
  );
};

export default PageLayout;
