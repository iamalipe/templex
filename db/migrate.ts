import { Album, Artist, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const musicGenreDataset = require("./music-genre-dataset.json");

const db = new PrismaClient();

const maxArtists = 200;
const maxSongsPerAlbum = 20;
const minSongsPerAlbum = 3;
const maxPlaylist = 200;
const maxSongsPerPlaylist = 100;
const minSongsPerPlaylist = 15;

const migrate = async () => {
  console.log("Starting migration...");

  console.log("Deleting previous data");
  await db.genre.deleteMany({});
  await db.artist.deleteMany({});
  await db.song.deleteMany({});
  await db.album.deleteMany({});
  await db.playlist.deleteMany({});

  console.log("Creating genres");
  await db.genre.createMany({
    data: musicGenreDataset.map((e: any) => ({
      name: e["Genre"],
      originYear: e["Origin Year"],
      description: e["Description"],
      popularInCountry: e["Popular in Country"],
    })),
  });
  const genres = await db.genre.findMany();

  console.log("Creating artists");
  const artistsData = Array.from({ length: maxArtists }).map((_, i) => {
    const specialtyInt = faker.number.int({
      min: 0,
      max: musicSpecialties.length - 1,
    });
    const countryInt = faker.number.int({
      min: 0,
      max: top50CountryCodes.length - 1,
    });
    const artistPayload = {
      fullName: faker.person.fullName(),
      titleName: faker.music.artist(),
      email: faker.internet.email(),
      profileImage: faker.image.urlPicsumPhotos({ height: 1000, width: 1000 }),
      bio: faker.lorem.paragraphs({ min: 4, max: 10 }),
      nationality: top50CountryCodes[countryInt],
      dob: faker.date.birthdate(),
      phoneNo: faker.phone.number({ style: "international" }),
      specialty: musicSpecialties[specialtyInt],
    };
    return artistPayload;
  });
  await db.artist.createMany({ data: artistsData });
  const artists = await db.artist.findMany();

  console.log("Creating albums");
  const albumsData: {
    title: string;
    titleImage: string;
    releaseDate: Date;
    artistId: string;
  }[] = [];
  artists.forEach((artist) => {
    const albumsCount = faker.number.int({
      min: 0,
      max: 5,
    });
    Array.from({ length: albumsCount }).map((_) => {
      const albumPayload = {
        title: faker.music.album(),
        titleImage: faker.image.urlPicsumPhotos({ height: 600, width: 1000 }),
        releaseDate: faker.date.between({
          from: "2010-01-01T00:00:00.000Z",
          to: "2025-01-01T00:00:00.000Z",
        }),
        artistId: artist.id,
      };
      albumsData.push(albumPayload);
    });
  });
  await db.album.createMany({ data: albumsData });
  const albums = await db.album.findMany();

  console.log("Creating songs");
  const songsData: {
    title: string;
    titleImage: string;
    releaseDate: Date;
    duration: number;
    albumId: string;
    artistIDs: string[];
    genreIDs: string[];
    playlistIDs: string[];
  }[] = [];
  albums.forEach((album) => {
    const songsCount = faker.number.int({
      min: minSongsPerAlbum,
      max: maxSongsPerAlbum,
    });
    Array.from({ length: songsCount }).map((_) => {
      const genreCount = faker.number.int({
        min: 1,
        max: 3,
      });
      const artistCount = faker.number.int({
        min: 0,
        max: 4,
      });

      const genreIds = Array.from({ length: genreCount }).map((_) => {
        const genre = faker.helpers.arrayElement(genres);
        return genre.id;
      });

      const artistIds = Array.from({ length: artistCount }).map((_) => {
        const artist = faker.helpers.arrayElement(artists);
        return artist.id;
      });

      const songPayload = {
        title: faker.music.songName(),
        titleImage: faker.image.urlPicsumPhotos({ height: 600, width: 600 }),
        releaseDate: album.releaseDate,
        duration: faker.number.int({ min: 180, max: 480 }),

        albumId: album.id,
        artistIDs: [album.artistId, ...artistIds],
        genreIDs: genreIds,
        playlistIDs: [],
      };
      songsData.push(songPayload);
    });
  });
  await db.song.createMany({ data: songsData });
  const songs = await db.song.findMany();

  console.log("Creating playlists");
  const playlistData = Array.from({ length: maxPlaylist }).map((_, i) => {
    const songsId = faker.helpers
      .arrayElements(songs, {
        min: minSongsPerPlaylist,
        max: maxSongsPerPlaylist,
      })
      .map((song) => song.id);

    const playlistPayload = {
      name: `${faker.music.album()} ${faker.word.words(2)}`,
      description: faker.lorem.paragraphs(),
      songIDs: songsId,
    };
    return playlistPayload;
  });
  await db.playlist.createMany({ data: playlistData });

  console.log("Done!");
};

migrate();

const musicSpecialties = [
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

const top50CountryCodes = [
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

function getRandomBooleanWithWeight(trueWeight = 0.5) {
  // trueWeight should be a value between 0 and 1
  return Math.random() < trueWeight;
}
