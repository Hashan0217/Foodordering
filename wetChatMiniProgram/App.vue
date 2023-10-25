<script>
	export default {
		onLaunch() {
			wx.cloud.init({
				env: 'diancan-database-0fk3qml16f38db2',
				traceUser: true,
			})


		}

	}
</script>

<style>
	/*每个页面公共css */
	/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
		font-family: 'iconfont';
		/* Project id 4047354 */
		src: url('//at.alicdn.com/t/c/font_4047354_dxcl4xtslr.woff2?t=1683103336148') format('woff2'),
			url('//at.alicdn.com/t/c/font_4047354_dxcl4xtslr.woff?t=1683103336148') format('woff'),
			url('//at.alicdn.com/t/c/font_4047354_dxcl4xtslr.ttf?t=1683103336148') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 24px;
		font-style: normal;
		color: rgb(247, 181, 44);
	}
</style>