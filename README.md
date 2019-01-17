# NostalgiA
想做这样子的布局Demo
* 两栏布局，有点像Slack桌面App
* 侧边栏可改变宽度，也可以toggle隐藏到屏幕外，并且自身宽度范围是响应可视区宽度的
* 侧边栏在大尺寸屏幕和小尺寸屏幕上显示图标 + 文字，中尺寸屏幕上显示图标
* 侧边栏在大尺寸屏幕和中尺寸屏幕上与内容区分享空间，在小尺寸屏幕上默认隐藏
* 侧边栏的按钮动画由数据驱动的SVG实现优雅的过渡，依赖GASP
* 右侧是由标题、通知、内容和底部输入区组成的
* 标题区右侧的工具按钮在宽度不足时会合并TODO
* 通知做了动画效果，点击右侧按钮消去，带有重力效果（微软Fluent Design）
* 兼容移动端

# Screenshots
![large](/assets/large-screen-0.png)

![medium](/assets/medium-screen-0.png)

![small](/assets/small-screen-0.png)