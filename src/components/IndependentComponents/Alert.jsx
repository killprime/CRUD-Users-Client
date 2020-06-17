import React from 'react';

export const Alert = ({ params }) => (
  <div className={'alert ' + ((params.addClass) ? params.addClass : 'alert-warning')} role="alert">
    {params.text}
  </div>
)
