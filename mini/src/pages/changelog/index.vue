<template>
  <view>
    <u-parse :html="content" :tag-style="style" style="padding: 10px"></u-parse>
  </view>
</template>

<script>
const content = `<h1><a href="https://github.com/caidesen/ins-tool/compare/44d06b89e9c760494fde882356450c0d38312c76...v1.0.0">1.0.0</a> (2021-12-06)</h1>
<h3>Bug Fixes</h3>
<ul>
<li>考勤记录没有根据userId查询导致错乱的bug (<a href="https://github.com/caidesen/ins-tool/commit/d670233986de98affe4001038f0bc85ddfcb8f44">d670233</a>)</li>
</ul>
<h3>Features</h3>
<ul>
<li>考勤功能 (<a href="https://github.com/caidesen/ins-tool/commit/44d06b89e9c760494fde882356450c0d38312c76">44d06b8</a>)</li>
<li>考勤自动生成功能 (<a href="https://github.com/caidesen/ins-tool/commit/da1059070d0bc34fa12d69090ed0adeb0b141ea0">da10590</a>)</li>
</ul>
`;
export default {
  data() {
    return {
      content,
      style: {
          h1: 'margin-bottom: 10px;font-size: 24px;line-height: 1.25;',
          h3: 'font-size: 18px;line-height: 1.25;margin: 5px 0',
          ul: 'line-height: 1.7;padding-left: 20rpx;list-style:none',
          li: 'line-height: 1.7;',
      },
    };
  },
};
</script>

<style scoped></style>
