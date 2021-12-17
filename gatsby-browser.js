import Prism from "prism-react-renderer/prism"; // 신텍스 하이라이트 필요하면 이곳에서 추가
(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-csharp");
require("prismjs/components/prism-java");
