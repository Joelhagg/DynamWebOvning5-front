window.addEventListener("load", async () => {
  let savedEntries = await fetch("http://localhost:3000/entries")
    .then((response) => response.json())
    .then((data) => renderEntries(data));
});

const titleInput = document.getElementById("titleInput");
const dateInput = document.getElementById("dateInput");
const textAreaInput = document.getElementById("textAreaInput");

document
  .getElementsByTagName("button")[0]
  .addEventListener("click", async () => {
    try {
      let body = {
        date: dateInput.value,
        title: titleInput.value,
        text: textAreaInput.value,
      };

      console.log(body);

      let sendInput = await fetch("http://localhost:3000/entries/add", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(sendInput);
    } catch (error) {
      console.log("error", error);
    }

    location.reload();
  });

const renderEntries = (savedEntries) => {
  const savedEntriesContiner = document.getElementById("savedEntriesContiner");

  savedEntries.forEach((entrie) => {
    let entrieBox = document.createElement("div");

    let entrieTitle = document.createElement("h3");
    entrieTitle.innerHTML = "Inläggets titel: " + entrie.title;

    let entrieDate = document.createElement("h3");
    entrieDate.innerHTML = "Inlägget skrevs den: " + entrie.date;

    let entrieText = document.createElement("h4");
    entrieText.innerHTML = entrie.text + "<br><hr><br>";

    entrieBox.append(entrieTitle, entrieDate, entrieText);

    savedEntriesContiner.append(entrieBox);
  });
};
