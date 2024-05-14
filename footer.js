const footer = document.createElement('footer');
footer.id = 'footer';
document.body.appendChild(footer)
footer.innerHTML = `
<h1 id="footTitle" class="title">!Spoiler.it</h1>
<ul id="intLinkFoot">
    <li><a href="home.html">Home</a></li>
    <li><a href="">Preferiti</a></li>
    <li><a href="news.html">News</a></li>
    <li><a href="contattaci.html">Contact</a></li>
</ul>
<ul id="socialFoot">
    <li title="Facebook"><a href=""><img src="/image/facebook.png" alt="Facebook"></a></li>
    <li title="Instagram"><a href=""><img src="/image/instagram.png" alt="Instagram"></a></li>
    <li title="Threads"><a href=""><img src="/image/threads.png" alt="Threads"></a></li>
    <li title="X"><a href=""><img src="/image/twitter.png" alt="X"></a></li>
    <li title="YouTube"><a href=""><img src="/image/youtube.png" alt="YouTube"></a></li>
    <li title="Pinterest"><a href=""><img src="/image/pinterest.png" alt="Pinterest"></a></li>
    <li title="GitHub"><a href=""><img src="/image/github-sign.png" alt="GitHub"></a></li>
</ul>
<div class="linea"></div>
<div id="extLinkFoot"><a href="">Website Terms</a>|<a href="">Privacy Policy</a>|<a href="">Accessibility Statement</a>|<a href="">CA Transparency in Supply Chains Act</a>|<a href="">Supplier Code of Conduct</a>|<a href="">Marketing to Children</a>|<a href="">Do Not Sell My Information</a></div>
<div id="copyright">© !Spoiler.it 2024, LLC. All Right Reserved.</div>
`
document.head.innerHTML += '<link rel="stylesheet" href="footer.css">';