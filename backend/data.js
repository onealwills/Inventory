import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Oneal",
      email: "SuperAdmin@example.com",
      password: bcrypt.hashSync("1234", 8),
      isSuperAdmin: true,
      isAdmin: true,
      isStockKeeper: true,
      stockKeeper: {
        name: "Oneal",
        warehouse: "4 graceland avenue",
        rating: 4.7,
        numReviews: 100,
      },
    },
    {
      name: "John",
      email: "Admin@example.com",
      password: bcrypt.hashSync("1234", 8),
      isSuperAdmin: false,
      isAdmin: true,
      isStockKeeper: true,
      stockKeeper: {
        name: "john",
        warehouse: "4 graceland avenue",
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: "Bills",
      email: "StockKeeper@example.com",
      password: bcrypt.hashSync("1234", 8),
      isSuperAdmin: false,
      isAdmin: false,
      isStockKeeper: true,
      stockKeeper: {
        name: "Bills",
        warehouse: "6 graceland avenue",
        rating: 4.8,
        numReviews: 90,
      },
    },
    {
      name: "maroon",
      email: "maroon@example.com",
      password: bcrypt.hashSync("1234", 8),
      isSuperAdmin: false,
      isAdmin: false,
      isStockKeeper: false,
    },
    {
      name: "Fade",
      email: "fade@example.com",
      password: bcrypt.hashSync("1234", 8),
      isSuperAdmin: false,
      isAdmin: false,
      isStockKeeper: false,
    },
    {
      name: "sultan",
      email: "sultan@example.com",
      password: bcrypt.hashSync("1234", 8),
      isSuperAdmin: false,
      isAdmin: false,
      isStockKeeper: false,
    },
    {
      name: "lexy",
      email: "lexy@example.com",
      password: bcrypt.hashSync("1234", 8),
      isSuperAdmin: false,
      isAdmin: false,
      isStockKeeper: false,
    },
    {
      name: "Jordan",
      email: "jordan@example.com",
      password: bcrypt.hashSync("1234", 8),
      isSuperAdmin: false,
      isAdmin: false,
      isStockKeeper: false,
    },
    {
      name: "Yeezy",
      email: "yeezy@example.com",
      password: bcrypt.hashSync("1234", 8),
      isSuperAdmin: false,
      isAdmin: false,
      isStockKeeper: false,
    },
    {
      name: "Kanye",
      email: "kanye@example.com",
      password: bcrypt.hashSync("1234", 8),
      isSuperAdmin: false,
      isAdmin: false,
      isStockKeeper: false,
    },
  ],
  products: [
    {
      image: "/images/2009 Honda CRV drier.jpg",
      type: "Ac/drier",
      make: "Honda",
      model: "CRV",
      year: "2009",
      stockQty: 50,
      price: 12000,
    },
    {
      image: "/images/2009 Toyota RAV4 drier.jpg",
      type: "Ac/drier",
      make: "Toyota",
      model: "RAV4",
      year: "2009",
      stockQty: 0,
      price: 11000,
    },
    {
      image: "/images/2010 Ford Escape drier.jpg",
      type: "Ac/drier",
      make: "Ford",
      model: "Escape",
      year: "2010",
      stockQty: 80,
      price: 14000,
    },
    {
      image: "/images/2010 Ford Focus drier.jpg",
      type: "Ac/drier",
      make: "Ford",
      model: "Focus",
      year: "2010",
      stockQty: 30,
      price: 19000,
    },
    {
      image: "/images/2010 Mazda 3  drier.jpg",
      type: "Ac/drier",
      make: "Mazda",
      model: "Mazda 3",
      year: "2010",
      stockQty: 51,
      price: 11000,
    },
    {
      image: "/images/2011 Audi A5 cabin.jpg",
      type: "Cabin Filter",
      make: "Audi",
      model: "A5",
      year: "2011",
      stockQty: 13,
      price: 1200,
    },
    {
      image: "/images/2011 Audi A5 comp.jpg",
      type: "Compressor",
      make: "Audi",
      model: "A5",
      year: "2011",
      stockQty: 45,
      price: 85000,
    },
    {
      image: "/images/2011 Audi A5 drier.jpg",
      type: "Ac/drier",
      make: "Audi",
      model: "A5",
      year: "2011",
      stockQty: 23,
      price: 2500,
    },
    {
      image: "/images/2011 Audi A5 valve.jpg",
      type: "Exapansion Valve",
      make: "Audi",
      model: "A5",
      year: "2011",
      stockQty: 100,
      price: 1200,
    },
    {
      image: "/images/2011 Honda Pilot drier.jpg",
      type: "Ac/drier",
      make: "Honda",
      model: "Pilot",
      year: "2011",
      stockQty: 98,
      price: 1000,
    },
    {
      image: "/images/2014 Honda CRV cabin.jpg",
      type: "Cabin Filter",
      make: "Honda",
      model: "CRV",
      year: "2014",
      stockQty: 53,
      price: 1300,
    },
    {
      image: "/images/2014 Honda CRV comp.jpg",
      type: "Compressor",
      make: "Honda",
      model: "CRV",
      year: "2014",
      stockQty: 10,
      price: 120000,
    },
    {
      image: "/images/2014 Honda CRV valve.jpg",
      type: "Expansion valve",
      make: "Honda",
      model: "CRV",
      year: "2014",
      stockQty: 120,
      price: 12000,
    },
    {
      image: "/images/2014 Land Rover LR4 cabin.jpg",
      type: "Cabin Filter",
      make: "Land Rover",
      model: "LR4",
      year: "2014",
      stockQty: 50,
      price: 1100,
    },
    {
      image: "/images/2014 Land Rover LR4 valve.jpg",
      type: "Expansion valve",
      make: "Land Rover",
      model: "LR4",
      year: "2014",
      stockQty: 70,
      price: 12000,
    },
    {
      image: "/images/2016 BMW X5  valve.jpg",
      type: "Expansion valve",
      make: "BMW",
      model: "X5",
      year: "2016",
      stockQty: 40,
      price: 17000,
    },
    {
      image: "/images/2016 BMW X5 cabin.jpg",
      type: "Cabin Filter",
      make: "BMW",
      model: "X5",
      year: "2016",
      stockQty: 10,
      price: 1300,
    },
    {
      image: "/images/2016 BMW X5 comp.jpg",
      type: "Compressor",
      make: "BMW",
      model: "X5",
      year: "2016",
      stockQty: 5,
      price: 250000,
    },
    {
      image: "/images/2017 Honda Accord cabin.jpg",
      type: "Cabin filter",
      make: "Honda",
      model: "Accord",
      year: "2017",
      stockQty: 140,
      price: 1500,
    },
    {
      image: "/images/2017 Honda Accord comp.jpg",
      type: "Compressor",
      make: "Honda",
      model: "Accord",
      year: "2017",
      stockQty: 12,
      price: 170000,
    },
    {
      image: "/images/2017 Honda Accord valve.jpg",
      type: "Expansion valve",
      make: "Honda",
      model: "Accord",
      year: "2017",
      stockQty: 150,
      price: 10000,
    },
    {
      image: "/images/2017 Land Rover Range Rover Evoque cabin.jpg",
      type: "Cabin filter",
      make: "Land Rover",
      model: "Range Rover Evoque",
      year: "2017",
      stockQty: 40,
      price: 17000,
    },
    {
      image: "/images/2017 Land Rover Range Rover Evoque comp.jpg",
      type: "Compressor",
      make: "Land Rover",
      model: "Range Rover Evoque",
      year: "2017",
      stockQty: 10,
      price: 350000,
    },
    {
      image: "/images/2017 Land Rover Range Rover Evoque valve.jpg",
      type: "Expansion valve",
      make: "Land Rover",
      model: "Range Rover Evoque",
      year: "2017",
      stockQty: 170,
      price: 14500,
    },
    {
      image: "/images/bmw 2016 x6 evap.jpg",
      type: "Exaporator",
      make: "BMW",
      model: "X6",
      year: "2016",
      stockQty: 15,
      price: 18000,
    },
    {
      image: "/images/bmw 2016 x6.jpg",
      type: "Condenser",
      make: "BMW",
      model: "X6",
      year: "2016",
      stockQty: 45,
      price: 19000,
    },
    {
      image: "/images/ford edge 2011 evap.jpg",
      type: "Evaporator",
      make: "Ford",
      model: "Edge",
      year: "2011",
      stockQty: 35,
      price: 13000,
    },
    {
      image: "/images/hyundai tucson 2013 evap.jpg",
      type: "Evaporator",
      make: "Hyundai",
      model: "Tucson",
      year: "2013",
      stockQty: 10,
      price: 19000,
    },
    {
      image: "/images/hyundai tucson 2017 cabin filter.jpg",
      type: "Cabin Filter",
      make: "Hyundai",
      model: "Tucson",
      year: "2017",
      stockQty: 500,
      price: 800,
    },
    {
      image: "/images/Hyundai tucson 2017 comp.jpg",
      type: "Compressor",
      make: "Hyundai",
      model: "tucson",
      year: "2017",
      stockQty: 10,
      price: 170000,
    },
    {
      image: "/images/hyundai tucson 2017 cabin filter.jpg",
      type: "Cabin filter",
      make: "Hyundai",
      model: "tucson",
      year: "2017",
      stockQty: 20,
      price: 1400,
    },
    {
      image: "/images/Hyundai tucson 2017 comp.jpg",
      type: "Compressor",
      make: "Hyundai",
      model: "tucson",
      year: "2017",
      stockQty: 12,
      price: 130000,
    },
    {
      image: "/images/Hyundai Tucson 2017 evap.jpg",
      type: "Evaporator",
      make: "Hyundai",
      model: "tucson",
      year: "2017",
      stockQty: 60,
      price: 12000,
    },
    {
      image: "/images/Hyundai Tucson 2017 valve.jpg",
      type: "Expansion valve",
      make: "Hyundai",
      model: "tucson",
      year: "2017",
      stockQty: 150,
      price: 11000,
    },
    {
      image: "/images/kia rio 2014 evap.jpg",
      type: "Evaporator",
      make: "Kia",
      model: "Rio",
      year: "2014",
      stockQty: 50,
      price: 8000,
    },
    {
      image: "/images/mazda 2012 cx7.jpg",
      type: "Condenser",
      make: "Mazda",
      model: "CX7",
      year: "2012",
      stockQty: 53,
      price: 16000,
    },
    {
      image: "/images/mercedes 2015 glk350 valve.jpg",
      type: "Expansion valve",
      make: "Mercedes",
      model: "GLK350",
      year: "2015",
      stockQty: 30,
      price: 25000,
    },
    {
      image: "/images/mercedes 2015 glk350.jpg",
      type: "Condenser",
      make: "Mercedes",
      model: "GLK350",
      year: "2015",
      stockQty: 31,
      price: 45000,
    },
    {
      image: "/images/mercedes glk 2015 cabin.jpg",
      type: "Cabin Filter",
      make: "Mercedes",
      model: "GLK",
      year: "2015",
      stockQty: 10,
      price: 35000,
    },
    {
      image: "/images/mercedes glk 2015 comp.jpg",
      type: "Compressor",
      make: "Mercedes",
      model: "GLK",
      year: "2015",
      stockQty: 2,
      price: 450000,
    },
    {
      image: "/images/Toyota corolla 2008.jpg",
      type: "condenser",
      make: "Toyota",
      model: "Corolla",
      year: "2008",
      stockQty: 30,
      price: 12000,
    },
    {
      image: "/images/Toyota highlander 2010.jpg",
      type: "condenser",
      make: "Toyota",
      model: "highlander",
      year: "2010",
      stockQty: 34,
      price: 12500,
    },
    {
      image: "/images/toyota venza 2016 cabin.jpg",
      type: "Cabin filter",
      make: "Toyota",
      model: "venza",
      year: "2016",
      stockQty: 5,
      price: 12000,
    },
    {
      image: "/images/Toyota venza 2016 comp.jpg",
      type: "Compressor",
      make: "Toyota",
      model: "venza",
      year: "2016",
      stockQty: 13,
      price: 2000,
    },
    {
      image: "/images/toyota venza 2016 valve.jpg",
      type: "Expansion valve",
      make: "Toyota",
      model: "venza",
      year: "2016",
      stockQty: 19,
      price: 20000,
    },
  ],
};
export default data;
