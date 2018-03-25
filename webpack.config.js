module.exports = {
  // メインになるJavaScriptのファイル
  entry: "./src/index.js",


  output: {

    // 出力するファイルの場所
    path: "${__dirname}/dist",
    // 出力するファイル名
    filename: "main.js"

  }
}