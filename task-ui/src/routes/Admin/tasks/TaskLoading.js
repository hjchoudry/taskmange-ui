import React from 'react';
function TaskLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <p style={{ textAlign: 'center', fontSize: '30px' }}>
        Hold on, fetching tasks may take some time :)
      </p>
    );
  };
}
export default TaskLoading;
