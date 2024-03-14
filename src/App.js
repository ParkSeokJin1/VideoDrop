import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoEditor from "./pages/VideoEditor/VideoEitor";
import useDeviceType from "./hooks/useDeviceType";
import Footer from "./components/Footer";
import Image from "./pages/image/Image";
import VideoUpLoadPage from "./pages/video/VideoUploadPage";

function App() {
  const device = useDeviceType();
  return (
    <div className="App">
      <GlobalStyle device={device} />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<VideoEditor />} />
          <Route path="/video" element={<VideoUpLoadPage />} />
          <Route path="/image" element={<Image />} />
        </Routes>
        {device === "mobile" ? <Footer device={device} /> : <></>}
      </BrowserRouter>
    </div>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
html,
body,
#root {
  height: 100%;
   background: ${(props) => (props.device === "mobile" ? "#1c1c1c" : "white")};
}

/*  레이아웃 */
.layout {
  width: 393px;
  margin: 0 auto;
}

.pcLayout {
  width: 1000px;
  height: 600px;
  margin: 0 auto;
}
`;
