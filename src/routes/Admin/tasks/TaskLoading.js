import React from 'react';
import {
  LoadingOutlined
} from '@ant-design/icons';

function TaskLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <div style={{ textAlign: 'center', fontSize: '30px'  }}>
         <LoadingOutlined/>
       <p> Hold on, fetching tasks may take some time :)</p>
      </div>
    );
  };
}
export default TaskLoading;
