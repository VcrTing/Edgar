/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const HomePage = () => {
  return (
    <div>
      <h1>{pluginId}&apos; 文档</h1>
      <p>smstrapi是如何工作的呢？</p>
      <p></p>
      <h3>SMS KEY</h3>
      <p>储存发送note、email、whatsapp所需要的关键的 Appkey 与 Apptoken</p>
      <h4>安装插件</h4>
      <p>mailgun.js, moment, twilio</p>
    </div>
  );
};

export default memo(HomePage);
