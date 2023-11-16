// getting JSON
fetch ("json/data.json")
    .then (response => response.json())
    .then (data => createContents(data))


// level - h1-h6
function createHeading(text, level) {
    const headingElement = document.createElement(level);

    headingElement.textContent = text;
    headingElement.classList.add("heading");

    return headingElement;
}


function createContents(data) {
    const sectionWrapper = document.querySelector(".main");

    for (const section in data) {
        const contents = data[section]; // subcategories of the main section (HTML or CSS) and its tags / propreties.

        // main section title
        const mainSection = document.createElement("section");
        const mainSectionTitle = createHeading(section, "h2");

        mainSection.id = section; // id for the bookmarks
        mainSection.classList.add("main-section")
        mainSection.appendChild(mainSectionTitle);

        for (const content in contents) {
            const subSection = document.createElement("section");
            const subSectionTitle = createHeading(content, "h3");

            subSection.classList.add("sub-section");
            subSection.id = content;
            subSection.appendChild(subSectionTitle);
            
            const tags = contents[content]; // tag objects ({tag : desc}...)
            
            for (const [name, desc] of Object.entries(tags)) {
                const tagBoardElement = document.createElement("div"); // container for tag and description.
                const tagNameElement = document.createElement("p");
                const tagDescriptionElement = document.createElement("p");

                tagBoardElement.classList.add("tag-board");

                tagNameElement.textContent = name;
                tagDescriptionElement.textContent = desc;

                tagBoardElement.appendChild(tagNameElement);
                tagBoardElement.appendChild(tagDescriptionElement);

                subSection.append(tagBoardElement);
            }
        mainSection.append(subSection);
        }
    /* sectionWrapper.appendChild(mainSection); for auto fill */
    console.log(mainSection)
    }
}
