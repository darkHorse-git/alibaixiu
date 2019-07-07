const { Comment } = require('../../../model/Comment');

module.exports = async (req, res) => {
	// 查询所有文章数量
	const commentCount = await Comment.countDocuments();
	const noPassCount = await Comment.find({"state":"0"}).count()
	// 响应
	res.send({commentCount,noPassCount});
}