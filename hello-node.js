// 모듈
const path = require("path");
const fs = require("fs");

// contents 디렉토리 경로
const directoryPath = path.join(__dirname,"contents");
console.log(directoryPath);
// contents 디렉토리에 있는 파일 읽기
const contentFiles = fs.readdirSync(directoryPath);
console.log(contentFiles);

const hljs = require("highlight.js");

const md = require("markdown-it")({
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  }
});


  const dir = "./deploy";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  
  const ejs = require("ejs");

  const layoutHtmlFormat = fs.readFileSync(
    "./templates/layout_format.html",
    "utf8"
  );
  const articleHtmlFormat = fs.readFileSync(
    "./templates/article_format.html",
    "utf8"
  );



  
// 확장자를 제외한 파일 이름을 얻는 함수
getHtmlFileName = file => {
    return file.slice(0, file.indexOf(".")).toLowerCase();
  };
  // deploy 폴더 안에 넣은 파일의 리스트
  const deployFiles = [];
  // map함수로 content안에 있는 파일들을 반복문을 돌면서 deploy안에 html파일 생성
  contentFiles.map(file => {
    const body = fs.readFileSync(`./contents/${file}`, "utf8");
  
    const convertedBody = md.render(body);
    const articleContent = ejs.render(articleHtmlFormat, {
      body: convertedBody
    });
    const articleHtml = ejs.render(layoutHtmlFormat, {
      content: articleContent
    });
    const fileName = getHtmlFileName(file);
    fs.writeFileSync(`./deploy/${fileName}.html`, articleHtml);
    deployFiles.push(fileName);
  });