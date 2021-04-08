import { ReactElement } from 'react';

import Styles from './spinner.module.scss';

/**
 * Component that wraps the page Layout. It include its items inside
 */
const Spinner: React.FC<unknown> = (props): ReactElement => {
  return (
    <div className={Styles.spinner}>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
