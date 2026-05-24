class CryptoModuleBrowser {
    constructor() {
        if (typeof window.elliptic === 'undefined') {
            throw new Error('Elliptic library not loaded');
        }
        if (typeof window.CryptoJS === 'undefined') {
            throw new Error('CryptoJS library not loaded');
        }
        
        this.elliptic = window.elliptic;
        this.ec = new this.elliptic.ec('secp256k1');
        this.encoding = 'utf-8';
        
        this.bip39Wordlist = [
            "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse",
            "access", "accident", "account", "accuse", "achieve", "acid", "acoustic", "acquire", "across", "act",
            "action", "actor", "actress", "actual", "adapt", "add", "addict", "address", "adjust", "admit",
            "adult", "advance", "advice", "aerobic", "affair", "afford", "afraid", "africa", "after",
            "again", "age", "agent", "agree", "ahead", "aim", "air", "airport", "aisle", "alarm",
            "album", "alcohol", "alert", "alien", "all", "alley", "allow", "almost", "alone", "alpha",
            "already", "also", "alter", "always", "amateur", "amazing", "among", "amount", "amused", "analyst",
            "anchor", "ancient", "anger", "angle", "angry", "animal", "ankle", "announce", "annual", "another",
            "answer", "antenna", "antique", "anxiety", "any", "apart", "apology", "appear", "apple", "approve",
            "april", "arch", "arctic", "area", "arena", "argue", "arm", "armed", "armor", "army",
            "around", "arrange", "arrest", "arrive", "arrow", "art", "artefact", "artist", "artwork", "ask",
            "aspect", "assault", "asset", "assist", "assume", "asthma", "athlete", "atom", "attack", "attend",
            "attitude", "attract", "auction", "audit", "august", "aunt", "author", "auto", "autumn", "average",
            "avocado", "avoid", "awake", "aware", "away", "awesome", "awful", "awkward", "axis", "baby",
            "bachelor", "bacon", "badge", "bag", "balance", "balcony", "ball", "bamboo", "banana", "banner",
            "bar", "barely", "bargain", "barrel", "base", "basic", "basket", "battle", "beach", "bean",
            "beauty", "because", "become", "beef", "before", "begin", "behave", "behind", "believe", "below",
            "belt", "bench", "benefit", "best", "betray", "better", "between", "beyond", "bicycle", "bid",
            "bike", "bind", "biology", "bird", "birth", "bitter", "black", "blade", "blame", "blanket",
            "blast", "bleak", "bless", "blind", "blood", "blossom", "blouse", "blue", "blur", "blush",
            "board", "boat", "body", "boil", "bomb", "bone", "bonus", "book", "boost", "border",
            "boring", "borrow", "boss", "bottom", "bounce", "box", "boy", "bracket", "brain", "brand",
            "brass", "brave", "bread", "breeze", "brick", "bridge", "brief", "bright", "bring", "brisk",
            "broccoli", "broken", "bronze", "broom", "brother", "brown", "brush", "bubble", "buddy", "budget",
            "buffalo", "build", "bulb", "bulk", "bullet", "bundle", "bunker", "burden", "burger", "burst",
            "bus", "business", "busy", "butter", "buyer", "buzz", "cabbage", "cabin", "cable", "cactus",
            "cage", "cake", "call", "calm", "camera", "camp", "can", "canal", "cancel", "candy",
            "cannon", "canoe", "canvas", "canyon", "capable", "capital", "captain", "car", "carbon", "card",
            "cargo", "carpet", "carry", "cart", "case", "cash", "casino", "castle", "casual", "cat",
            "catalog", "catch", "category", "cattle", "caught", "cause", "caution", "cave", "ceiling", "celery",
            "cement", "census", "century", "cereal", "certain", "chair", "chalk", "champion", "change", "chaos",
            "chapter", "charge", "chase", "chat", "cheap", "check", "cheese", "chef", "cherry", "chest",
            "chicken", "chief", "child", "chimney", "choice", "choose", "chronic", "chuckle", "chunk", "churn",
            "cigar", "cinnamon", "circle", "citizen", "city", "civil", "claim", "clap", "clarify", "claw",
            "clay", "clean", "clerk", "clever", "click", "client", "cliff", "climb", "clinic", "clip",
            "clock", "clog", "close", "cloth", "cloud", "clown", "club", "clump", "cluster", "clutch",
            "coach", "coast", "coconut", "code", "coffee", "coil", "coin", "collect", "color", "column",
            "combine", "come", "comfort", "comic", "common", "company", "concert", "conduct", "confirm",
            "congress", "connect", "consider", "control", "convince", "cook", "cool", "copper", "copy", "coral",
            "core", "corn", "correct", "cost", "cotton", "couch", "country", "couple", "course", "cousin",
            "cover", "coyote", "crack", "cradle", "craft", "cram", "crane", "crash", "crater", "crawl",
            "crazy", "cream", "credit", "creek", "crew", "cricket", "crime", "crisp", "critic", "crop",
            "cross", "crouch", "crowd", "crucial", "cruel", "cruise", "crumble", "crunch", "crush", "cry",
            "crystal", "cube", "culture", "cup", "cupboard", "curious", "current", "curtain", "curve", "cushion",
            "custom", "cute", "cycle", "dad", "damage", "damp", "dance", "danger", "daring", "dash",
            "daughter", "dawn", "day", "deal", "debate", "debris", "decade", "december", "decide", "decline",
            "decorate", "decrease", "deer", "defense", "define", "defy", "degree", "delay", "deliver", "demand",
            "demise", "denial", "dentist", "deny", "depart", "depend", "deposit", "depth", "deputy", "derive",
            "describe", "desert", "design", "desk", "despair", "destroy", "detail", "detect", "develop", "device",
            "devote", "diagram", "dial", "diamond", "diary", "dice", "diesel", "diet", "differ", "digital",
            "dignity", "dilemma", "dinner", "dinosaur", "direct", "dirt", "disagree", "discover", "disease",
            "dish", "dismiss", "disorder", "display", "distance", "divert", "divide", "divorce", "dizzy", "doctor",
            "document", "dog", "doll", "dolphin", "domain", "donate", "donkey", "donor", "door", "dose",
            "double", "dove", "draft", "dragon", "drama", "drastic", "draw", "dream", "dress", "drift",
            "drill", "drink", "drip", "drive", "drop", "drum", "dry", "duck", "dumb", "dune",
            "during", "dust", "dutch", "duty", "dwarf", "dynamic", "eager", "eagle", "early", "earn",
            "earth", "easily", "east", "easy", "echo", "ecology", "economy", "edge", "edit", "educate",
            "effort", "egg", "eight", "either", "elbow", "elder", "electric", "elegant", "element", "elephant",
            "elevator", "elite", "else", "embark", "embody", "embrace", "emerge", "emotion", "employ", "empower",
            "empty", "enable", "enact", "end", "endless", "endorse", "enemy", "energy", "enforce", "engage",
            "engine", "enhance", "enjoy", "enlist", "enough", "enrich", "enroll", "ensure", "enter", "entire",
            "entry", "envelope", "episode", "equal", "equip", "era", "erase", "erode", "erosion", "error",
            "erupt", "escape", "essay", "essence", "estate", "eternal", "ethics", "evidence", "evil", "evoke",
            "evolve", "exact", "example", "excess", "exchange", "excite", "exclude", "excuse", "execute", "exercise",
            "exhaust", "exhibit", "exile", "exist", "exit", "exotic", "expand", "expect", "expire", "explain",
            "expose", "express", "extend", "extra", "eye", "eyebrow", "fabric", "face", "faculty", "fade",
            "faint", "faith", "fall", "false", "fame", "family", "famous", "fan", "fancy", "fantasy",
            "farm", "fashion", "fat", "fatal", "father", "fatigue", "fault", "favorite", "feature", "february",
            "federal", "fee", "feed", "feel", "female", "fence", "festival", "fetch", "fever", "few",
            "fiber", "fiction", "field", "figure", "file", "film", "filter", "final", "find", "fine",
            "finger", "finish", "fire", "firm", "first", "fiscal", "fish", "fit", "fitness", "fix",
            "flag", "flame", "flash", "flat", "flavor", "flee", "flight", "flip", "float", "flock",
            "floor", "flower", "fluid", "flush", "fly", "foam", "focus", "fog", "foil", "fold",
            "follow", "food", "foot", "force", "forest", "forget", "fork", "fortune", "forum", "forward",
            "fossil", "foster", "found", "fox", "fragile", "frame", "frequent", "fresh", "friend", "fringe",
            "frog", "front", "frost", "frown", "frozen", "fruit", "fuel", "fun", "funny", "furnace",
            "fury", "future", "gadget", "gain", "galaxy", "gallery", "game", "gap", "garage", "garbage",
            "garden", "garlic", "garment", "gas", "gasp", "gate", "gather", "gauge", "gaze", "general",
            "genius", "genre", "gentle", "genuine", "gesture", "ghost", "giant", "gift", "giggle", "ginger",
            "giraffe", "girl", "give", "glad", "glance", "glare", "glass", "glide", "glimpse", "globe",
            "gloom", "glory", "glove", "glow", "glue", "goat", "goddess", "gold", "good", "goose",
            "gorilla", "gospel", "gossip", "govern", "gown", "grab", "grace", "grain", "grant", "grape",
            "grass", "gravity", "great", "green", "grid", "grief", "grit", "grocery", "group", "grow",
            "grunt", "guard", "guess", "guide", "guilt", "guitar", "gun", "gym", "habit", "hair",
            "half", "hammer", "hamster", "hand", "happy", "harbor", "hard", "harsh", "harvest", "hat",
            "have", "hawk", "hazard", "head", "health", "heart", "heavy", "hedgehog", "height", "hello",
            "helmet", "help", "hen", "hero", "hidden", "high", "hill", "hint", "hip", "hire",
            "history", "hobby", "hockey", "hold", "hole", "holiday", "hollow", "home", "honey", "hood",
            "hope", "horn", "horror", "horse", "hospital", "host", "hotel", "hour", "hover", "hub",
            "huge", "human", "humble", "humor", "hundred", "hungry", "hunt", "hurdle", "hurry", "hurt",
            "husband", "hybrid", "ice", "icon", "idea", "identify", "idle", "ignore", "ill", "illegal",
            "illness", "image", "imitate", "immense", "immune", "impact", "impose", "improve", "impulse", "inch",
            "include", "income", "increase", "index", "indicate", "indoor", "industry", "infant", "inflict", "inform",
            "inhale", "inherit", "initial", "inject", "injury", "inmate", "inner", "innocent", "input", "inquiry",
            "insane", "insect", "inside", "inspire", "install", "intact", "interest", "into", "invest", "invite",
            "involve", "iron", "island", "isolate", "issue", "item", "ivory", "jacket", "jaguar", "jar",
            "jazz", "jealous", "jeans", "jelly", "jewel", "job", "join", "joke", "journey", "joy",
            "judge", "juice", "jump", "jungle", "junior", "junk", "just", "kangaroo", "keen", "keep",
            "ketchup", "key", "kick", "kid", "kidney", "kind", "kingdom", "kiss", "kit", "kitchen",
            "kite", "kitten", "kiwi", "knee", "knife", "knock", "know", "lab", "label", "labor",
            "ladder", "lady", "lake", "lamp", "language", "laptop", "large", "later", "latin", "laugh",
            "laundry", "lava", "law", "lawn", "lawsuit", "layer", "lazy", "leader", "leaf", "learn",
            "leave", "lecture", "left", "leg", "legal", "legend", "leisure", "lemon", "lend", "length",
            "lens", "leopard", "lesson", "letter", "level", "liar", "liberty", "library", "license", "life",
            "lift", "light", "like", "limb", "limit", "link", "lion", "liquid", "list", "little",
            "live", "lizard", "load", "loan", "lobster", "local", "lock", "logic", "lonely", "long",
            "loop", "lottery", "loud", "lounge", "love", "loyal", "lucky", "luggage", "lumber", "lunar",
            "lunch", "luxury", "lyrics", "machine", "mad", "magic", "magnet", "maid", "mail", "main",
            "major", "make", "mammal", "man", "manage", "mandate", "mango", "mansion", "manual", "maple",
            "marble", "march", "margin", "marine", "market", "marriage", "mask", "mass", "master", "match",
            "material", "math", "matrix", "matter", "maximum", "maze", "meadow", "mean", "measure", "meat",
            "mechanic", "medal", "media", "melody", "melt", "member", "memory", "mention", "menu", "mercy",
            "merge", "merit", "merry", "mesh", "message", "metal", "method", "middle", "midnight", "milk",
            "million", "mimic", "mind", "minimum", "minor", "minute", "miracle", "mirror", "misery", "miss",
            "mistake", "mix", "mixed", "mixture", "mobile", "model", "modify", "mom", "moment", "monitor",
            "monkey", "monster", "month", "moon", "moral", "more", "morning", "mosquito", "mother", "motion",
            "motor", "mountain", "mouse", "move", "movie", "much", "muffin", "mule", "multiply", "muscle",
            "museum", "mushroom", "music", "must", "mutual", "myself", "mystery", "myth", "naive", "name",
            "napkin", "narrow", "nasty", "nation", "nature", "near", "neck", "need", "negative", "neglect",
            "neither", "nephew", "nerve", "nest", "net", "network", "neutral", "never", "news", "next",
            "nice", "night", "noble", "noise", "nominee", "noodle", "normal", "north", "nose", "notable",
            "note", "nothing", "notice", "novel", "now", "nuclear", "number", "nurse", "nut", "oak",
            "obey", "object", "oblige", "obscure", "observe", "obtain", "obvious", "occur", "ocean", "october",
            "odor", "off", "offer", "office", "often", "oil", "okay", "old", "olive", "olympic",
            "omit", "once", "one", "onion", "online", "only", "open", "opera", "opinion", "oppose",
            "option", "orange", "orbit", "orchard", "order", "ordinary", "organ", "orient", "original", "orphan",
            "ostrich", "other", "outdoor", "outer", "output", "outside", "oval", "oven", "over", "own",
            "owner", "oxygen", "oyster", "ozone", "pact", "paddle", "page", "pair", "palace", "palm",
            "panda", "panel", "panic", "panther", "paper", "parade", "parent", "park", "parrot", "party",
            "pass", "patch", "path", "patient", "patrol", "pattern", "pause", "pave", "payment", "peace",
            "peanut", "pear", "peasant", "pelican", "pen", "penalty", "pencil", "people", "pepper", "perfect",
            "permit", "person", "pet", "phone", "photo", "phrase", "physical", "piano", "picnic", "picture",
            "piece", "pig", "pigeon", "pill", "pilot", "pink", "pioneer", "pipe", "pistol", "pitch",
            "pizza", "place", "planet", "plastic", "plate", "play", "please", "pledge", "pluck", "plug",
            "plunge", "poem", "poet", "point", "polar", "pole", "police", "pond", "pony", "pool",
            "popular", "portion", "position", "possible", "post", "potato", "pottery", "poverty", "powder", "power",
            "practice", "praise", "predict", "prefer", "prepare", "present", "pretty", "prevent", "price", "pride",
            "primary", "print", "priority", "prison", "private", "prize", "problem", "process", "produce", "profit",
            "program", "project", "promote", "proof", "property", "prosper", "protect", "proud", "provide", "public",
            "pudding", "pull", "pulp", "pulse", "pumpkin", "punch", "pupil", "puppy", "purchase", "purity",
            "purpose", "purse", "push", "put", "puzzle", "pyramid", "quality", "quantum", "quarter", "question",
            "quick", "quit", "quiz", "quote", "rabbit", "raccoon", "race", "rack", "radar", "radio",
            "rail", "rain", "raise", "rally", "ramp", "ranch", "random", "range", "rapid", "rare",
            "rate", "rather", "raven", "raw", "razor", "ready", "real", "reason", "rebel", "rebuild",
            "recall", "receive", "recipe", "record", "recycle", "reduce", "reflect", "reform", "refuse", "region",
            "regret", "regular", "reject", "relax", "release", "relief", "rely", "remain", "remember", "remind",
            "remove", "render", "renew", "rent", "reopen", "repair", "repeat", "replace", "report", "require",
            "rescue", "resemble", "resist", "resource", "response", "result", "retire", "retreat", "return", "reunion",
            "reveal", "review", "reward", "rhythm", "rib", "ribbon", "rice", "rich", "ride", "ridge",
            "rifle", "right", "rigid", "ring", "riot", "rip", "ripe", "rise", "risk", "rival",
            "river", "road", "roast", "robot", "robust", "rocket", "romance", "roof", "rookie", "room",
            "rose", "rotate", "rough", "round", "route", "royal", "rubber", "rude", "rug", "rule",
            "run", "runway", "rural", "sad", "saddle", "sadness", "safe", "sail", "salad", "salmon",
            "salon", "salt", "salute", "same", "sample", "sand", "satisfy", "satoshi", "sauce", "sausage",
            "save", "say", "scale", "scan", "scare", "scatter", "scene", "scheme", "school", "science",
            "scissors", "scorpion", "scout", "scrap", "screen", "script", "scrub", "sea", "search", "season",
            "seat", "second", "secret", "section", "security", "seed", "seek", "segment", "select", "sell",
            "seminar", "senior", "sense", "sentence", "series", "service", "session", "settle", "setup", "seven",
            "shadow", "shaft", "shallow", "share", "shed", "shell", "sheriff", "shield", "shift", "shine",
            "ship", "shiver", "shock", "shoe", "shoot", "shop", "short", "shoulder", "shove", "shrimp",
            "shrug", "shuffle", "shy", "sibling", "sick", "side", "siege", "sight", "sign", "silent",
            "silk", "silly", "silver", "similar", "simple", "since", "sing", "siren", "sister", "situate",
            "six", "size", "skate", "sketch", "ski", "skill", "skin", "skirt", "skull", "slab",
            "slam", "sleep", "slender", "slice", "slide", "slight", "slim", "slogan", "slot", "slow",
            "slush", "small", "smart", "smile", "smoke", "smooth", "snack", "snake", "snap", "sniff",
            "snow", "soap", "soccer", "social", "sock", "soda", "soft", "solar", "soldier", "solid",
            "solution", "solve", "someone", "song", "soon", "sorry", "sort", "soul", "sound", "soup",
            "source", "south", "space", "spare", "spatial", "spawn", "speak", "special", "speed", "spell",
            "spend", "sphere", "spice", "spider", "spike", "spin", "spirit", "split", "spoil", "sponsor",
            "spoon", "sport", "spot", "spray", "spread", "spring", "spy", "square", "squeeze", "squirrel",
            "stable", "stadium", "staff", "stage", "stairs", "stamp", "stand", "start", "state", "stay",
            "steak", "steel", "stem", "step", "stereo", "stick", "still", "sting", "stock", "stomach",
            "stone", "stool", "story", "stove", "strategy", "street", "strike", "strong", "struggle", "student",
            "stuff", "stumble", "style", "subject", "submit", "subway", "success", "such", "sudden", "suffer",
            "sugar", "suggest", "suit", "summer", "sun", "sunny", "sunset", "super", "supply", "supreme",
            "sure", "surface", "surge", "surprise", "surround", "survey", "suspect", "sustain", "swallow", "swamp",
            "swap", "swarm", "swear", "sweet", "swift", "swim", "swing", "switch", "sword", "symbol",
            "symptom", "syrup", "system", "table", "tackle", "tag", "tail", "talent", "talk", "tank",
            "tape", "target", "task", "taste", "tattoo", "taxi", "teach", "team", "tell", "ten",
            "tenant", "tennis", "tent", "term", "test", "text", "thank", "that", "theme", "then",
            "theory", "there", "they", "thing", "this", "thought", "three", "thrive", "throw", "thumb",
            "thunder", "ticket", "tide", "tiger", "tilt", "timber", "time", "tiny", "tip", "tired",
            "tissue", "title", "toast", "tobacco", "today", "toddler", "toe", "together", "toilet", "token",
            "tomato", "tomorrow", "tone", "tongue", "tonight", "tool", "tooth", "top", "topic", "topple",
            "torch", "tornado", "tortoise", "toss", "total", "tourist", "toward", "tower", "town", "toy",
            "track", "trade", "traffic", "tragic", "train", "transfer", "trap", "trash", "travel", "tray",
            "treat", "tree", "trend", "trial", "tribe", "trick", "trigger", "trim", "trip", "trophy",
            "trouble", "truck", "true", "truly", "trumpet", "trust", "truth", "try", "tube", "tuition",
            "tumble", "tuna", "tunnel", "turkey", "turn", "turtle", "twelve", "twenty", "twice", "twin",
            "twist", "two", "type", "typical", "ugly", "umbrella", "unable", "unaware", "uncle", "uncover",
            "under", "undo", "unfair", "unfold", "unhappy", "uniform", "unique", "unit", "universe", "unknown",
            "unlock", "until", "unusual", "unveil", "update", "upgrade", "uphold", "upon", "upper", "upset",
            "urban", "urge", "usage", "use", "used", "useful", "useless", "usual", "utility", "vacant",
            "vacuum", "vague", "valid", "valley", "valve", "van", "vanish", "vapor", "various", "vast",
            "vault", "vehicle", "velvet", "vendor", "venture", "venue", "verb", "verify", "version", "very",
            "vessel", "veteran", "viable", "vibrant", "vicious", "victory", "video", "view", "village", "vintage",
            "violin", "virtual", "virus", "visa", "visit", "visual", "vital", "vivid", "vocal", "voice",
            "void", "volcano", "volume", "vote", "voyage", "wage", "wagon", "wait", "walk", "wall",
            "walnut", "want", "warfare", "warm", "warrior", "wash", "wasp", "waste", "water", "wave",
            "way", "wealth", "weapon", "wear", "weasel", "weather", "web", "wedding", "weekend", "weird",
            "welcome", "west", "wet", "whale", "what", "wheat", "wheel", "when", "where", "whip",
            "whisper", "wide", "width", "wife", "wild", "will", "win", "window", "wine", "wing",
            "wink", "winner", "winter", "wire", "wisdom", "wise", "wish", "witness", "wolf", "woman",
            "wonder", "wood", "wool", "word", "work", "world", "worry", "worth", "wrap", "wreck",
            "wrestle", "wrist", "write", "wrong", "yard", "year", "yellow", "you", "young", "youth",
            "zebra", "zero", "zone", "zoo"
        ];
    }

    _sha256(data) {
        if (typeof data === 'string') {
            return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
        } else if (data instanceof Uint8Array) {
            let str = '';
            for (let i = 0; i < data.length; i++) {
                str += String.fromCharCode(data[i]);
            }
            return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
        } else {
            throw new Error('Unsupported data type for SHA-256');
        }
    }

    sha256(data) {
        return this._sha256(data);
    }

    _hexToBytes(hex) {
        if (hex.length % 2 !== 0) {
            throw new Error('Hex string must have even length');
        }
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
        }
        return bytes;
    }

    _bytesToHex(bytes) {
        return Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    _stringToBytes(str) {
        return new TextEncoder().encode(str);
    }

    generateKeyPair() {
        const keyPair = this.ec.genKeyPair();
        const privateKey = keyPair.getPrivate('hex');
        const publicKey = keyPair.getPublic(true, 'hex');
        return { privateKey, publicKey };
    }

    getRandomValues(entropy) {
        window.crypto.getRandomValues(entropy)
    }

    generateAccount(wordCount = 12) {
        try {
            const validCounts = [6, 12, 15, 18, 21, 24, 48];
            if (!validCounts.includes(wordCount)) {
                throw new Error('n 6, 12, 15, 18, 21, 24, or 48');
            }

            const entropyBits = (wordCount / 3) * 32;
            const entropyBytes = entropyBits / 8;

            const entropy = new Uint8Array(entropyBytes);
            crypto.getRandomValues(entropy);
            const entropyHex = this._bytesToHex(entropy);

            let bits = '';
            for (let i = 0; i < entropy.length; i++) {
                bits += entropy[i].toString(2).padStart(8, '0');
            }

            const hashFull = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(entropyHex)).toString(CryptoJS.enc.Hex);
            const hashBytes = this._hexToBytes(hashFull);
            const checksumBitLength = entropyBits / 32;
            const checksum = hashBytes[0] >> (8 - checksumBitLength);
            bits += checksum.toString(2).padStart(checksumBitLength, '0');

            const words = [];
            for (let i = 0; i < wordCount; i++) {
                const index = parseInt(bits.substr(i * 11, 11), 2);
                words.push(this.bip39Wordlist[index]);
            }

            const mnemonic = words.join(' ');
            const privateKey = wordCount === 24 ? entropyHex : this._sha256(entropyHex);
            const keyPair = this.ec.keyFromPrivate(privateKey, 'hex');
            const publicKey = keyPair.getPublic(true, 'hex');

            return { privateKey, publicKey, mnemonic, wordCount };

        } catch (error) {
            console.error('Account generation error:', error);
            throw error;
        }
    }

    signText(text, privateKeyHex) {
        try {
            const hashHex = this._sha256(text);
            const key = this.ec.keyFromPrivate(privateKeyHex, 'hex');
            const signature = key.sign(hashHex);
            return signature.toDER('hex');
        } catch (error) {
            console.error('Signing error:', error);
            throw error;
        }
    }

    verifySignature(text, signatureHex, publicKeyHex) {
        try {
            const hashHex = this._sha256(text);
            const key = this.ec.keyFromPublic(publicKeyHex, 'hex');
            return key.verify(hashHex, signatureHex);
        } catch (error) {
            console.error('Verification error:', error);
            return false;
        }
    }

    privateKeyToMnemonic(privateKeyHex, wordCount = 12) {
        try {
            const validCounts = [6, 12, 15, 18, 21, 24, 48];
            if (!validCounts.includes(wordCount)) {
                throw new Error('n 6, 12, 15, 18, 21, 24, or 48');
            }

            const privateKey = this._hexToBytes(privateKeyHex);
            if (privateKey.length !== 32) {
                throw new Error('n32by');
            }

            const entropyBits = (wordCount / 3) * 32;
            const entropyBytes = entropyBits / 8;

            let entropyHex;
            if (wordCount === 24) {
                entropyHex = privateKeyHex;
            } else if (wordCount === 48) {
                const hash1 = this._sha256(privateKeyHex);
                const hash2 = this._sha256(privateKeyHex + 'extra');
                entropyHex = hash1 + hash2;
            } else {
                const hashHex = this._sha256(privateKeyHex);
                entropyHex = hashHex.substring(0, entropyBytes * 2);
            }

            const entropy = this._hexToBytes(entropyHex);

            let bits = '';
            for (let i = 0; i < entropy.length; i++) {
                bits += entropy[i].toString(2).padStart(8, '0');
            }

            const hashFull = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(entropyHex)).toString(CryptoJS.enc.Hex);
            const hashBytes = this._hexToBytes(hashFull);
            const checksumBitLength = entropyBits / 32;
            const checksum = hashBytes[0] >> (8 - checksumBitLength);
            bits += checksum.toString(2).padStart(checksumBitLength, '0');

            const words = [];
            for (let i = 0; i < wordCount; i++) {
                const index = parseInt(bits.substr(i * 11, 11), 2);
                words.push(this.bip39Wordlist[index]);
            }

            return words.join(' ');

        } catch (error) {
            console.error('Mnemonic generation error:', error);
            throw error;
        }
    }

    mnemonicToPrivateKey(mnemonic) {
        try {
            const words = mnemonic.split(' ');
            const wordCount = words.length;

            const validCounts = [6, 12, 15, 18, 21, 24, 48];
            if (!validCounts.includes(wordCount)) {
                throw new Error('n 6, 12, 15, 18, 21, 24, or 48');
            }

            const entropyBits = (wordCount / 3) * 32;
            const checksumBitLength = entropyBits / 32;
            const totalBits = entropyBits + checksumBitLength;

            let bits = '';
            for (const word of words) {
                const index = this.bip39Wordlist.indexOf(word);
                if (index === -1) throw new Error(`Invalid word: ${word}`);
                bits += index.toString(2).padStart(11, '0');
            }

            if (bits.length !== totalBits) {
                throw new Error('Invalid mnemonic length');
            }

            const entropyBitsStr = bits.substr(0, entropyBits);
            const checksumBitsStr = bits.substr(entropyBits);

            const entropy = [];
            for (let i = 0; i < entropyBitsStr.length; i += 8) {
                entropy.push(parseInt(entropyBitsStr.substr(i, 8), 2));
            }

            const entropyHex = this._bytesToHex(entropy);
            const hashHex = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(entropyHex)).toString(CryptoJS.enc.Hex);
            const hashBytes = this._hexToBytes(hashHex);
            const expectedChecksum = hashBytes[0] >> (8 - checksumBitLength);
            const actualChecksum = parseInt(checksumBitsStr, 2);

            if (expectedChecksum !== actualChecksum) {
                throw new Error('Invalid checksum');
            }

            if (wordCount === 24) {
                return this._bytesToHex(entropy);
            }

            return this._sha256(entropyHex);

        } catch (error) {
            console.error('Mnemonic to key error:', error);
            throw error;
        }
    }

    toBase58(hex) {
        const bytes = this._hexToBytes(hex);
        const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        
        let zeros = 0;
        while (zeros < bytes.length && bytes[zeros] === 0) zeros++;
        
        let num = 0n;
        for (let i = 0; i < bytes.length; i++) {
            num = num * 256n + BigInt(bytes[i]);
        }
        
        let result = '';
        while (num > 0n) {
            const remainder = Number(num % 58n);
            result = alphabet[remainder] + result;
            num = num / 58n;
        }
        
        while (zeros-- > 0) result = '1' + result;
        return result;
    }

    fromBase58(base58) {
        const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        
        let zeros = 0;
        while (zeros < base58.length && base58[zeros] === '1') zeros++;
        
        let num = 0n;
        for (let i = zeros; i < base58.length; i++) {
            const index = alphabet.indexOf(base58[i]);
            if (index === -1) throw new Error('Invalid Base58 character');
            num = num * 58n + BigInt(index);
        }
        
        const bytes = [];
        while (num > 0n) {
            bytes.unshift(Number(num & 0xffn));
            num >>= 8n;
        }
        
        while (zeros-- > 0) bytes.unshift(0);
        return this._bytesToHex(bytes);
    }

    _generateAESKey() {
        return CryptoJS.lib.WordArray.random(32);
    }

    _aesEncrypt(plaintext, key) {
        const iv = CryptoJS.lib.WordArray.random(16);
        const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return {
            ciphertext: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
            iv: iv.toString(CryptoJS.enc.Base64)
        };
    }

    _aesDecrypt(encryptedPackage, key) {
        const iv = CryptoJS.enc.Base64.parse(encryptedPackage.iv);
        const ciphertext = CryptoJS.enc.Base64.parse(encryptedPackage.ciphertext);
        const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext });
        const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    _deriveKeys(sharedSecretHex) {
        const encKeyHex = this._sha256(sharedSecretHex);
        const macKeyHex = this._sha256(sharedSecretHex + 'auth');
        return {
            encKey: CryptoJS.enc.Hex.parse(encKeyHex),
            macKey: CryptoJS.enc.Hex.parse(macKeyHex)
        };
    }

    _encryptKeyFor(recipientPublicKeyHex, aesKey, messageIvCiphertext) {
        const ephemeralKey = this.ec.genKeyPair();
        const ephemeralPublicKey = ephemeralKey.getPublic(true, 'hex');
        const recipientKey = this.ec.keyFromPublic(recipientPublicKeyHex, 'hex');
        const sharedSecret = ephemeralKey.derive(recipientKey.getPublic());
        const sharedSecretHex = sharedSecret.toString(16);
        const { encKey, macKey } = this._deriveKeys(sharedSecretHex);

        const aesKeyBase64 = aesKey.toString(CryptoJS.enc.Base64);
        const ivKey = CryptoJS.lib.WordArray.random(16);
        const encryptedKey = CryptoJS.AES.encrypt(aesKeyBase64, encKey, {
            iv: ivKey,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const ciphertextKey = encryptedKey.ciphertext.toString(CryptoJS.enc.Base64);

        const messageData = messageIvCiphertext.iv + messageIvCiphertext.ciphertext;
        const messageMac = CryptoJS.HmacSHA256(messageData, macKey).toString(CryptoJS.enc.Base64);

        return {
            ephemeralPubKey: ephemeralPublicKey,
            iv: CryptoJS.enc.Base64.stringify(ivKey),
            ciphertext: ciphertextKey,
            messageMac
        };
    }

    _decryptKeyFor(myPrivateKeyHex, encryptedKeyPackage, messageIvCiphertext) {
        const pkg = encryptedKeyPackage;
        const ephemeralPubKeyHex = pkg.ephemeralPubKey;
        const iv = CryptoJS.enc.Base64.parse(pkg.iv);
        const ciphertext = CryptoJS.enc.Base64.parse(pkg.ciphertext);
        const expectedMessageMac = pkg.messageMac;

        const myKey = this.ec.keyFromPrivate(myPrivateKeyHex, 'hex');
        const ephemeralKey = this.ec.keyFromPublic(ephemeralPubKeyHex, 'hex');
        const sharedSecret = myKey.derive(ephemeralKey.getPublic());
        const sharedSecretHex = sharedSecret.toString(16);
        const { encKey, macKey } = this._deriveKeys(sharedSecretHex);

        const messageData = messageIvCiphertext.iv + messageIvCiphertext.ciphertext;
        const computedMessageMac = CryptoJS.HmacSHA256(messageData, macKey).toString(CryptoJS.enc.Base64);
        if (computedMessageMac !== expectedMessageMac) {
            throw new Error('Message HMAC verification failed');
        }

        const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext });
        const decryptedKeyBase64 = CryptoJS.AES.decrypt(cipherParams, encKey, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);

        return CryptoJS.enc.Base64.parse(decryptedKeyBase64);
    }

    encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) {
        const aesKey = this._generateAESKey();

        const encryptedMessage = this._aesEncrypt(plaintext, aesKey);
        const messageIvCiphertext = {
            iv: encryptedMessage.iv,
            ciphertext: encryptedMessage.ciphertext
        };

        const keyForRecipient = this._encryptKeyFor(recipientPublicKeyHex, aesKey, messageIvCiphertext);

        const senderPublicKey = this.ec.keyFromPrivate(senderPrivateKeyHex, 'hex').getPublic(true, 'hex');
        const keyForSender = this._encryptKeyFor(senderPublicKey, aesKey, messageIvCiphertext);

        return JSON.stringify({
            message: messageIvCiphertext,
            keys: {
                recipient: keyForRecipient,
                sender: keyForSender
            }
        });
    }

    decryptAsSender(encryptedPackageJson, myPrivateKeyHex) {
        const pkg = JSON.parse(encryptedPackageJson);
        const aesKey = this._decryptKeyFor(myPrivateKeyHex, pkg.keys.sender, pkg.message);
        return this._aesDecrypt(pkg.message, aesKey);
    }

    decryptAsRecipient(encryptedPackageJson, myPrivateKeyHex) {
        const pkg = JSON.parse(encryptedPackageJson);
        const aesKey = this._decryptKeyFor(myPrivateKeyHex, pkg.keys.recipient, pkg.message);
        return this._aesDecrypt(pkg.message, aesKey);
    }
}

if (typeof window !== 'undefined') {
    window.CryptoModuleBrowser = CryptoModuleBrowser;
}