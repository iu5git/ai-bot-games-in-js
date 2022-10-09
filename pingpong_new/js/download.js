// https://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
let textFile = null;
const makeTextFile = function(text) {
    var data = new Blob([text], {
        type: "text/plain"
    });

    // При замене ранее сгенерированного файла необходимо вручную удалить связь
    // с привязанной к нему ссылкой во избежание утечек памяти
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
};

const downloadBtn = document.getElementsByClassName("download")[0];

downloadBtn.addEventListener(
    "click",
    function() {
        var link = downloadBtn.getElementsByTagName("a")[0];
        link.href = makeTextFile(recordData.join("\r\n"));
        link.style.display = "block";
        link.click();
    },
    false
);