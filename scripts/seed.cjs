import mongoose from "mongoose";
import User from "../models/userModel.cjs";
import Sell from "../models/sellModels.cjs";
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedData = async () => {
  await mongoose.connect(MONGO_URI);

  const users = [
    {
      username: "daniel",
      email: "dani@gmail.com",
      password: "$2b$10$2K.3Upk4CVOcAl88WqNpdeSjG4rLpn0Lho9IrqcIjjA5BN6AVGI9q",
    },
    {
      username: "ali",
      email: "ali@gmail.com",
      password: "$2b$10$xZmbgRYnVZlXZBq53UjSLup9ZhH8AqLnmZSYu//meAY4phrq2oOzS",
    },
  ];
  const product = [
    {
      type: "car",
      email: "ali@gmail.com",
      brand: "bmw",
      model: "7 Series",
      work: "0",
      year: 2024,
      price: "150k",
      image: [
        "https://utfs.io/f/7db2a472-a4e0-46d7-aed2-ee49bb4e93d2-b5zydb.webp",
        "https://utfs.io/f/9f7b3931-b0d4-44cf-9fde-873dfd5d6441-wc1luq.webp",
      ],
      registered: true,
    },
    {
      type: "car",
      email: "ali@gmail.com",
      brand: "mercedesbenz",
      model: "S-Class",
      work: "0",
      year: 2024,
      price: "200k",
      image: [
        "https://utfs.io/f/bf1ee974-b4d4-414f-8683-117079219ef3-x0z250.webp",
        "https://utfs.io/f/c787042e-a7d0-447c-80c4-f4f67ebc426d-x6ojcx.webp",
        "https://utfs.io/f/e1d6f455-af41-43f5-879d-42d40135768c-rg2rxu.webp",
      ],
      registered: true,
    },
    {
      type: "car",
      email: "ali@gmail.com",
      brand: "bmw",
      model: "M4 Competition",
      work: "10k",
      year: 2020,
      price: "65k",
      image: [
        "https://utfs.io/f/65300935-6572-493b-9742-14642cc4c5e8-yzewy5.webp",
        "https://utfs.io/f/47c90ae0-94d9-44a0-8cc1-5b067b1c6962-p7g3ea.webp",
      ],
      registered: true,
    },
    {
      type: "car",
      email: "ali@gmail.com",
      brand: "porsche",
      model: "Cayenne Coupe",
      work: "180k",
      year: 2013,
      price: "35k",
      image: [
        "https://utfs.io/f/14ebaa59-a9ef-409c-b6a9-06e9b354234e-o5j6o1.webp",
        "https://utfs.io/f/3122a634-62ee-4af8-b3a4-3b103ae8c109-5odb4d.webp",
        "https://utfs.io/f/d6353371-25f9-46f1-be2c-708cf36787ee-8wzyrc.webp",
      ],
      registered: true,
    },
    {
      type: "car",
      email: "ali@gmail.com",
      brand: "mercedesbenz",
      model: "AMG E53 Cabriolet",
      work: "40k",
      year: 2020,
      price: "80k",
      image: [
        "https://utfs.io/f/41d9cd9a-cd90-4586-8da7-20d99e7eabdc-nfx81i.webp",
        "https://utfs.io/f/2aea7eab-ddd6-4f86-9556-e7424f7c845d-nmy6cm.webp",
      ],
      registered: true,
    },
    {
      type: "car",
      email: "ali@gmail.com",
      brand: "porsche",
      model: "Panamera",
      work: "50k",
      year: 2019,
      price: "60k",
      image: [
        "https://utfs.io/f/e114abad-aa4e-4f57-9104-1c2f54ffc5de-ketlmt.webp",
        "https://utfs.io/f/d674e733-b7e0-48a5-8f63-f98e5eaebc55-6qy2f5.webp",
        "https://utfs.io/f/b87f77d2-41d4-4e38-b581-5a78418d542f-q51g9p.webp",
      ],
      registered: true,
    },
    {
      type: "car",
      email: "ali@gmail.com",
      brand: "toyota",
      model: "Land Cruiser",
      work: "0",
      year: 2024,
      price: "120k",
      image: [
        "https://utfs.io/f/b49072e6-78f9-4432-8a98-da77e42230c6-yx85xs.webp",
        "https://utfs.io/f/993c92b7-4ce4-42a6-9412-358ab6ad66b1-h8tddf.webp",
        "https://utfs.io/f/62ccf311-5ca8-44e2-9403-4eb8685c1b49-dc4n75.webp",
      ],
      registered: true,
    },
    {
      type: "car",
      email: "ali@gmail.com",
      brand: "toyota",
      model: "Camry",
      work: "70k",
      year: 2018,
      price: "50k",
      image: [
        "https://utfs.io/f/9e211178-25c0-496d-9da7-b4411feded35-9xfcgm.webp",
        "https://utfs.io/f/b494c3e0-a27e-4cdf-819b-dc6e9b9d9ce6-mutodu.webp",
      ],
      registered: true,
    },
    {
      type: "motor",
      email: "dani@gmail.com",
      brand: "kawasaki",
      model: "Z650",
      work: "2.5k",
      year: 2023,
      price: "6.5k",
      image: [
        "https://utfs.io/f/f0234091-0f60-40b6-980e-e8f2a83c47fd-u21xhs.webp",
        "https://utfs.io/f/c37247c7-0876-4301-8d1c-ec7c2ddd9a1e-u21xhr.webp",
        "https://utfs.io/f/5a01ab9e-b0a7-4876-9aa1-487081799a45-7obt1o.webp",
      ],
      registered: true,
    },
    {
      type: "motor",
      email: "dani@gmail.com",
      brand: "yamaha",
      model: "MT-07",
      work: "0",
      year: 2024,
      price: "8k",
      image: [
        "https://utfs.io/f/31291a8e-480f-49b1-bcc8-17a88ea30e69-6bm29u.webp",
      ],
      registered: true,
    },
  ];

  await User.deleteMany({}); 
  await User.insertMany(users);
  await Sell.deleteMany({}); 
  await Sell.insertMany(product);

  console.log("Database seeded successfully!");
  mongoose.connection.close();
};

seedData().catch((err) => {
  console.error("Error seeding database:", err);
  mongoose.connection.close();
});
