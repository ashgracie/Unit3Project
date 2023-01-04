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


  const flagArray = ['🏁','Checkered Flag', '🚩', 'Triangular Flag', '🎌', 'Crossed Flags', '🏴', 'Black Flag', '🏳️', 'White Flag', '🏳️‍🌈', 'Rainbow Flag', '🏳️‍⚧️','Transgender Flag', '🏴‍☠️', 'Pirate Flag', '🇦🇨','Ascension Island', '🇦🇩','Andorra', '🇦🇪','United Arab Emirates', '🇦🇫','Afghanistan', '🇦🇬','Antigua & Barbuda', '🇦🇮','Anguilla', '🇦🇱','Albania', '🇦🇲','Armenia', '🇦🇴','Angola', '🇦🇶','Antarctica', '🇦🇷','Argentina', '🇦🇸','American Samoa', '🇦🇹','Austria', '🇦🇺','Australia', '🇦🇼','Aruba', '🇦🇽','Åland Islands', '🇦🇿','Azerbaijan', '🇧🇦','Bosnia & Herzegovina', '🇧🇧','Barbados', '🇧🇩','Bangladesh', '🇧🇪','Belgium', '🇧🇫','Burkina Faso', '🇧🇬','Bulgaria', '🇧🇭','Bahrain', '🇧🇮','Burundi', '🇧🇯','Benin', '🇧🇱','St. Barthélemy', '🇧🇲','Bermuda', '🇧🇳','Brunei', '🇧🇴','Bolivia', '🇧🇶','Caribbean Netherlands', '🇧🇷','Brazil', '🇧🇸','Bahamas', '🇧🇹','Bhutan', '🇧🇻','Bouvet Island', '🇧🇼','Botswana', '🇧🇾','Belarus', '🇧🇿','Belize', '🇨🇦','Canada', '🇨🇨','Cocos (Keeling) Islands', '🇨🇩','Congo - Kinshasa', '🇨🇫','Central African Republic', '🇨🇬','Congo - Brazzaville', '🇨🇭','Switzerland', '🇨🇮','Côte d’Ivoire', '🇨🇰','Cook Islands', '🇨🇱','Chile', '🇨🇲','Cameroon', '🇨🇳','China', '🇨🇴','Colombia', '🇨🇵','Clipperton Island', '🇨🇷','Costa Rica', '🇨🇺','Cuba', '🇨🇻','Cape Verde', '🇨🇼','Curaçao', '🇨🇽','Christmas Island', '🇨🇾','Cyprus', '🇨🇿','Czechia', '🇩🇪','Germany', '🇩🇬','Diego Garcia', '🇩🇯','Djibouti', '🇩🇰','Denmark', '🇩🇲','Dominica', '🇩🇴','Dominican Republic', '🇩🇿','Algeria', '🇪🇦','Ceuta & Melilla', '🇪🇨','Ecuador', '🇪🇪','Estonia', '🇪🇬','Egypt', '🇪🇭','Western Sahara', '🇪🇷','Eritrea', '🇪🇸','Spain', '🇪🇹','Ethiopia', '🇪🇺','European Union', '🇫🇮', ' Finland', '🇫🇯', ' Fiji', '🇫🇰', ' Falkland Islands', '🇫🇲','Micronesia', '🇫🇴', ' Faroe Islands', '🇫🇷', ' France', '🇬🇦','Gabon', '🇬🇧','United Kingdom', '🇬🇩','Grenada', '🇬🇪','Georgia', '🇬🇫', ' French Guiana', '🇬🇬','Guernsey', '🇬🇭','Ghana', '🇬🇮','Gibraltar', '🇬🇱','Greenland', '🇬🇲','Gambia', '🇬🇳','Guinea', '🇬🇵','Guadeloupe', '🇬🇶','Equatorial Guinea', '🇬🇷','Greece', '🇬🇸','South Georgia & South Sandwich Islands', '🇬🇹','Guatemala', '🇬🇺','Guam', '🇬🇼','Guinea-Bissau', '🇬🇾','Guyana', '🇭🇰','Hong Kong SAR China', '🇭🇲','Heard & McDonald Islands', '🇭🇳','Honduras', '🇭🇷','Croatia', '🇭🇹','Haiti', '🇭🇺','Hungary', '🇮🇨','Canary Islands', '🇮🇩','Indonesia', '🇮🇪','Ireland', '🇮🇱','Israel', '🇮🇲','Isle of Man', '🇮🇳','India', '🇮🇴','British Indian Ocean Territory', '🇮🇶','Iraq', '🇮🇷','Iran', '🇮🇸','Iceland', '🇮🇹','Italy', '🇯🇪','Jersey', '🇯🇲','Jamaica', '🇯🇴','Jordan', '🇯🇵','Japan', '🇰🇪','Kenya', '🇰🇬','Kyrgyzstan', '🇰🇭','Cambodia', '🇰🇮','Kiribati', '🇰🇲','Comoros', '🇰🇳','St. Kitts & Nevis', '🇰🇵','North Korea', '🇰🇷','South Korea', '🇰🇼','Kuwait', '🇰🇾','Cayman Islands', '🇰🇿','Kazakhstan', '🇱🇦','Laos', '🇱🇧','Lebanon', '🇱🇨','St. Lucia', '🇱🇮','Liechtenstein', '🇱🇰','Sri Lanka', '🇱🇷','Liberia', '🇱🇸','Lesotho', '🇱🇹','Lithuania', '🇱🇺','Luxembourg', '🇱🇻','Latvia', '🇱🇾','Libya', '🇲🇦','Morocco', '🇲🇨','Monaco', '🇲🇩','Moldova', '🇲🇪','Montenegro', '🇲🇫','St. Martin', '🇲🇬','Madagascar', '🇲🇭','Marshall Islands', '🇲🇰','North Macedonia', '🇲🇱','Mali', '🇲🇲','Myanmar (Burma)', '🇲🇳','Mongolia', '🇲🇴','Macao Sar China', '🇲🇵','Northern Mariana Islands', '🇲🇶','Martinique', '🇲🇷','Mauritania', '🇲🇸','Montserrat', '🇲🇹','Malta', '🇲🇺','Mauritius', '🇲🇻','Maldives', '🇲🇼','Malawi', '🇲🇽','Mexico', '🇲🇾','Malaysia', '🇲🇿','Mozambique', '🇳🇦','Namibia', '🇳🇨','New Caledonia', '🇳🇪','Niger', '🇳🇫','Norfolk Island', '🇳🇬','Nigeria', '🇳🇮','Nicaragua', '🇳🇱','Netherlands', '🇳🇴','Norway', '🇳🇵','Nepal', '🇳🇷','Nauru', '🇳🇺','Niue', '🇳🇿','New Zealand', '🇴🇲','Oman', '🇵🇦','Panama', '🇵🇪','Peru', '🇵🇫', ' French Polynesia', '🇵🇬','Papua New Guinea', '🇵🇭','Philippines', '🇵🇰','Pakistan', '🇵🇱','Poland', '🇵🇲','St. Pierre & Miquelon', '🇵🇳','Pitcairn Islands', '🇵🇷','Puerto Rico', '🇵🇸','Palestinian Territories', '🇵🇹','Portugal', '🇵🇼','Palau', '🇵🇾','Paraguay', '🇶🇦','Qatar', '🇷🇪','Réunion', '🇷🇴','Romania', '🇷🇸','Serbia', '🇷🇺','Russia', '🇷🇼','Rwanda', '🇸🇦','Saudi Arabia', '🇸🇧','Solomon Islands', '🇸🇨','Seychelles', '🇸🇩','Sudan', '🇸🇪','Sweden', '🇸🇬','Singapore', '🇸🇭','St. Helena', '🇸🇮','Slovenia', '🇸🇯','Svalbard & Jan Mayen', '🇸🇰','Slovakia', '🇸🇱','Sierra Leone', '🇸🇲','San Marino', '🇸🇳','Senegal', '🇸🇴','Somalia', '🇸🇷','Suriname', '🇸🇸','South Sudan', '🇸🇹','São Tomé & Príncipe', '🇸🇻','El Salvador', '🇸🇽','Sint Maarten', '🇸🇾','Syria', '🇸🇿','Eswatini', '🇹🇦','Tristan Da Cunha', '🇹🇨','Turks & Caicos Islands', '🇹🇩','Chad', '🇹🇫', ' French Southern Territories', '🇹🇬','Togo', '🇹🇭','Thailand', '🇹🇯','Tajikistan', '🇹🇰','Tokelau', '🇹🇱','Timor-Leste', '🇹🇲','Turkmenistan', '🇹🇳','Tunisia', '🇹🇴','Tonga', '🇹🇷','Turkey', '🇹🇹','Trinidad & Tobago', '🇹🇻','Tuvalu', '🇹🇼','Taiwan', '🇹🇿','Tanzania', '🇺🇦','Ukraine', '🇺🇬','Uganda', '🇺🇲','U.S. Outlying Islands', '🇺🇳','United Nations', '🇺🇸','United States', '🇺🇾','Uruguay', '🇺🇿','Uzbekistan', '🇻🇦','Vatican City', '🇻🇨','St. Vincent & Grenadines', '🇻🇪','Venezuela', '🇻🇬','British Virgin Islands', '🇻🇮','U.S. Virgin Islands', '🇻🇳','Vietnam', '🇻🇺','Vanuatu', '🇼🇫','Wallis & Futuna', '🇼🇸','Samoa', '🇽🇰','Kosovo', '🇾🇪','Yemen', '🇾🇹','Mayotte', '🇿🇦','South Africa', '🇿🇲','Zambia', '🇿🇼','Zimbabwe', '🏴󠁧󠁢󠁥󠁮󠁧󠁿','England', '🏴󠁧󠁢󠁳󠁣󠁴󠁿','Scotland', '🏴󠁧󠁢󠁷󠁬󠁳󠁿','Wales', '🏴󠁵󠁳󠁴󠁸󠁿', 'Flag For Texas (US-TX)']
  
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
    {name: 'Hamburger', emoji: '🍔', category: categories[0], price: 5.95},
    {name: 'Turkey Sandwich', emoji: '🥪', category: categories[0], price: 6.95},
    {name: 'Hot Dog', emoji: '🌭', category: categories[0], price: 3.95},
    {name: 'Crab Plate', emoji: '🦀', category: categories[1], price: 14.95},
    {name: 'Fried Shrimp', emoji: '🍤', category: categories[1], price: 13.95},
    {name: 'Whole Lobster', emoji: '🦞', category: categories[1], price: 25.95},
    {name: 'Taco', emoji: '🌮', category: categories[2], price: 1.95},
    {name: 'Burrito', emoji: '🌯', category: categories[2], price: 4.95},
    {name: 'Pizza Slice', emoji: '🍕', category: categories[3], price: 3.95},
    {name: 'Spaghetti', emoji: '🍝', category: categories[3], price: 7.95},
    {name: 'Garlic Bread', emoji: '🍞', category: categories[3], price: 1.95},
    {name: 'French Fries', emoji: '🍟', category: categories[4], price: 2.95},
    {name: 'Green Salad', emoji: '🥗', category: categories[4], price: 3.95},
    {name: 'Ice Cream', emoji: '🍨', category: categories[5], price: 1.95},
    {name: 'Cup Cake', emoji: '🧁', category: categories[5], price: 0.95},
    {name: 'Custard', emoji: '🍮', category: categories[5], price: 2.95},
    {name: 'Strawberry Shortcake', emoji: '🍰', category: categories[5], price: 3.95},
    {name: 'Milk', emoji: '🥛', category: categories[6], price: 0.95},
    {name: 'Coffee', emoji: '☕', category: categories[6], price: 0.95},
    {name: 'Mai Tai', emoji: '🍹', category: categories[6], price: 8.95},
    {name: 'Beer', emoji: '🍺', category: categories[6], price: 3.95},
    {name: 'Wine', emoji: '🍷', category: categories[6], price: 7.95},
  ]);*/

//  console.log(items)

  process.exit();

})();