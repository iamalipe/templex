"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var faker_1 = require("@faker-js/faker");
var musicGenreDataset = require("./music-genre-dataset.json");
var db = new client_1.PrismaClient();
var maxArtists = 200;
var maxSongsPerAlbum = 20;
var minSongsPerAlbum = 3;
var maxPlaylist = 200;
var maxSongsPerPlaylist = 100;
var minSongsPerPlaylist = 15;
var migrate = function () { return __awaiter(void 0, void 0, void 0, function () {
    var genres, artistsData, artists, albumsData, albums, songsData, songs, playlistData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Starting migration...");
                console.log("Deleting previous data");
                return [4 /*yield*/, db.genre.deleteMany({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, db.artist.deleteMany({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, db.song.deleteMany({})];
            case 3:
                _a.sent();
                return [4 /*yield*/, db.album.deleteMany({})];
            case 4:
                _a.sent();
                return [4 /*yield*/, db.playlist.deleteMany({})];
            case 5:
                _a.sent();
                console.log("Creating genres");
                return [4 /*yield*/, db.genre.createMany({
                        data: musicGenreDataset.map(function (e) { return ({
                            name: e["Genre"],
                            originYear: e["Origin Year"],
                            description: e["Description"],
                            popularInCountry: e["Popular in Country"],
                        }); }),
                    })];
            case 6:
                _a.sent();
                return [4 /*yield*/, db.genre.findMany()];
            case 7:
                genres = _a.sent();
                console.log("Creating artists");
                artistsData = Array.from({ length: maxArtists }).map(function (_, i) {
                    var specialtyInt = faker_1.faker.number.int({
                        min: 0,
                        max: musicSpecialties.length - 1,
                    });
                    var countryInt = faker_1.faker.number.int({
                        min: 0,
                        max: top50CountryCodes.length - 1,
                    });
                    var artistPayload = {
                        fullName: faker_1.faker.person.fullName(),
                        titleName: faker_1.faker.music.artist(),
                        email: faker_1.faker.internet.email(),
                        profileImage: faker_1.faker.image.urlPicsumPhotos({ height: 1000, width: 1000 }),
                        bio: faker_1.faker.lorem.paragraphs({ min: 4, max: 10 }),
                        nationality: top50CountryCodes[countryInt],
                        dob: faker_1.faker.date.birthdate(),
                        phoneNo: faker_1.faker.phone.number({ style: "international" }),
                        specialty: musicSpecialties[specialtyInt],
                    };
                    return artistPayload;
                });
                return [4 /*yield*/, db.artist.createMany({ data: artistsData })];
            case 8:
                _a.sent();
                return [4 /*yield*/, db.artist.findMany()];
            case 9:
                artists = _a.sent();
                console.log("Creating albums");
                albumsData = [];
                artists.forEach(function (artist) {
                    var albumsCount = faker_1.faker.number.int({
                        min: 0,
                        max: 5,
                    });
                    Array.from({ length: albumsCount }).map(function (_) {
                        var albumPayload = {
                            title: faker_1.faker.music.album(),
                            titleImage: faker_1.faker.image.urlPicsumPhotos({ height: 600, width: 1000 }),
                            releaseDate: faker_1.faker.date.between({
                                from: "2010-01-01T00:00:00.000Z",
                                to: "2025-01-01T00:00:00.000Z",
                            }),
                            artistId: artist.id,
                        };
                        albumsData.push(albumPayload);
                    });
                });
                return [4 /*yield*/, db.album.createMany({ data: albumsData })];
            case 10:
                _a.sent();
                return [4 /*yield*/, db.album.findMany()];
            case 11:
                albums = _a.sent();
                console.log("Creating songs");
                songsData = [];
                albums.forEach(function (album) {
                    var songsCount = faker_1.faker.number.int({
                        min: minSongsPerAlbum,
                        max: maxSongsPerAlbum,
                    });
                    Array.from({ length: songsCount }).map(function (_) {
                        var genreCount = faker_1.faker.number.int({
                            min: 1,
                            max: 3,
                        });
                        var artistCount = faker_1.faker.number.int({
                            min: 0,
                            max: 4,
                        });
                        var genreIds = Array.from({ length: genreCount }).map(function (_) {
                            var genre = faker_1.faker.helpers.arrayElement(genres);
                            return genre.id;
                        });
                        var artistIds = Array.from({ length: artistCount }).map(function (_) {
                            var artist = faker_1.faker.helpers.arrayElement(artists);
                            return artist.id;
                        });
                        var songPayload = {
                            title: faker_1.faker.music.songName(),
                            titleImage: faker_1.faker.image.urlPicsumPhotos({ height: 600, width: 600 }),
                            releaseDate: album.releaseDate,
                            duration: faker_1.faker.number.int({ min: 180, max: 480 }),
                            albumId: album.id,
                            artistIDs: __spreadArray([album.artistId], artistIds, true),
                            genreIDs: genreIds,
                            playlistIDs: [],
                        };
                        songsData.push(songPayload);
                    });
                });
                return [4 /*yield*/, db.song.createMany({ data: songsData })];
            case 12:
                _a.sent();
                return [4 /*yield*/, db.song.findMany()];
            case 13:
                songs = _a.sent();
                console.log("Creating playlists");
                playlistData = Array.from({ length: maxPlaylist }).map(function (_, i) {
                    var songsId = faker_1.faker.helpers
                        .arrayElements(songs, {
                        min: minSongsPerPlaylist,
                        max: maxSongsPerPlaylist,
                    })
                        .map(function (song) { return song.id; });
                    var playlistPayload = {
                        name: "".concat(faker_1.faker.music.album(), " ").concat(faker_1.faker.word.words(2)),
                        description: faker_1.faker.lorem.paragraphs(),
                        songIDs: songsId,
                    };
                    return playlistPayload;
                });
                return [4 /*yield*/, db.playlist.createMany({ data: playlistData })];
            case 14:
                _a.sent();
                console.log("Done!");
                return [2 /*return*/];
        }
    });
}); };
migrate();
var musicSpecialties = [
    "Vocals",
    "Guitar",
    "Piano",
    "Drums",
    "Bass",
    "Songwriting",
    "Music Production",
    "DJ",
    "Violin",
    "Saxophone",
    "Trumpet",
    "Flute",
    "Cello",
    "Clarinet",
    "Keyboard",
    "Percussion",
    "Music Theory",
    "Music Composition",
    "Audio Engineering",
    "Conducting",
    "Music Education",
    "Music Therapy",
    "Music Performance",
    "Music History",
    "Music Criticism",
    "Music Journalism",
    "Music Business",
    "Artist Management",
    "Concert Promotion",
    "Music Publishing",
    "Music Licensing",
    "Music Marketing",
    "Sound Design",
    "Film Scoring",
    "Video Game Music",
    "Opera Singing",
    "Musical Theatre",
    "Jazz Improvisation",
    "Classical Performance",
    "Rock Performance",
    "Hip Hop Production",
    "Electronic Music Production",
    "Mixing",
    "Mastering",
    "Orchestration",
    "Arrangement",
    "Music Notation",
    "Music Transcription",
    "Ethnomusicology",
    "Music Technology",
    "Synthesizer Programming",
    "Beatboxing",
    "Turntablism",
    "A Cappella",
    "Choral Conducting",
    "Gospel Choir Direction",
    "Music Pedagogy",
    "Instrument Repair",
    "Luthiery",
    "Music Software Development",
    "Music App Development",
    "Music Streaming Platform Management",
    "Concert Hall Management",
    "Record Label Operations",
    "Music Copyright Law",
    "Music Supervision",
    "Music Archiving",
    "Music Librarian",
    "Music Therapy Research",
    "Music Psychology",
    "Acoustic Design",
    "Live Sound Engineering",
    "Studio Design",
    "Music Merchandise Design",
    "Album Art Design",
    "Music Video Direction",
    "Music Documentary Filmmaking",
    "Music Biographer",
    "Music Memorabilia Appraisal",
    "Instrument Making",
    "Music Instrument Retail",
    "Sheet Music Publishing",
    "Music Festival Organization",
    "Concert Tour Management",
    "Music Rights Management",
    "Music Analytics",
    "Music Recommendation Systems",
    "Music AI Development",
    "Virtual Reality Music Experiences",
    "Augmented Reality Music Applications",
    "Interactive Music Installation Design",
    "Music Therapy for Special Needs",
    "Music for Meditation and Wellness",
    "Corporate Music Branding",
    "Music in Advertising",
    "Music for Public Spaces",
    "Music Philanthropy",
    "Music Preservation",
    "World Music Studies",
    "Indigenous Music Studies",
    "Music Archaeology",
];
var top50CountryCodes = [
    "CHN", // China
    "IND", // India
    "USA", // United States
    "IDN", // Indonesia
    "PAK", // Pakistan
    "NGA", // Nigeria
    "BRA", // Brazil
    "BGD", // Bangladesh
    "RUS", // Russia
    "MEX", // Mexico
    "JPN", // Japan
    "ETH", // Ethiopia
    "PHL", // Philippines
    "EGY", // Egypt
    "VNM", // Vietnam
    "COD", // DR Congo
    "TUR", // Turkey
    "IRN", // Iran
    "DEU", // Germany
    "THA", // Thailand
    "GBR", // United Kingdom
    "FRA", // France
    "ITA", // Italy
    "ZAF", // South Africa
    "TZA", // Tanzania
    "MMR", // Myanmar
    "KEN", // Kenya
    "KOR", // South Korea
    "COL", // Colombia
    "ESP", // Spain
    "UGA", // Uganda
    "ARG", // Argentina
    "DZA", // Algeria
    "SDN", // Sudan
    "UKR", // Ukraine
    "IRQ", // Iraq
    "AFG", // Afghanistan
    "POL", // Poland
    "CAN", // Canada
    "MAR", // Morocco
    "SAU", // Saudi Arabia
    "UZB", // Uzbekistan
    "PER", // Peru
    "AGO", // Angola
    "MYS", // Malaysia
    "MOZ", // Mozambique
    "GHA", // Ghana
    "YEM", // Yemen
    "NPL", // Nepal
    "VEN", // Venezuela
    "MDG", // Madagascar
];
function getRandomBooleanWithWeight(trueWeight) {
    if (trueWeight === void 0) { trueWeight = 0.5; }
    // trueWeight should be a value between 0 and 1
    return Math.random() < trueWeight;
}
