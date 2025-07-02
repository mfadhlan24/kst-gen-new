import express from "express";
import { Faker, id_ID } from "@faker-js/faker";
const faker = new Faker({ locale: [id_ID] });

const router = express.Router();

router.get("/", (req, res) => {
  const nama = faker.person.fullName();
  const tahunSekarang = new Date().getFullYear() % 100;
  const angkatanList = [];
for (let i = 21; i <= tahunSekarang; i++) {
  angkatanList.push(i);
}
const angkatan = faker.helpers.arrayElement(angkatanList);
// 8 digit random
const randomDigits = Math.floor(10000000 + Math.random() * 110000000);  // selalu 8 digit
const nim = `${angkatan}${randomDigits}`;
 
  const strata = faker.helpers.arrayElement(["Strata 1", "Strata 2"]);
  const prodi = faker.helpers.arrayElement([
    "Sistem Komputer", 
    "Teknik Informatika", 
    "Sistem Informasi",
    'Bisnis Digital'
  ]);
  const konsentrasi = faker.helpers.arrayElement([
    "COS", "AI", "CIS", "RPL", "Multimedia",'FEB'
  ]);

  res.render("index", {
    nama,
    nim,
    strata,
    prodi,
    konsentrasi,
    namaDosen: faker.person.fullName()
  });
});

export default router;
