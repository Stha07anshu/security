import img01 from "../product-images/creata.png";
import img02 from "../product-images/toyota.png";
import img03 from "../product-images/bmw.png";
import img04 from "../product-images/nissan.png";
import img05 from "../product-images/swift.png";
import img06 from "../product-images/gle.png";
import img07 from "../product-images/lc.png";
import img08 from "../product-images/pajero.png";

const carData = [
  {
    id: 1,
    brand: "Hyundai",
    rating: 112,
    carName: "Creta",
    imgUrl: img01,
    vehicleType: "SUV",
    price: 6500, // Adjusted to NPR
    speed: "16kmpl",
    fuelType: "Petrol",
    gps: "GPS Navigation",
    seatType: "Comfortable seats",
    automatic: "Automatic",
    description:
      "The Hyundai Creta is a popular SUV in Nepal, known for its robust performance and comfortable interior. It offers a smooth ride on the country's diverse terrains, from city roads to mountainous regions.",
  },
  {
    id: 2,
    brand: "Toyota",
    rating: 102,
    carName: "Toyota Hilux",
    imgUrl: img02,
    vehicleType: "Pickup Truck",
    price: 9750, // Adjusted to NPR
    speed: "12kmpl",
    fuelType: "Diesel",
    gps: "GPS Navigation",
    seatType: "Leather seats",
    automatic: "Manual",
    description:
      "The Toyota Hilux is a rugged pickup truck favored in Nepal for its durability and off-road capabilities. Ideal for both urban and rural settings, it handles the challenging roads of Nepal with ease.",
  },
  {
    id: 3,
    brand: "BMW",
    rating: 132,
    carName: "BMW X1",
    imgUrl: img03,
    vehicleType: "SUV",
    price: 11050, // Adjusted to NPR
    speed: "14kmpl",
    fuelType: "Petrol",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "The BMW X1 combines luxury and performance, making it a sought-after SUV in Nepal. It provides a premium driving experience with advanced features suitable for the varied landscapes of Nepal.",
  },
  {
    id: 4,
    brand: "Nissan",
    rating: 102,
    carName: "Nissan Patrol",
    imgUrl: img04,
    vehicleType: "4WD",
    price: 11700, // Adjusted to NPR
    speed: "10kmpl",
    fuelType: "Diesel",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "The Nissan Patrol is renowned for its power and reliability. In Nepal, it is appreciated for its strong build and capability to navigate through tough terrains, including mountainous and rural areas.",
  },
  {
    id: 5,
    brand: "Suzuki",
    rating: 94,
    carName: "Suzuki Swift",
    imgUrl: img05,
    vehicleType: "Hatchback",
    price: 5200, // Adjusted to NPR
    speed: "18kmpl",
    fuelType: "Petrol",
    gps: "GPS Navigation",
    seatType: "Fabric seats",
    automatic: "Automatic",
    description:
      "The Suzuki Swift is a compact car that is perfect for city driving in Nepal. Its fuel efficiency and compact size make it ideal for navigating through crowded urban streets and narrow alleys.",
  },
  {
    id: 6,
    brand: "Mercedes",
    rating: 119,
    carName: "Mercedes Benz GLE",
    imgUrl: img06,
    vehicleType: "SUV",
    price: 15600, // Adjusted to NPR
    speed: "11kmpl",
    fuelType: "Diesel",
    gps: "GPS Navigation",
    seatType: "Leather seats",
    automatic: "Automatic",
    description:
      "The Mercedes Benz GLE offers a luxurious and powerful driving experience. In Nepal, it is favored by those who seek comfort and elegance along with superior performance, even on uneven roads.",
  },
  {
    id: 7,
    brand: "Toyota",
    rating: 82,
    carName: "Toyota Land Cruiser",
    imgUrl: img07,
    vehicleType: "4WD",
    price: 16900, // Adjusted to NPR
    speed: "9kmpl",
    fuelType: "Diesel",
    gps: "GPS Navigation",
    seatType: "Leather seats",
    automatic: "Automatic",
    description:
      "The Toyota Land Cruiser is the epitome of durability and luxury. It is highly esteemed in Nepal for its off-road capabilities, ensuring a smooth and safe journey through the country’s challenging terrains.",
  },
  {
    id: 8,
    brand: "Mitsubishi",
    rating: 52,
    carName: "Mitsubishi Pajero",
    imgUrl: img08,
    vehicleType: "4WD",
    price: 9100, // Adjusted to NPR
    speed: "11kmpl",
    fuelType: "Diesel",
    gps: "GPS Navigation",
    seatType: "Comfortable seats",
    automatic: "Manual",
    description:
      "The Mitsubishi Pajero is a robust SUV popular in Nepal for its reliability and off-road prowess. It is a great choice for those looking to explore both urban and rural areas with ease and comfort.",
  },
];

export default carData;
