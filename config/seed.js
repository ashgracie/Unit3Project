require('dotenv').config();
require('./database');

const Category = require('../models/category');
const Item = require('../models/item');

const User = require('../models/user');


(async function() {
  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Special', sortOrder: 10},
    {name: 'Country', sortOrder: 20}
  ]);

//const categories = [{name: 'Special', sortOrder: 10},{name: 'Country', sortOrder: 20}]


  const flagArray = ['๐','Checkered Flag', '๐ฉ', 'Triangular Flag', '๐', 'Crossed Flags', '๐ด', 'Black Flag', '๐ณ๏ธ', 'White Flag', '๐ณ๏ธโ๐', 'Rainbow Flag', '๐ณ๏ธโโง๏ธ','Transgender Flag', '๐ดโโ ๏ธ', 'Pirate Flag', '๐ฆ๐จ','Ascension Island', '๐ฆ๐ฉ','Andorra', '๐ฆ๐ช','United Arab Emirates', '๐ฆ๐ซ','Afghanistan', '๐ฆ๐ฌ','Antigua & Barbuda', '๐ฆ๐ฎ','Anguilla', '๐ฆ๐ฑ','Albania', '๐ฆ๐ฒ','Armenia', '๐ฆ๐ด','Angola', '๐ฆ๐ถ','Antarctica', '๐ฆ๐ท','Argentina', '๐ฆ๐ธ','American Samoa', '๐ฆ๐น','Austria', '๐ฆ๐บ','Australia', '๐ฆ๐ผ','Aruba', '๐ฆ๐ฝ','รland Islands', '๐ฆ๐ฟ','Azerbaijan', '๐ง๐ฆ','Bosnia & Herzegovina', '๐ง๐ง','Barbados', '๐ง๐ฉ','Bangladesh', '๐ง๐ช','Belgium', '๐ง๐ซ','Burkina Faso', '๐ง๐ฌ','Bulgaria', '๐ง๐ญ','Bahrain', '๐ง๐ฎ','Burundi', '๐ง๐ฏ','Benin', '๐ง๐ฑ','St. Barthรฉlemy', '๐ง๐ฒ','Bermuda', '๐ง๐ณ','Brunei', '๐ง๐ด','Bolivia', '๐ง๐ถ','Caribbean Netherlands', '๐ง๐ท','Brazil', '๐ง๐ธ','Bahamas', '๐ง๐น','Bhutan', '๐ง๐ป','Bouvet Island', '๐ง๐ผ','Botswana', '๐ง๐พ','Belarus', '๐ง๐ฟ','Belize', '๐จ๐ฆ','Canada', '๐จ๐จ','Cocos (Keeling) Islands', '๐จ๐ฉ','Congo - Kinshasa', '๐จ๐ซ','Central African Republic', '๐จ๐ฌ','Congo - Brazzaville', '๐จ๐ญ','Switzerland', '๐จ๐ฎ','Cรดte dโIvoire', '๐จ๐ฐ','Cook Islands', '๐จ๐ฑ','Chile', '๐จ๐ฒ','Cameroon', '๐จ๐ณ','China', '๐จ๐ด','Colombia', '๐จ๐ต','Clipperton Island', '๐จ๐ท','Costa Rica', '๐จ๐บ','Cuba', '๐จ๐ป','Cape Verde', '๐จ๐ผ','Curaรงao', '๐จ๐ฝ','Christmas Island', '๐จ๐พ','Cyprus', '๐จ๐ฟ','Czechia', '๐ฉ๐ช','Germany', '๐ฉ๐ฌ','Diego Garcia', '๐ฉ๐ฏ','Djibouti', '๐ฉ๐ฐ','Denmark', '๐ฉ๐ฒ','Dominica', '๐ฉ๐ด','Dominican Republic', '๐ฉ๐ฟ','Algeria', '๐ช๐ฆ','Ceuta & Melilla', '๐ช๐จ','Ecuador', '๐ช๐ช','Estonia', '๐ช๐ฌ','Egypt', '๐ช๐ญ','Western Sahara', '๐ช๐ท','Eritrea', '๐ช๐ธ','Spain', '๐ช๐น','Ethiopia', '๐ช๐บ','European Union', '๐ซ๐ฎ', ' Finland', '๐ซ๐ฏ', ' Fiji', '๐ซ๐ฐ', ' Falkland Islands', '๐ซ๐ฒ','Micronesia', '๐ซ๐ด', ' Faroe Islands', '๐ซ๐ท', ' France', '๐ฌ๐ฆ','Gabon', '๐ฌ๐ง','United Kingdom', '๐ฌ๐ฉ','Grenada', '๐ฌ๐ช','Georgia', '๐ฌ๐ซ', ' French Guiana', '๐ฌ๐ฌ','Guernsey', '๐ฌ๐ญ','Ghana', '๐ฌ๐ฎ','Gibraltar', '๐ฌ๐ฑ','Greenland', '๐ฌ๐ฒ','Gambia', '๐ฌ๐ณ','Guinea', '๐ฌ๐ต','Guadeloupe', '๐ฌ๐ถ','Equatorial Guinea', '๐ฌ๐ท','Greece', '๐ฌ๐ธ','South Georgia & South Sandwich Islands', '๐ฌ๐น','Guatemala', '๐ฌ๐บ','Guam', '๐ฌ๐ผ','Guinea-Bissau', '๐ฌ๐พ','Guyana', '๐ญ๐ฐ','Hong Kong SAR China', '๐ญ๐ฒ','Heard & McDonald Islands', '๐ญ๐ณ','Honduras', '๐ญ๐ท','Croatia', '๐ญ๐น','Haiti', '๐ญ๐บ','Hungary', '๐ฎ๐จ','Canary Islands', '๐ฎ๐ฉ','Indonesia', '๐ฎ๐ช','Ireland', '๐ฎ๐ฑ','Israel', '๐ฎ๐ฒ','Isle of Man', '๐ฎ๐ณ','India', '๐ฎ๐ด','British Indian Ocean Territory', '๐ฎ๐ถ','Iraq', '๐ฎ๐ท','Iran', '๐ฎ๐ธ','Iceland', '๐ฎ๐น','Italy', '๐ฏ๐ช','Jersey', '๐ฏ๐ฒ','Jamaica', '๐ฏ๐ด','Jordan', '๐ฏ๐ต','Japan', '๐ฐ๐ช','Kenya', '๐ฐ๐ฌ','Kyrgyzstan', '๐ฐ๐ญ','Cambodia', '๐ฐ๐ฎ','Kiribati', '๐ฐ๐ฒ','Comoros', '๐ฐ๐ณ','St. Kitts & Nevis', '๐ฐ๐ต','North Korea', '๐ฐ๐ท','South Korea', '๐ฐ๐ผ','Kuwait', '๐ฐ๐พ','Cayman Islands', '๐ฐ๐ฟ','Kazakhstan', '๐ฑ๐ฆ','Laos', '๐ฑ๐ง','Lebanon', '๐ฑ๐จ','St. Lucia', '๐ฑ๐ฎ','Liechtenstein', '๐ฑ๐ฐ','Sri Lanka', '๐ฑ๐ท','Liberia', '๐ฑ๐ธ','Lesotho', '๐ฑ๐น','Lithuania', '๐ฑ๐บ','Luxembourg', '๐ฑ๐ป','Latvia', '๐ฑ๐พ','Libya', '๐ฒ๐ฆ','Morocco', '๐ฒ๐จ','Monaco', '๐ฒ๐ฉ','Moldova', '๐ฒ๐ช','Montenegro', '๐ฒ๐ซ','St. Martin', '๐ฒ๐ฌ','Madagascar', '๐ฒ๐ญ','Marshall Islands', '๐ฒ๐ฐ','North Macedonia', '๐ฒ๐ฑ','Mali', '๐ฒ๐ฒ','Myanmar (Burma)', '๐ฒ๐ณ','Mongolia', '๐ฒ๐ด','Macao Sar China', '๐ฒ๐ต','Northern Mariana Islands', '๐ฒ๐ถ','Martinique', '๐ฒ๐ท','Mauritania', '๐ฒ๐ธ','Montserrat', '๐ฒ๐น','Malta', '๐ฒ๐บ','Mauritius', '๐ฒ๐ป','Maldives', '๐ฒ๐ผ','Malawi', '๐ฒ๐ฝ','Mexico', '๐ฒ๐พ','Malaysia', '๐ฒ๐ฟ','Mozambique', '๐ณ๐ฆ','Namibia', '๐ณ๐จ','New Caledonia', '๐ณ๐ช','Niger', '๐ณ๐ซ','Norfolk Island', '๐ณ๐ฌ','Nigeria', '๐ณ๐ฎ','Nicaragua', '๐ณ๐ฑ','Netherlands', '๐ณ๐ด','Norway', '๐ณ๐ต','Nepal', '๐ณ๐ท','Nauru', '๐ณ๐บ','Niue', '๐ณ๐ฟ','New Zealand', '๐ด๐ฒ','Oman', '๐ต๐ฆ','Panama', '๐ต๐ช','Peru', '๐ต๐ซ', ' French Polynesia', '๐ต๐ฌ','Papua New Guinea', '๐ต๐ญ','Philippines', '๐ต๐ฐ','Pakistan', '๐ต๐ฑ','Poland', '๐ต๐ฒ','St. Pierre & Miquelon', '๐ต๐ณ','Pitcairn Islands', '๐ต๐ท','Puerto Rico', '๐ต๐ธ','Palestinian Territories', '๐ต๐น','Portugal', '๐ต๐ผ','Palau', '๐ต๐พ','Paraguay', '๐ถ๐ฆ','Qatar', '๐ท๐ช','Rรฉunion', '๐ท๐ด','Romania', '๐ท๐ธ','Serbia', '๐ท๐บ','Russia', '๐ท๐ผ','Rwanda', '๐ธ๐ฆ','Saudi Arabia', '๐ธ๐ง','Solomon Islands', '๐ธ๐จ','Seychelles', '๐ธ๐ฉ','Sudan', '๐ธ๐ช','Sweden', '๐ธ๐ฌ','Singapore', '๐ธ๐ญ','St. Helena', '๐ธ๐ฎ','Slovenia', '๐ธ๐ฏ','Svalbard & Jan Mayen', '๐ธ๐ฐ','Slovakia', '๐ธ๐ฑ','Sierra Leone', '๐ธ๐ฒ','San Marino', '๐ธ๐ณ','Senegal', '๐ธ๐ด','Somalia', '๐ธ๐ท','Suriname', '๐ธ๐ธ','South Sudan', '๐ธ๐น','Sรฃo Tomรฉ & Prรญncipe', '๐ธ๐ป','El Salvador', '๐ธ๐ฝ','Sint Maarten', '๐ธ๐พ','Syria', '๐ธ๐ฟ','Eswatini', '๐น๐ฆ','Tristan Da Cunha', '๐น๐จ','Turks & Caicos Islands', '๐น๐ฉ','Chad', '๐น๐ซ', ' French Southern Territories', '๐น๐ฌ','Togo', '๐น๐ญ','Thailand', '๐น๐ฏ','Tajikistan', '๐น๐ฐ','Tokelau', '๐น๐ฑ','Timor-Leste', '๐น๐ฒ','Turkmenistan', '๐น๐ณ','Tunisia', '๐น๐ด','Tonga', '๐น๐ท','Turkey', '๐น๐น','Trinidad & Tobago', '๐น๐ป','Tuvalu', '๐น๐ผ','Taiwan', '๐น๐ฟ','Tanzania', '๐บ๐ฆ','Ukraine', '๐บ๐ฌ','Uganda', '๐บ๐ฒ','U.S. Outlying Islands', '๐บ๐ณ','United Nations', '๐บ๐ธ','United States', '๐บ๐พ','Uruguay', '๐บ๐ฟ','Uzbekistan', '๐ป๐ฆ','Vatican City', '๐ป๐จ','St. Vincent & Grenadines', '๐ป๐ช','Venezuela', '๐ป๐ฌ','British Virgin Islands', '๐ป๐ฎ','U.S. Virgin Islands', '๐ป๐ณ','Vietnam', '๐ป๐บ','Vanuatu', '๐ผ๐ซ','Wallis & Futuna', '๐ผ๐ธ','Samoa', '๐ฝ๐ฐ','Kosovo', '๐พ๐ช','Yemen', '๐พ๐น','Mayotte', '๐ฟ๐ฆ','South Africa', '๐ฟ๐ฒ','Zambia', '๐ฟ๐ผ','Zimbabwe', '๐ด๓ ง๓ ข๓ ฅ๓ ฎ๓ ง๓ ฟ','England', '๐ด๓ ง๓ ข๓ ณ๓ ฃ๓ ด๓ ฟ','Scotland', '๐ด๓ ง๓ ข๓ ท๓ ฌ๓ ณ๓ ฟ','Wales', '๐ด๓ ต๓ ณ๓ ด๓ ธ๓ ฟ', 'Flag For Texas (US-TX)']
  
  console.log(flagArray.length);
  let flagObjectsArray = []
  for (let i = 0; i < flagArray.length; i+=2) {
    const element = flagArray[i];
    let flagObject = {}
    flagObject.name = flagArray[i+1]
    flagObject.emoji = flagArray[i]
    let basePrice = 6
    let variance = 1
    let multipler = 0;
    if (i <= 8*2){
      flagObject.category = categories[0]
      multipler = 1
    } else {
      flagObject.category = categories[1]
    }
    ["Small","Medium","Large"].map((val,idx)=>{
      // console.log(val);
      flagObject.size=val
      flagObject.price = ((basePrice + Math.random()*variance)*(idx+1+multipler)).toFixed(2)
      flagObjectsArray.push({...flagObject})
    })
    
  }

  /*
  await User.deleteMany({});
  User.find({}, (err, foundFruits) => {
    if (err) {
      console.log(err)
    } else {
      console.log("users", foundFruits)
    }
  })
  */

  await Item.deleteMany({});
  const items = await Item.create(flagObjectsArray);

  /*
  await Item.deleteMany({});
  const items = await Item.create([
    {name: 'Hamburger', emoji: '๐', category: categories[0], price: 5.95},
    {name: 'Turkey Sandwich', emoji: '๐ฅช', category: categories[0], price: 6.95},
    {name: 'Hot Dog', emoji: '๐ญ', category: categories[0], price: 3.95},
    {name: 'Crab Plate', emoji: '๐ฆ', category: categories[1], price: 14.95},
    {name: 'Fried Shrimp', emoji: '๐ค', category: categories[1], price: 13.95},
    {name: 'Whole Lobster', emoji: '๐ฆ', category: categories[1], price: 25.95},
    {name: 'Taco', emoji: '๐ฎ', category: categories[2], price: 1.95},
    {name: 'Burrito', emoji: '๐ฏ', category: categories[2], price: 4.95},
    {name: 'Pizza Slice', emoji: '๐', category: categories[3], price: 3.95},
    {name: 'Spaghetti', emoji: '๐', category: categories[3], price: 7.95},
    {name: 'Garlic Bread', emoji: '๐', category: categories[3], price: 1.95},
    {name: 'French Fries', emoji: '๐', category: categories[4], price: 2.95},
    {name: 'Green Salad', emoji: '๐ฅ', category: categories[4], price: 3.95},
    {name: 'Ice Cream', emoji: '๐จ', category: categories[5], price: 1.95},
    {name: 'Cup Cake', emoji: '๐ง', category: categories[5], price: 0.95},
    {name: 'Custard', emoji: '๐ฎ', category: categories[5], price: 2.95},
    {name: 'Strawberry Shortcake', emoji: '๐ฐ', category: categories[5], price: 3.95},
    {name: 'Milk', emoji: '๐ฅ', category: categories[6], price: 0.95},
    {name: 'Coffee', emoji: 'โ', category: categories[6], price: 0.95},
    {name: 'Mai Tai', emoji: '๐น', category: categories[6], price: 8.95},
    {name: 'Beer', emoji: '๐บ', category: categories[6], price: 3.95},
    {name: 'Wine', emoji: '๐ท', category: categories[6], price: 7.95},
  ]);*/

//  console.log(items)

  process.exit();

})();