const states = {
    "AN":"Andaman and Nicobar Islands",
    "AP":"Andhra Pradesh",
    "AR":"Arunachal Pradesh",
    "AS":"Assam",
    "BR":"Bihar",
    "CG":"Chandigarh",
    "CH":"Chhattisgarh",
    "DN":"Dadra and Nagar Haveli",
    "DD":"Daman and Diu",
    "DL":"Delhi",
    "GA":"Goa",
    "GJ":"Gujarat",
    "HR":"Haryana",
    "HP":"Himachal Pradesh",
    "JK":"Jammu and Kashmir",
    "JH":"Jharkhand",
    "KA":"Karnataka",
    "KL":"Kerala",
    "LA":"Ladakh",
    "LD":"Lakshadweep",
    "MP":"Madhya Pradesh",
    "MH":"Maharashtra",
    "MN":"Manipur",
    "ML":"Meghalaya",
    "MZ":"Mizoram",
    "NL":"Nagaland",
    "OR":"Odisha",
    "PY":"Puducherry",
    "PB":"Punjab",
    "RJ":"Rajasthan",
    "SK":"Sikkim",
    "TN":"Tamil Nadu",
    "TS":"Telangana",
    "TR":"Tripura",
    "UP":"Uttar Pradesh",
    "UK":"Uttarakhand",
    "WB":"West Bengal"
}

const validationRules = {
  userId: {
    in: ['params'],
    errorMessage: "Id is Wrong",
    // We can check for users existence here by using custom validator
    isInt: true,
    toInt:true
  },
  fullName: {
    trim: true,
    isLength: {
      errorMessage: "Name must contain at least 6 characters and at most 25 characters",
      options: { min:6, max:25 }
    },
    escape:true,
  },
  mobileNumber: {
    trim: true,
    isMobilePhone: {
      errorMessage: "Invalid mobile Mobile Number",
      options: 'en-IN'
    },
    escape:true,
  },
  streetAddress: {
    trim: true,
    isLength: {
      errorMessage: "streetAddress must contains atleast 15 characters and at most 100 characters",
      options: {min:10, max:100}
    },
    escape: true,
  },
  city: {
    trim:true,
    isLength:{
      errorMessage: "City name should be at least 3 characters",
      options: { min:3, max:25 }
    },
    escape:true,
  },
  state: {
    trim:true,
    custom: {
      options: state => {
        validity = states.hasOwnProperty(state.toUpperCase()) || Object.values(states).filter((item) => {
          return (item.toUpperCase() === state.toUpperCase());
        });

        if (!validity)
          throw Error("Invalid state value");

        return validity;
      }
    },
    escape:true,
    customSanitizer:{
      options: value => (value.length==2) ? states[value.toUpperCase()].toUpperCase() : value.toUpperCase(),
    }
  },
  pinCode: {
    trim:true,
    isPostalCode:{
      errorMessage: "Invalid postal code",
      options:'IN'
    },
    escape:true,
  }
}


module.exports.validationRules = validationRules
