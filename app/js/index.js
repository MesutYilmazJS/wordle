const d = document;
window.R = {}
HTMLDocument.prototype.gi = (e) => { return d.getElementById(e) };
HTMLDocument.prototype.qs = function (selector) {
    return this.querySelectorAll(selector);
};
HTMLDocument.prototype.ce = function (tag) {
    return this.createElement(tag);
};
{ NodeList }

NodeList.prototype.remove = function () {
    this.forEach((item) => {
        item.remove();
    });
    return null;
};
Element.prototype.ac = function (cls) {
    if (cls.includes(" ")) {
        cls.split(" ").forEach((v) => this.ac(v.trim()));
    } else {
        if (cls.trim() != "") {
            this.classList.add(cls);
        }
    }
    return this;
};
Element.prototype.rc = function (cls) {
    if (cls.includes(" ")) {
        cls.split(" ").forEach((v) => this.rc(v.trim()));
    } else {
        if (cls.trim() != "") {
            this.classList.remove(cls);
        }
    }
    return this;
};
NodeList.prototype.rc = Array.prototype.rc = function (cls) {
    this.forEach((item) => {
        item.rc(cls);
    });
    return this;
};
Element.prototype.bind = function (key, val) {
	this[key] = val;
	return this;
}



var height = 6
var width = 5;
var word_array = []
var row = 0;
var col = 0;

var gameOver = false;
const kelimeler = [
    "ELMAA", "ARABA", "KEDİM", "DÜNYA", "ÇİÇEK", "TARLA", "SÜTUN", "BİNAK",
    "HAVUZ", "KUMDA", "ÇORAP", "BUHAR", "MAKAS", "FİLMİ", "KITAP", "AYAKT",
    "SAATİ", "KUMDA", "GÖZDE", "HANIM", "BİRKA", "CANLI", "FİYAT", "HEDİY",
    "KADIN", "PİLOT", "UZAYL", "YAZAR", "YOLDA", "ZÜMRÜ", "İLÇEM", "KAVUN",
    "PORTA", "DUVAR", "JİLET", "KALEM", "LİMON", "MAVİL", "NOKTA", "OYUNC",
    "REHİN", "SAÇLI", "TAVUK", "UZUNL", "VURMA", "YAĞLI", "ZEHİR", "İNANÇ"
];
var rast = Math.floor(Math.random() * kelimeler.length);
var word = kelimeler[rast];
window.onload = function () {
    intialize();
}


function intialize() {
    d.gi('game_over_btn').style.display = 'none';
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = d.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.dataset.row = r;
            tile.classList.add("tile");
            tile.innerText = "";
            d.gi("board").appendChild(tile);
        }
    }


    // Listen for Key Press
    d.addEventListener("keyup", (e) => {
        select_rows(row);
        if (gameOver) return;
        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                word_array.push(e.code[3]);
                let currTile = d.gi(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace") {
            word_array.pop()
            if (0 < col && col <= width) col -= 1;
            let currTile = d.gi(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }

        else if (e.code == "Enter") {
            if (word_array.length < 5) return
            word_array = [];
            update();
            row += 1;
            col = 0;
            select_rows(row);
        }


        if (!gameOver && row == height) {
            alert("Kelime : " + word + " idi");
            d.gi('game_over_btn').style.display = 'block';
            gameOver = true;
        }

    })
}

function select_rows(row) {
    d.qs(`[data-row]`).forEach(item => { item[item.dataset.row == row ? 'ac' : 'rc']('select_row') });
}

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = d.gi(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
        } // Is it in the word?
        else if (word.includes(letter)) {
            currTile.classList.add("present");
        } // Not in the word
        else {
            currTile.classList.add("absent");
        }
        if (correct == width) {
            gameOver = true;
            alert("Kelimeyi buldunuz");
            d.gi('game_over_btn').style.display = 'block';
        }
    }
    select_rows(row)
}