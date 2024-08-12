var langSelect;
var markdownContainer;

window.onload = function(){
    applyBrowserTheme();
    langSelect = document.getElementById("lang-select");
    markdownContainer = document.getElementById("markdown-container");

    langSelect.addEventListener("change", OnLanguageSelected);
    RenderDocs();
};

function applyBrowserTheme() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (isDarkMode) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
    }
}

function SetLang(lang){
    window.localStorage.setItem("docs-lang", lang);
}

function OnLanguageSelected(e){
    RenderDocs(e.target.value);
}

function RenderDocs(lang = null){
    let language = "en";
    if(lang != null) { language = lang; }

    fetch(`docs/${language}/privacy.md`)
        .then(response => response.blob())
        .then(blob => blob.text())    
        .then(markdown => {                 
            markdownContainer.innerHTML = marked.parse(markdown);
        });
}