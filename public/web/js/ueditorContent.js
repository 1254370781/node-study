// 解析富文本内容
class analysisContent {
    constructor(content,htmlContent) {
        this.content = content;
        this.htmlContent = htmlContent;
        // 执行方法
        this.contents();
        this.deleteContent();
    }
    // 获取内容并解析赋值
    contents() {
        document.querySelector(this.htmlContent).innerHTML = document.querySelector(this.content).innerText;
    }
    // 上面转换好了之后就直接删除掉这个div
    deleteContent() {
        document.querySelector(this.content).parentNode.removeChild(document.querySelector(this.content));
    }
}