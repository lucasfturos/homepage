async function renderMarkdownFromUrl(url) {
    try {
        console.log("Fetching Markdown file...");
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Markdown file fetched successfully.");
        let markdown = await response.text();

        const startMarker = "## The technologies I use the most are";
        const endMarker = "## About me";
        const startIndex = markdown.indexOf(startMarker);
        const endIndex = markdown.indexOf(endMarker, startIndex);

        if (startIndex !== -1 && endIndex !== -1) {
            const section = markdown.substring(startIndex, endIndex);
            const converter = new showdown.Converter();
            console.log("Converting Markdown to HTML...");
            const htmlContent = converter.makeHtml(section);
            markdown =
                markdown.substring(0, startIndex) +
                htmlContent +
                markdown.substring(endIndex);
        }

        const startMarkerVisitorCounter = "## Visitor Counter";
        const endMarkerVisitorCounter = "</div>";
        const startIndexVisitorCounter = markdown.indexOf(
            startMarkerVisitorCounter
        );
        const endIndexVisitorCounter =
            markdown.indexOf(
                endMarkerVisitorCounter,
                startIndexVisitorCounter
            ) + endMarkerVisitorCounter.length;
        markdown =
            markdown.substring(0, startIndexVisitorCounter) +
            markdown.substring(endIndexVisitorCounter);

        const converter = new showdown.Converter();
        console.log("Converting Markdown to HTML...");
        const htmlContent = converter.makeHtml(markdown);
        document.getElementById("markdown-content").innerHTML = htmlContent;
        console.log("Markdown rendered successfully.");
    } catch (error) {
        console.error("Erro ao buscar o arquivo Markdown:", error);
    }
}

const markdownUrl =
    "https://raw.githubusercontent.com/lucasfturos/lucasfturos/main/README.md";
renderMarkdownFromUrl(markdownUrl);
