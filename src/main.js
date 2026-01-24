import './style.css';
import confetti from 'canvas-confetti';

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

// Constants/State
let currentRow = 0;
let currentTile = 0;
let gameOver = false;
let currentGuess = [];
let secretWord = "";

const words = [
    // A-B
    "ABİYE", "ACABA", "ACELE", "ADALE", "ADRES", "AHENK", "AİDAT", "AKREP", "AKŞAM", "ALKIŞ", 
    "AMBAR", "AMPUL", "ANKET", "ANTEN", "ARABA", "ARİFE", "ARMUT", "ASKER", "ASLAN", "ATLET", 
    "AVİZE", "AYRAN", "AYRIM", "BADEM", "BAGAJ", "BAHAR", "BAHÇE", "BAKIM", "BAKIR", "BALIK", 
    "BALON", "BANKA", "BANYO", "BARIŞ", "BASIN", "BASKI", "BAVUL", "BAYAT", "BEBEK", "BEDEN", 
    "BEKAR", "BELGE", "BESTE", "BEŞİK", "BETON", "BEYAZ", "BEYİN", "BİBER", "BİLET", "BİLGİ", 
    "BİLİM", "BİNEK", "BİREY", "BİRİM", "BİTİŞ", "BİTKİ", "BİBLO", "BOĞAZ", "BOYUN", "BOYUT", 
    "BÖCEK", "BÖLGE", "BÖREK", "BUHAR", "BUKET", "BULGU", "BULUT", "BURGU", "BURSA", "BUZLU", 
    "BÜTÇE", "BÜTÜN", "BÜYÜK",
    // C-D
    "CAMCI", "CANLI", "CADDE", "CEKET", "CEVİZ", "CİHAZ", "CİVAR", "CÜMLE", "ÇABUK", "ÇADIR", 
    "ÇAKIL", "ÇAKMA", "ÇANTA", "ÇARŞI", "ÇATAL", "ÇAYCI", "ÇEKİÇ", "ÇELİK", "ÇEŞİT", "ÇEŞME", 
    "ÇİÇEK", "ÇİLEK", "ÇİMEN", "ÇİZİM", "ÇİZGİ", "ÇOCUK", "ÇORAP", "ÇORBA", "ÇÖREK", "ÇUVAL", 
    "DAMAR", "DAMLA", "DAVET", "DAVUL", "DEFNE", "DEKOR", "DELİK", "DEMET", "DEMİR", "DENİZ", 
    "DERGİ", "DERİN", "DERYA", "DESEN", "DESTE", "DETAY", "DEVİR", "DEVRE", "DİKİŞ", "DİLEK", 
    "DİLİM", "DİREK", "DİVAN", "DİYET", "DİZEL", "DOĞAL", "DOĞRU", "DOLAP", "DOLMA", "DORUK", 
    "DOSYA", "DÖKÜM", "DÖNER", "DÖVİZ", "DUBLE", "DUMAN", "DURAK", "DURUM", "DUVAR", "DUYGU", 
    "DÜĞME", "DÜĞÜN", "DÜNYA", "DÜRÜM", "DÜZEN",
    // E-F-G
    "EKMEK", "EKSİK", "ELMAS", "EMLAK", "EMSAL", "ENGEL", "ERKEN", "ESNAF", "ETRAF", "EYLEM", 
    "EZBER", "FAKAT", "FAKİR", "FANUS", "FATİH", "FAZLA", "FENER", "FERAH", "FİDAN", "FİGÜR", 
    "FİKİR", "FİRMA", "FİZİK", "FLÖRT", "FORMA", "GALİP", "GARAJ", "GARİP", "GEBZE", "GEÇEN", 
    "GEÇİŞ", "GELİN", "GELİR", "GENEL", "GENİŞ", "GEYİK", "GİRİŞ", "GİTAR", "GİYİM", "GİZLİ", 
    "GÖBEK", "GÖLGE", "GÖNÜL", "GÖREV", "GÖRÜŞ", "GÖVDE", "GURUR", "GÜÇLÜ", "GÜLEÇ", "GÜLÜŞ", 
    "GÜMÜŞ", "GÜNEŞ", "GÜNEY", "GÜZEL",
    // H-I-İ
    "HABER", "HACİM", "HAKEM", "HAKLI", "HALKA", "HAMUR", "HANIM", "HAPİS", "HASAR", "HASTA", 
    "HATIR", "HAVAİ", "HAVUÇ", "HAVUZ", "HAYAL", "HAYAT", "HAZIR", "HEDEF", "HELAL", "HELVA", 
    "HESAP", "HEYBE", "HIRKA", "HIZLI", "HİSAR", "HİSSE", "HİTAP", "HOROZ", "HUKUK", "HUZUR", 
    "HÜCRE", "HÜZÜN", "İÇERİ", "İÇMEK", "İDEAL", "İFADE", "İKRAM", "İLERİ", "İRMİK", "İRONİ", 
    "İSHAL", "İSKAN", "İSLAM", "İSYAN", "İŞGAL", "İŞLEK", "İŞLEM", 
    "İZMİR", "İZMİT", "İZNİK", "İNCİR", "İNSAN", "İPTAL", "İSTEK",
    // K
    "KABAK", "KABLO", "KAÇAK", "KADAR", "KADEH", "KADIN", "KAFES", "KAĞIT", "KAHVE", "KALEM", 
    "KALIN", "KALIP", "KANAL", "KANIT", "KAPAK", "KARGO", "KARNE", "KASAP", "KASET", "KAŞIK", 
    "KATKI", "KAYIK", "KAYIP", "KAYIT", "KAZAK", "KAZAN", "KEBAP", "KEDER", "KEFİL", "KEKİK", 
    "KEMAN", "KENAR", "KENDİ", "KESİN", "KESİT", "KEYİF", "KILIÇ", "KILIF", "KISIM", "KIYMA", 
    "KİBAR", "KİLER", "KİLİM", "KİLİT", "KİMYA", "KİRAZ", "KİTAP", "KLİMA", "KOLAY", "KOLEJ", 
    "KOLON", "KOLYE", "KOMİK", "KONAK", "KONUK", "KONUM", "KONUŞ", "KOPYA", "KORNA", "KOYUN", 
    "KÖPEK", "KÖPRÜ", "KÖPÜK", "KROKİ", "KULAK", "KUMAŞ", "KUMRU", "KUPON", "KURAK", "KURAL", 
    "KURGU", "KURYE", "KUZEY", "KÜÇÜK", "KÜLAH", "KÜNYE", "KÜREK", "KÜTLE", "KÜVET",
    // L-M
    "LAMBA", "LİDER", "LİMAN", "LİMON", "LİSTE", "LOGOS", "LOKMA", "MADEN", "MAKET", "MAKAS", 
    "MAMUL", "MANAV", "MANTI", "MANTO", "MARKA", "MARTI", "MASAL", "MASKE", "MAYIS", "MECAZ", 
    "MEDYA", "MEKAN", "MELEK", "MERAK", "MERCİ", "MERMİ", "MESAİ", "MESAJ", "METAL", "METİN", 
    "METOT", "METRE", "MEVKİ", "MEYVE", "MEZAR", "MISIR", "MİDYE", "MİKRO", "MİMAR", "MİRAS", 
    "MİZAH", "MODEL", "MODEM", "MONTE", "MORAL", "MOTOR", "MUKAV", "MUMYA", "MURAT", "MUTLU", 
    "MÜZİK",
    // N-O-Ö
    "NABIZ", "NADİR", "NAKİT", "NAMAZ", "NASIL", "NAZAR", "NAZİK", "NEDEN", "NEFES", "NEHİR", 
    "NİÇİN", "NİKAH", "NİSAN", "NİTEL", "NİYET", "NOKTA", "NOTER", "NÖBET", "OPERA", "ORMAN", 
    "ORTAK", "ORTAM", "OYACI", "OĞLAK", "ÖDEME", "ÖNDER", "ÖNERİ", "ÖNLEM", "ÖRDEK", "ÖRNEK", 
    "ÖZGÜN", "ÖZLEM",
    // P-R
    "PAKET", "PALET", "PAMUK", "PARÇA", "PARKE", "PASTA", "PERDE", "PİLOT", "PİPET", "PİZZA", 
    "PLAKA", "PLAZA", "POLİS", "POMPA", "POSTA", "POŞET", "PRENS", "PROJE", "PROVA", "RADYO", 
    "RAKAM", "RAKİP", "RAPOR", "REÇEL", "REHİN", "REJİM", "RESİM", "RESMİ", "REYON", 
    "RİTİM", "ROBOT", "ROMAN", "RÖTAR", "RÜYAL",
    // S-Ş
    "SABAH", "SABIR", "SABİT", "SAÇMA", "SADIK", "SAĞIR", "SAHİL", "SAHNE", "SAHTE", "SAKAL", 
    "SAKİN", "SALÇA", "SALON", "SAMAN", "SANAL", "SANAT", "SANCI", "SARAY", "SARGI", "SARMA", 
    "SATEN", "SATIR", "SATIŞ", "SAYAÇ", "SEBEP", "SEBZE", "SEÇİM", "SEDEF", "SEFER", "SEHPA", 
    "SEKİZ", "SELAM", "SENET", "SEPET", "SERGİ", "SERİN", "SERUM", "SERVİ", "SESLİ", "SEVDA", 
    "SEVGİ", "SEVİM", "SEZON", "SICAK", "SIFIR", "SINAV", "SINIF", "SIRMA", "SİCİL", "SİHİR", 
    "SİLAH", "SİLGİ", "SİMİT", "SİNEK", "SİNİR", "SİREN", "SİYAH", "SOFRA", "SOĞAN", "SOĞUK", 
    "SOKAK", "SOLUK", "SONRA", "SONUÇ", "SORGU", "SORUN", "SOYUT", "SÖZLÜ", "STANT", "SUÇLU", 
    "SUNUM", "SURAT", "SUSAM", "SÜPER", "SÜRAT", "SÜREÇ", "SÜRGÜ", "ŞAHIS", "ŞAHİN", "ŞAPKA", 
    "ŞARAP", "ŞARKI", "ŞEHİR", "ŞEKER", "ŞEKİL", "ŞERİT", "ŞİFRE", "ŞİMDİ", "ŞİRİN", "ŞOFÖR", 
    "ŞÜKÜR",
    // T
    "TABAK", "TABAN", "TABLA", "TABLO", "TABUT", "TACİZ", "TAHIL", "TAHTA", "TAKIM", "TAKİP", 
    "TAKSİ", "TALEP", "TAMİR", "TANIK", "TANIM", "TARAK", "TARİF", "TARİH", "TARLA", "TARTI", 
    "TASAR", "TAŞIT", "TATİL", "TATLI", "TAVAN", "TAVIR", "TAVLA", "TAVUK", "TAYİN", "TEKEL", 
    "TEKİN", "TEKNE", "TEMEL", "TEMİZ", "TEMPO", "TENİS", "TEPSİ", "TERAS", "TERZİ", "TESİS", 
    "TIRAŞ", "TİLKİ", "TİNER", "TİPİK", "TİRAJ", "TİTİZ", "TOHUM", "TOKAT", "TOPUK", "TORBA", 
    "TÖREN", "TUĞLA", "TULUM", "TURŞU", "TUTAR", "TUTKU", "TUVAL", "TUZLA", "TUZLU", "TÜFEK", 
    "TÜNEL", "TÜRLÜ", "TÜTÜN",
    // U-V
    "UĞRAŞ", "UNVAN", "UYARI", "UYGUN", "ÜCRET", "ÜÇGEN", "ÜSLUP", "ÜSTÜN", 
    "VAGON", "VAKIF", "VAKİT", "VALİZ", "VAPUR", "VEKİL", "VERGİ", "VERİM", "VEZİR", "VİDEO", 
    "VİLLA", "VİRAJ", "VİRÜS", "VİŞNE", "VİTES", "VİZON", "VÜCUT",
    // Y-Z
    "YABAN", "YAĞCI", "YAĞIŞ", "YAĞLI", "YAKIN", "YAKIT", "YAKUT", "YALAN", "YALIN", "YAMAÇ", 
    "YANAK", "YANIT", "YANKI", "YAPAY", "YAPIM", "YAPIT", "YARAR", "YARIŞ", "YASSI", "YAŞAM", 
    "YATAK", "YATAY", "YAVRU", "YAYIN", "YAZAR", "YAZGI", "YAZIK", "YAZIM", "YEDEK", "YEGEN", 
    "YELEK", "YEMEK", "YEMİN", "YENGE", "YEREL", "YEŞİL", "YETER", "YETKİ", "YIKIM", "YİĞİT", 
    "YİRMİ", "YOĞUN", "YOKUŞ", "YOLCU", "YORUM", "YOSUN", "YUDUM", "YULAF", "YUMRU", "YUNUS", 
    "YUTAK", "ZAMAN", "ZARAR", "ZARİF", "ZEBRA", "ZEHİR", "ZEMİN", "ZIMBA", "ZİFİR", "ZİHİN", 
    "ZİYAN", "ZORLU"
];

// Normalize words to ensure uppercase Turkish
const textToUpperCase = (text) => text.toLocaleUpperCase('tr-TR');

// Game State
let gameStarted = false;

// Keyboard Layout (Turkish Q)
const keyboardRows = [
    ["E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş", "İ"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "Ö", "Ç", "DEL"]
];

function initGame() {
    pickRandomWord();
    createBoard();
    createKeyboard();
    setupInputListeners();
    setupWelcomeScreen();
}

function pickRandomWord() {
    // Pick a random word that is exactly 5 letters (filtering just in case)
    const validWords = words.filter(w => w.length === 5);
    const randomIndex = Math.floor(Math.random() * validWords.length);
    secretWord = textToUpperCase(validWords[randomIndex]);
    console.log("Secret Word (Dev):", secretWord);
}

function setupWelcomeScreen() {
    const startBtn = document.getElementById('start-game-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    
    startBtn.addEventListener('click', () => {
        welcomeScreen.classList.add('opacity-0', 'pointer-events-none', 'transition-opacity', 'duration-500');
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
        }, 500);
        gameStarted = true;
    });
}

function createBoard() {
    const board = document.getElementById("board");
    board.innerHTML = ''; // Clear

    for (let r = 0; r < MAX_ATTEMPTS; r++) {
        for (let c = 0; c < WORD_LENGTH; c++) {
            const tile = document.createElement("div");
            tile.id = `tile-${r}-${c}`;
            tile.classList.add("tile");
            // Highlight first row initially? No, we wait for input.
            board.appendChild(tile);
        }
    }
}

function createKeyboard() {
    const keyboard = document.getElementById("keyboard");
    keyboard.innerHTML = ''; 

    keyboardRows.forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("flex", "justify-center", "gap-1.5", "w-full");
        
        row.forEach(key => {
            const button = document.createElement("button");
            button.innerText = key === "DEL" ? "⌫" : key;
            button.dataset.key = key;
            button.classList.add("key");
            
            // Adjust width for Enter/Del
            if (key === "ENTER" || key === "DEL") {
                button.classList.add("flex-[1.5]", "text-xs");
            } else {
                button.classList.add("flex-1");
            }

            button.addEventListener("click", () => handleInput(key));
            rowDiv.appendChild(button);
        });
        
        keyboard.appendChild(rowDiv);
    });
}

function setupInputListeners() {
    document.addEventListener("keydown", (e) => {
        if (!gameStarted || gameOver) return;
        
        const key = e.key.toUpperCase();
        
        if (key === "ENTER") {
            handleInput("ENTER");
        } else if (key === "BACKSPACE" || key === "DELETE") {
            handleInput("DEL");
        } else if (isLetter(e.key)) {
            // Map to locale upper case
            handleInput(e.key.toLocaleUpperCase('tr-TR'));
        }
    });

    document.getElementById('restart-btn').addEventListener('click', resetGame);
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-zıüüğşöçA-ZİÜÜĞŞÖÇ]/i);
}

function handleInput(key) {
    if (!gameStarted || gameOver) return;

    if (key === "ENTER") {
        submitGuess();
    } else if (key === "DEL") {
        deleteLetter();
    } else {
        addLetter(key);
    }
}

function addLetter(letter) {
    if (currentGuess.length < WORD_LENGTH) {
        currentGuess.push(letter);
        const tile = document.getElementById(`tile-${currentRow}-${currentGuess.length - 1}`);
        tile.innerText = letter;
        tile.dataset.state = "active";
    }
}

function deleteLetter() {
    if (currentGuess.length > 0) {
        const tile = document.getElementById(`tile-${currentRow}-${currentGuess.length - 1}`);
        tile.innerText = "";
        delete tile.dataset.state;
        currentGuess.pop();
    }
}

function submitGuess() {
    if (currentGuess.length !== WORD_LENGTH) {
        showAlert("Yetersiz harf!");
        shakeRow();
        return;
    }

    const guessString = currentGuess.join("");
    
    // Animate Reveal
    revealGuess(guessString);
}

function revealGuess(guess) {
    const row = currentRow;
    const guessArr = currentGuess;
    const secretArr = secretWord.split('');
    const solutionCharsTaken = secretArr.map(() => false); // To track which secret letters are matched
    
    // We need two passes. 
    // Pass 1: Find Greens (Correct position)
    // Pass 2: Find Yellows (Wrong position) and Grays
    
    const tileStates = new Array(WORD_LENGTH).fill('absent'); // Default absent

    // 1. Check for Correct (Green)
    for (let i = 0; i < WORD_LENGTH; i++) {
        const letter = guessArr[i];
        if (letter === secretArr[i]) {
            tileStates[i] = 'correct';
            solutionCharsTaken[i] = true;
        }
    }

    // 2. Check for Present (Yellow)
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (tileStates[i] === 'correct') continue; // Already handled

        const letter = guessArr[i];
        const indexOfPresentChar = secretArr.findIndex((char, index) => char === letter && !solutionCharsTaken[index]);

        if (indexOfPresentChar > -1) {
            tileStates[i] = 'present';
            solutionCharsTaken[indexOfPresentChar] = true;
        }
    }

    // Apply animations and states with delay
    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = document.getElementById(`tile-${row}-${i}`);
        const letter = guessArr[i];
        const state = tileStates[i];

        setTimeout(() => {
            tile.classList.add('animate-flip-in');
            tile.dataset.state = state; // Update tile style
            
            // Update Keyboard
            updateKeyboardState(letter, state);

        }, i * 250); // Cascade effect
    }

    setTimeout(() => {
         // Check Win/Loss after all animations
        if (guess === secretWord) {
            triggerWin();
        } else {
            currentRow++;
            currentGuess = [];
            if (currentRow === MAX_ATTEMPTS) {
                triggerLose();
            }
        }
    }, WORD_LENGTH * 250 + 100);
}

function updateKeyboardState(letter, state) {
    // Logic: correct > present > absent > default
    // If a key is already green, don't make it yellow or gray.
    const keyBtn = document.querySelector(`button[data-key="${letter}"]`);
    if (!keyBtn) return;

    const currentState = keyBtn.dataset.state;

    if (state === 'correct') {
        keyBtn.dataset.state = 'correct';
    } else if (state === 'present' && currentState !== 'correct') {
        keyBtn.dataset.state = 'present';
    } else if (state === 'absent' && currentState !== 'correct' && currentState !== 'present') {
        keyBtn.dataset.state = 'absent';
    }
}

function triggerWin() {
    gameOver = true;
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    setTimeout(() => {
        showModal("Tebrikler!", "Harikaydın!");
    }, 500);
}

function triggerLose() {
    gameOver = true;
    setTimeout(() => {
        showModal("Kaybettin", `Doğru kelime: ${secretWord}`);
    }, 500);
}

function showModal(title, msg) {
    const modal = document.getElementById('modal-overlay');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-message').innerText = msg;
    modal.classList.remove('hidden');
}

function resetGame() {
    document.getElementById('modal-overlay').classList.add('hidden');
    gameOver = false;
    currentRow = 0;
    currentGuess = [];
    currentTile = 0;

    // Reset keyboard DOM
    document.querySelectorAll('.key').forEach(k => {
        delete k.dataset.state;
    });

    // Reset board DOM
    initGame();
}

function showAlert(msg) {
    // Simple toast implementation or standard alert
    // For now simple alert, or we can add a toast container
    const div = document.createElement('div');
    div.innerText = msg;
    div.className = "fixed top-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500 z-50";
    document.body.appendChild(div);
    setTimeout(() => {
        div.classList.add('opacity-0');
        setTimeout(() => div.remove(), 500);
    }, 1500);
}

function shakeRow() {
    const rowTiles = [];
    for (let i = 0; i < WORD_LENGTH; i++) {
        rowTiles.push(document.getElementById(`tile-${currentRow}-${i}`));
    }
    rowTiles.forEach(t => t.classList.add('animate-pulse', 'border-red-500'));
    setTimeout(() => {
        rowTiles.forEach(t => t.classList.remove('animate-pulse', 'border-red-500'));
    }, 500);
}

// Start
initGame();
